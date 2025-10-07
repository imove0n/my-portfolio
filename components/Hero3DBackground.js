import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

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
    const [isHovered, setIsHovered] = React.useState(false);

    useFrame((state) => {
        // Smooth rotation (faster when hovered)
        const rotationSpeed = isHovered ? 0.6 : 0.3;
        laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.3;

        // Scale up when hovered
        const targetScale = isHovered ? 1.1 : 1;
        laptopRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);

        // Animated color shift with glitch effect
        if (screenRef.current) {
            const time = state.clock.elapsedTime * 0.2; // Slow cycle
            const cycleProgress = (time % 10) / 10; // 0 to 1 over 10 seconds

            let color;

            // Color cycle: light colors -> dark green -> dark black (glitch) -> reset
            if (cycleProgress < 0.6) {
                // Phase 1: Light space colors (cyan -> purple -> pink)
                const lightTime = cycleProgress / 0.6;
                const r = Math.sin(lightTime * Math.PI * 2) * 0.5 + 0.5;
                const g = Math.sin(lightTime * Math.PI * 2 + 2) * 0.5 + 0.5;
                const b = Math.sin(lightTime * Math.PI * 2 + 4) * 0.5 + 0.5;

                color = {
                    r: 0.05 + r * 0.9,
                    g: 0.4 + g * 0.4,
                    b: 0.7 + b * 0.3
                };
            } else if (cycleProgress < 0.75) {
                // Phase 2: Dark green (glitching)
                const glitchProgress = (cycleProgress - 0.6) / 0.15;
                const flicker = Math.sin(state.clock.elapsedTime * 30) * 0.1 + 0.9; // Fast flicker
                color = {
                    r: 0.05 * flicker,
                    g: (0.2 + glitchProgress * 0.2) * flicker,
                    b: 0.05 * flicker
                };
            } else if (cycleProgress < 0.9) {
                // Phase 3: Almost black (broken screen)
                const flicker = Math.sin(state.clock.elapsedTime * 50) * 0.05 + 0.05; // Very dark flicker
                color = {
                    r: 0.02 * flicker,
                    g: 0.02 * flicker,
                    b: 0.02 * flicker
                };
            } else {
                // Phase 4: Quick flash back to bright (reset)
                const resetProgress = (cycleProgress - 0.9) / 0.1;
                color = {
                    r: resetProgress * 0.5,
                    g: resetProgress * 0.7,
                    b: resetProgress
                };
            }

            screenRef.current.material.color.setRGB(color.r, color.g, color.b);
            screenRef.current.material.emissive.setRGB(color.r, color.g, color.b);

            // Intensity varies based on phase
            if (cycleProgress < 0.6) {
                screenRef.current.material.emissiveIntensity = 0.9 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
            } else if (cycleProgress < 0.75) {
                screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 30) * 0.3;
            } else if (cycleProgress < 0.9) {
                screenRef.current.material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 50) * 0.1;
            } else {
                screenRef.current.material.emissiveIntensity = 2; // Bright flash on reset
            }
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <group
                ref={laptopRef}
                onPointerOver={() => {
                    setIsHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setIsHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
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
function FloatingSymbol({ position, shape, speed, scale, offset, duration, color, health }) {
    const groupRef = useRef();
    const meshRef = useRef();
    const lineRef = useRef();
    const startY = useRef(-2);
    const startTimeRef = useRef(null);
    const [currentHealth, setCurrentHealth] = React.useState(health);
    const [isExploding, setIsExploding] = React.useState(false);
    const [hitAnimation, setHitAnimation] = React.useState(0);

    const slipDirection = useRef({ x: 0, z: 0 });
    const slipVelocity = useRef({ x: 0, y: 0, z: 0 });

    const handleClick = (e) => {
        e.stopPropagation();

        // Apply slip away force in random direction
        const angle = Math.random() * Math.PI * 2;
        const force = 0.5 + Math.random() * 0.5; // Random slip strength

        slipVelocity.current = {
            x: Math.cos(angle) * force,
            y: 0.3 + Math.random() * 0.3, // Pop up a bit
            z: Math.sin(angle) * force
        };

        // Reduce health
        if (currentHealth <= 1) {
            // On last hit, slip away and disappear
            setIsExploding(true);
            setTimeout(() => {
                if (groupRef.current) {
                    groupRef.current.visible = false;
                }
            }, 800);
        } else {
            setCurrentHealth(currentHealth - 1);
            setHitAnimation(1);
            setTimeout(() => setHitAnimation(0), 200);
        }
    };

    useFrame((state, delta) => {
        if (!groupRef.current || !groupRef.current.visible) return;

        // Initialize start time once on first frame
        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.getElapsedTime() - offset;
        }

        // Use clock time for continuous animation (never resets)
        const elapsed = state.clock.getElapsedTime() - startTimeRef.current;
        const progress = ((elapsed % duration) / duration); // 0 to 1, loops

        // Move from bottom to top smoothly
        const yPosition = startY.current + progress * 6; // Start at -2, end at 4
        groupRef.current.position.y = yPosition;

        // Apply slip velocity (physics-like)
        if (slipVelocity.current.x !== 0 || slipVelocity.current.y !== 0 || slipVelocity.current.z !== 0) {
            position[0] += slipVelocity.current.x * delta * 10;
            position[2] += slipVelocity.current.z * delta * 10;

            // Damping (friction)
            slipVelocity.current.x *= 0.95;
            slipVelocity.current.y -= delta * 2; // Gravity
            slipVelocity.current.z *= 0.95;

            // Stop when velocity is very low
            if (Math.abs(slipVelocity.current.x) < 0.01 && Math.abs(slipVelocity.current.z) < 0.01) {
                slipVelocity.current.x = 0;
                slipVelocity.current.z = 0;
                slipVelocity.current.y = 0;
            }
        }

        // Very subtle horizontal drift (more relaxed) + slip offset
        groupRef.current.position.x = position[0] + Math.sin(elapsed * 0.2) * 0.2;
        groupRef.current.position.z = position[2] + Math.cos(elapsed * 0.15) * 0.15;

        // Very slow rotation (relaxed) + wobble when slipping
        const wobble = (slipVelocity.current.x !== 0) ? Math.sin(elapsed * 20) * 0.5 : 0;
        groupRef.current.rotation.y = elapsed * 0.1 * speed + wobble;
        groupRef.current.rotation.x = elapsed * 0.05 * speed;

        // Scale animation
        if (isExploding) {
            // Slip away and fade out
            const fadeProgress = hitAnimation / 0.8;
            groupRef.current.scale.set(
                scale * (1 - fadeProgress * 0.5),
                scale * (1 - fadeProgress * 0.5),
                scale * (1 - fadeProgress * 0.5)
            );
        } else if (hitAnimation > 0) {
            // Hit flash animation
            const flashScale = 1 + hitAnimation * 0.3;
            groupRef.current.scale.set(scale * flashScale, scale * flashScale, scale * flashScale);
            setHitAnimation(Math.max(0, hitAnimation - delta * 5));
        } else {
            groupRef.current.scale.set(scale, scale, scale);
        }

        // Fade in and out at start/end - apply to both mesh and line
        let opacity;
        if (isExploding) {
            opacity = Math.max(0, 1 - hitAnimation * 3);
        } else if (progress < 0.1) {
            opacity = progress * 8; // Fade in
        } else if (progress > 0.9) {
            opacity = (1 - progress) * 8; // Fade out
        } else {
            opacity = 0.7; // More visible
        }

        if (meshRef.current) {
            meshRef.current.material.opacity = opacity;
            // Flash effect when hit
            meshRef.current.material.emissiveIntensity = 1.5 + hitAnimation * 2;
        }
        if (lineRef.current) {
            lineRef.current.material.opacity = opacity * 1.2;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Main filled mesh - clickable */}
            <mesh ref={meshRef} onClick={handleClick} onPointerOver={(e) => (document.body.style.cursor = 'pointer')} onPointerOut={(e) => (document.body.style.cursor = 'auto')}>
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

            {/* Edge lines for 3D effect - thicker */}
            <lineSegments ref={lineRef}>
                {shape === 'box' && <edgesGeometry args={[new THREE.BoxGeometry(0.15, 0.15, 0.15)]} />}
                {shape === 'sphere' && <edgesGeometry args={[new THREE.SphereGeometry(0.1, 16, 16)]} />}
                {shape === 'torus' && <edgesGeometry args={[new THREE.TorusGeometry(0.08, 0.03, 8, 16)]} />}
                {shape === 'octahedron' && <edgesGeometry args={[new THREE.OctahedronGeometry(0.1)]} />}
                {shape === 'tetrahedron' && <edgesGeometry args={[new THREE.TetrahedronGeometry(0.12)]} />}
                <lineBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={1}
                    linewidth={3}
                />
            </lineSegments>
        </group>
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

// Space Dust/Particles Component
function SpaceDust() {
    const dustRef = useRef();
    const particleCount = 200;

    // Generate random particle positions
    const particlePositions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 20;     // x
        particlePositions[i + 1] = (Math.random() - 0.5) * 20; // y
        particlePositions[i + 2] = (Math.random() - 0.5) * 20; // z

        // Store velocity for each particle
        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    useFrame((state, delta) => {
        if (!dustRef.current) return;

        const positions = dustRef.current.geometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Move particles
            positions[i3] += velocities[i].x;
            positions[i3 + 1] += velocities[i].y;
            positions[i3 + 2] += velocities[i].z;

            // Wrap around if particle goes too far
            if (Math.abs(positions[i3]) > 10) positions[i3] *= -1;
            if (Math.abs(positions[i3 + 1]) > 10) positions[i3 + 1] *= -1;
            if (Math.abs(positions[i3 + 2]) > 10) positions[i3 + 2] *= -1;
        }

        dustRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={dustRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particlePositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#8b5cf6"
                transparent
                opacity={0.4}
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

    // Generate random positions - avoid the center laptop area
    const symbolPositions = Array.from({ length: 30 }).map(() => {
        // Randomly choose left or right side
        const isLeftSide = Math.random() > 0.5;

        // Position on left side (-8 to -2.5) or right side (2.5 to 8)
        const xPosition = isLeftSide
            ? -8 + Math.random() * 5.5   // Left: -8 to -2.5
            : 2.5 + Math.random() * 5.5; // Right: 2.5 to 8

        return {
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            color: spaceColors[Math.floor(Math.random() * spaceColors.length)],
            position: [
                xPosition,                    // x: left or right sides only
                0,                            // y: will be controlled by animation
                (Math.random() - 0.5) * 6    // z: depth (some close, some far)
            ],
            speed: 0.5 + Math.random() * 0.5,
            scale: 1 + Math.random() * 1.5, // Larger symbols
            offset: Math.random() * 100,      // Start time offset (0-100 seconds for independence)
            duration: 30 + Math.random() * 20,  // How long to rise (30-50 seconds, slower and relaxed)
            health: Math.floor(Math.random() * 4) + 1  // Random health: 1 to 4 hits
        };
    });

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

            {/* Space Dust Particles */}
            <SpaceDust />

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
                    pointer-events: auto;
                }
                .canvas-container canvas {
                    pointer-events: auto !important;
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
