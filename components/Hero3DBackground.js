import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Custom Float component (replaces @react-three/drei Float to avoid dependencies)
function Float({ children, speed = 1, rotationIntensity = 0, floatIntensity = 1 }) {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.position.y = Math.sin(t * speed) * floatIntensity * 0.5;
        if (rotationIntensity) {
            ref.current.rotation.x = Math.sin(t * speed) * rotationIntensity * 0.1;
            ref.current.rotation.z = Math.cos(t * speed) * rotationIntensity * 0.1;
        }
    });

    return <group ref={ref}>{children}</group>;
}

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

// Realistic Laptop Component
function RealisticLaptop() {
    const laptopRef = useRef();
    const screenRef = useRef();

    useFrame((state) => {
        // Smooth rotation
        laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;

        // Subtle screen glow pulse
        if (screenRef.current) {
            screenRef.current.material.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={laptopRef}>
                {/* ==== LAPTOP BASE ==== */}

                {/* Bottom case */}
                <mesh position={[0, -0.05, 0]}>
                    <boxGeometry args={[2.4, 0.08, 1.6]} />
                    <meshStandardMaterial
                        color="#2c2c2e"
                        metalness={0.8}
                        roughness={0.3}
                    />
                </mesh>

                {/* Keyboard area */}
                <mesh position={[0, 0.01, 0.1]}>
                    <boxGeometry args={[2.1, 0.01, 1.3]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.2}
                        roughness={0.8}
                    />
                </mesh>

                {/* Individual keys */}
                {Array.from({ length: 60 }).map((_, i) => {
                    const row = Math.floor(i / 15);
                    const col = i % 15;
                    return (
                        <mesh
                            key={i}
                            position={[
                                -1.0 + col * 0.14,
                                0.015,
                                -0.35 + row * 0.14
                            ]}
                        >
                            <boxGeometry args={[0.12, 0.01, 0.12]} />
                            <meshStandardMaterial
                                color="#3a3a3c"
                                metalness={0.1}
                                roughness={0.9}
                            />
                        </mesh>
                    );
                })}

                {/* Trackpad */}
                <mesh position={[0, 0.01, 0.6]}>
                    <boxGeometry args={[0.8, 0.005, 0.5]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.4}
                        roughness={0.6}
                    />
                </mesh>

                {/* ==== LAPTOP SCREEN ==== */}

                {/* Screen back (lid) */}
                <mesh position={[0, 0.7, -0.75]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[2.4, 1.5, 0.04]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>

                {/* Screen bezel */}
                <mesh position={[0, 0.7, -0.73]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[2.3, 1.4, 0.01]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        metalness={0.6}
                        roughness={0.4}
                    />
                </mesh>

                {/* Active screen display */}
                <mesh ref={screenRef} position={[0, 0.7, -0.725]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[2.2, 1.3, 0.001]} />
                    <meshStandardMaterial
                        color="#0ea5e9"
                        emissive="#0ea5e9"
                        emissiveIntensity={0.8}
                        toneMapped={false}
                    />
                </mesh>

                {/* Webcam */}
                <mesh position={[0, 1.4, -0.73]} rotation={[-0.3, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
                    <meshStandardMaterial
                        color="#000000"
                        metalness={0.5}
                        roughness={0.5}
                    />
                </mesh>

                {/* Logo on lid (Apple-style) */}
                <mesh position={[0, 0.7, -0.77]} rotation={[-0.3, 0, 0]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#ffffff"
                        emissiveIntensity={0.2}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Ambient lighting from screen */}
                <pointLight position={[0, 0.7, -0.5]} intensity={1.5} color="#0ea5e9" distance={2} />
                <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" distance={3} />
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

// Floating Code Symbol Component
function FloatingSymbol({ position, shape, speed, scale, offset, duration, color }) {
    const symbolRef = useRef();
    const startY = useRef(-2);
    const startTimeRef = useRef(null);

    useFrame((state, delta) => {
        if (!symbolRef.current) return;

        // Initialize start time once on first frame
        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.getElapsedTime() - offset;
        }

        // Use clock time for continuous animation (never resets)
        const elapsed = state.clock.getElapsedTime() - startTimeRef.current;
        const progress = ((elapsed % duration) / duration); // 0 to 1, loops

        // Move from bottom to top smoothly
        const yPosition = startY.current + progress * 6; // Start at -2, end at 4
        symbolRef.current.position.y = yPosition;

        // Very subtle horizontal drift (more relaxed)
        symbolRef.current.position.x = position[0] + Math.sin(elapsed * 0.2) * 0.2;
        symbolRef.current.position.z = position[2] + Math.cos(elapsed * 0.15) * 0.15;

        // Very slow rotation (relaxed)
        symbolRef.current.rotation.y = elapsed * 0.1 * speed;
        symbolRef.current.rotation.x = elapsed * 0.05 * speed;

        // Fade in and out at start/end
        if (progress < 0.1) {
            symbolRef.current.material.opacity = progress * 8; // Fade in
        } else if (progress > 0.9) {
            symbolRef.current.material.opacity = (1 - progress) * 8; // Fade out
        } else {
            symbolRef.current.material.opacity = 0.8; // More visible
        }
    });

    return (
        <mesh ref={symbolRef} position={position} scale={scale}>
            {shape === 'box' && <boxGeometry args={[0.15, 0.15, 0.15]} />}
            {shape === 'sphere' && <sphereGeometry args={[0.1, 16, 16]} />}
            {shape === 'torus' && <torusGeometry args={[0.08, 0.03, 8, 16]} />}
            {shape === 'octahedron' && <octahedronGeometry args={[0.1]} />}
            {shape === 'tetrahedron' && <tetrahedronGeometry args={[0.12]} />}
            <meshStandardMaterial
                color={color || "#0ea5e9"}
                emissive={color || "#0ea5e9"}
                emissiveIntensity={1.5}
                transparent
                opacity={0.7}
            />
        </mesh>
    );
}

// Starfield Background Component
function Starfield() {
    const starsRef = useRef();
    const starCount = 1000;

    // Generate random star positions
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 50;     // x
        starPositions[i + 1] = (Math.random() - 0.5) * 50; // y
        starPositions[i + 2] = (Math.random() - 0.5) * 50; // z
    }

    return (
        <points ref={starsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={starCount}
                    array={starPositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
            />
        </points>
    );
}

// Floating Symbols Field
function FloatingSymbols() {
    const shapes = ['box', 'sphere', 'torus', 'octahedron', 'tetrahedron'];
    const spaceColors = [
        '#0ea5e9', // Cyan
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#06b6d4', // Light cyan
        '#a855f7', // Light purple
        '#f472b6'  // Light pink
    ];

    // Generate random positions - some close, some far
    const symbolPositions = Array.from({ length: 30 }).map(() => ({
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: spaceColors[Math.floor(Math.random() * spaceColors.length)],
        position: [
            (Math.random() - 0.5) * 8,   // x: left to right (narrower)
            0,                            // y: will be controlled by animation
            (Math.random() - 0.5) * 6    // z: depth (some close, some far)
        ],
        speed: 0.5 + Math.random() * 0.5,
        scale: 1 + Math.random() * 1.5, // Larger symbols
        offset: Math.random() * 100,      // Start time offset (0-100 seconds for independence)
        duration: 30 + Math.random() * 20  // How long to rise (30-50 seconds, slower and relaxed)
    }));

    return (
        <>
            {symbolPositions.map((props, i) => (
                <FloatingSymbol key={i} {...props} />
            ))}
        </>
    );
}

// Main Scene Component
function Scene() {
    return (
        <>
            {/* Lighting - adjusted for space theme */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
            <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#8b5cf6" />
            <pointLight position={[0, 0, 0]} intensity={0.5} color="#0ea5e9" distance={20} />

            {/* Starfield Background */}
            <Starfield />

            {/* Floating Code Symbols */}
            <FloatingSymbols />

            {/* Realistic Floating Laptop */}
            <RealisticLaptop />
        </>
    );
}

// Main Canvas Component
function Hero3DBackground() {
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

// Wrap with React.memo to prevent re-renders from parent
export default React.memo(Hero3DBackground);

// Preload models (uncomment when using actual models)
// useGLTF.preload('/models/robotic-hand.glb');
// useGLTF.preload('/models/laptop.glb');
