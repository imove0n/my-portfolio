import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Robotic Hand Component (Placeholder - replace with actual model)
function RoboticHand({ position, rotation }) {
    const handRef = useRef();

    useFrame((state) => {
        // Subtle floating animation
        handRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    // Placeholder geometry - replace with useGLTF when you have the model
    return (
        <group ref={handRef} position={position} rotation={rotation}>
            {/* Palm */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.8, 1.2, 0.3]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Fingers */}
            {[0, 1, 2, 3].map((i) => (
                <group key={i} position={[-0.3 + i * 0.2, 0.7, 0]}>
                    {/* Finger segment 1 */}
                    <mesh position={[0, 0.15, 0]}>
                        <boxGeometry args={[0.12, 0.3, 0.12]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Finger segment 2 */}
                    <mesh position={[0, 0.35, 0]}>
                        <boxGeometry args={[0.1, 0.2, 0.1]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Glowing joint */}
                    <mesh position={[0, 0.25, 0]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial
                            color="#0ea5e9"
                            emissive="#0ea5e9"
                            emissiveIntensity={2}
                        />
                    </mesh>
                </group>
            ))}

            {/* Thumb */}
            <group position={[0.5, 0.2, 0.15]} rotation={[0, 0, -0.5]}>
                <mesh position={[0, 0.15, 0]}>
                    <boxGeometry args={[0.12, 0.3, 0.12]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
                </mesh>
            </group>

            {/* Wrist connector with glow */}
            <mesh position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.3, 0.35, 0.4, 16]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#0ea5e9"
                    emissiveIntensity={0.3}
                />
            </mesh>
        </group>
    );
}

// To use actual 3D model instead:
/*
function RoboticHandModel({ position, rotation, modelPath }) {
    const handRef = useRef();
    const { scene } = useGLTF(modelPath);

    useFrame((state) => {
        handRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return <primitive ref={handRef} object={scene.clone()} position={position} rotation={rotation} scale={0.5} />;
}
*/

// Floating Laptop Component (Placeholder)
function FloatingLaptop() {
    const laptopRef = useRef();
    const energyRef = useRef();

    useFrame((state) => {
        // Rotate laptop slowly
        laptopRef.current.rotation.y += 0.003;

        // Pulse energy effect
        if (energyRef.current) {
            energyRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
            energyRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.5}
        >
            <group ref={laptopRef}>
                {/* Laptop Base */}
                <mesh position={[0, -0.05, 0]}>
                    <boxGeometry args={[2, 0.1, 1.5]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>

                {/* Laptop Screen */}
                <mesh position={[0, 0.6, -0.7]} rotation={[-0.2, 0, 0]}>
                    <boxGeometry args={[2, 1.2, 0.05]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        metalness={0.7}
                        roughness={0.3}
                    />
                </mesh>

                {/* Screen Display (glowing) */}
                <mesh position={[0, 0.6, -0.675]} rotation={[-0.2, 0, 0]}>
                    <boxGeometry args={[1.8, 1.0, 0.01]} />
                    <meshStandardMaterial
                        color="#0ea5e9"
                        emissive="#0ea5e9"
                        emissiveIntensity={1.5}
                        toneMapped={false}
                    />
                </mesh>

                {/* Keyboard detail */}
                <mesh position={[0, 0.05, 0.2]}>
                    <boxGeometry args={[1.6, 0.02, 1.0]} />
                    <meshStandardMaterial
                        color="#0f0f0f"
                        metalness={0.5}
                        roughness={0.5}
                    />
                </mesh>

                {/* Energy Ring Effect */}
                <mesh ref={energyRef} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.5, 0.02, 16, 100]} />
                    <meshStandardMaterial
                        color="#0ea5e9"
                        emissive="#0ea5e9"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.4}
                    />
                </mesh>

                {/* Particle glow */}
                <pointLight position={[0, 0, 0]} intensity={2} color="#0ea5e9" distance={3} />
            </group>
        </Float>
    );
}

// To use actual 3D model instead:
/*
function FloatingLaptopModel({ modelPath }) {
    const laptopRef = useRef();
    const { scene } = useGLTF(modelPath);

    useFrame(() => {
        laptopRef.current.rotation.y += 0.003;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <primitive ref={laptopRef} object={scene.clone()} scale={0.5} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#0ea5e9" distance={3} />
        </Float>
    );
}
*/

// Main Scene Component
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
            <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#0ea5e9" />
            <pointLight position={[0, 2, 0]} intensity={0.5} color="#0ea5e9" />

            {/* Left Robotic Hand */}
            <RoboticHand
                position={[-4, 0, 0]}
                rotation={[0, 0.3, 0]}
            />

            {/* Right Robotic Hand */}
            <RoboticHand
                position={[4, 0, 0]}
                rotation={[0, -0.3, 0]}
            />

            {/* Floating Laptop in Center */}
            <FloatingLaptop />
        </>
    );
}

// Main Canvas Component
export default function Hero3DBackground() {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 1, 8], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>

            <style jsx>{`
                .canvas-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}

// Preload models (uncomment when using actual models)
// useGLTF.preload('/models/robotic-hand.glb');
// useGLTF.preload('/models/laptop.glb');
