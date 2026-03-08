'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * @component AmbientLightMesh
 * @description A high-performance 3D mesh driven by custom GLSL shaders. 
 * Performs a soft wave distortion based on cursor distance and current time, 
 * providing an organic, living atmosphere to the Hero section.
 */
const AmbientLightMesh = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, mouse } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) }
        }),
        [viewport.width, viewport.height]
    );

    useFrame((state) => {
        if (!materialRef.current) return;

        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

        // Throttled mouse interpolation for performance
        materialRef.current.uniforms.uMouse.value.lerp(
            new THREE.Vector2(mouse.x * 0.6, mouse.y * 0.6),
            0.02 // Lower lerp factor = more stable rendering
        );
    });

    return (
        <mesh ref={meshRef}>
            {/* PERFORMANCE: Reduced vertices from 128x128 to 48x48 */}
            <planeGeometry args={[viewport.width, viewport.height, 48, 48]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={`
                    varying vec2 vUv;
                    uniform float uTime;
                    uniform vec2 uMouse;
                    
                    void main() {
                        vUv = uv;
                        vec3 pos = position;
                        
                        // Optimized wave distortion
                        float dist = distance(uv, vec2(0.5) + uMouse);
                        float wave = sin(dist * 8.0 - uTime * 0.5) * 0.08;
                        pos.z += wave * smoothstep(1.0, 0.0, dist);
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec2 vUv;
                    uniform float uTime;
                    uniform vec2 uMouse;
                    
                    void main() {
                        vec3 baseColor = vec3(0.02, 0.02, 0.02);
                        vec3 highlightColor = vec3(0.4, 0.06, 0.95);
                        
                        float dist = distance(vUv, vec2(0.5) + uMouse);
                        float intensity = smoothstep(0.8, 0.0, dist) * 0.18;
                        
                        // Simplified grain for performance
                        float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) * 0.015;
                        
                        vec3 finalColor = mix(baseColor, highlightColor, intensity) + noise;
                        gl_FragColor = vec4(finalColor, 1.0);
                    }
                `}
                transparent={true}
            />
        </mesh>
    );
};

export default function AmbientLightCanvas() {
    return (
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}> {/* Limit pixel ratio for performance */}
                <AmbientLightMesh />
            </Canvas>
        </div>
    );
}
