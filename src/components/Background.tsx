import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PrismaticShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.mouse.x, state.mouse.y),
      0.05
    );
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Prismatic distortion logic
      float noise = snoise(uv * 2.0 + uTime * 0.1);
      float dist = distance(uv, uMouse * 0.5 + 0.5);
      
      float pattern = snoise(uv * 10.0 + noise * 5.0 + uTime * 0.2);
      
      // Color synthesis
      vec3 color1 = vec3(0.007, 0.007, 0.012); // Void
      vec3 color2 = vec3(0.17, 0.83, 0.75); // Cyan
      vec3 color3 = vec3(0.66, 0.33, 0.97); // Purple
      
      vec3 finalColor = mix(color1, color2, smoothstep(0.1, 0.8, pattern));
      finalColor = mix(finalColor, color3, smoothstep(0.5, 1.0, noise));
      
      // Edge highlights
      float edge = 1.0 - smoothstep(0.4, 0.5, dist);
      finalColor += vec3(edge * 0.1);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020408] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <PrismaticShader />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,4,8,0.7)_100%)] px" />
    </div>
  );
};
