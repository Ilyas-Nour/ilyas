'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * @component: AmbientLightMesh
 * @description: A subtle, dark 3D mesh that reacts to mouse movement.
 * Creates a mature, 'ambient light' effect suitable for a top-tier IT portfolio.
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

        // Smoothly interpolate mouse position for a sophisticated, slow follow effect
        materialRef.current.uniforms.uMouse.value.lerp(
            new THREE.Vector2(mouse.x * 0.5, mouse.y * 0.5),
            0.05
        );
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width, viewport.height, 128, 128]} />
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
                        
                        // Subtle wave distortion based on time and mouse proximity
                        float dist = distance(uv, vec2(0.5) + uMouse);
                        float wave = sin(dist * 10.0 - uTime) * 0.1;
                        pos.z += wave * smoothstep(0.8, 0.0, dist);
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec2 vUv;
                    uniform float uTime;
                    uniform vec2 uMouse;
                    
                    void main() {
                        // Base monolith dark color
                        vec3 baseColor = vec3(0.02, 0.02, 0.02);
                        
                        // Subtle Electric Indigo highlight
                        vec3 highlightColor = vec3(0.4, 0.06, 0.95);
                        
                        // Distance from mouse center
                        float dist = distance(vUv, vec2(0.5) + uMouse);
                        
                        // Soft, wide radial gradient for the ambient light
                        float intensity = smoothstep(0.7, 0.0, dist) * 0.15;
                        
                        // Subtle noise/grain pattern
                        float noise = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453) * 0.02;
                        
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
            <Canvas camera={{ position: [0, 0, 1] }}>
                <AmbientLightMesh />
            </Canvas>
        </div>
    );
}
