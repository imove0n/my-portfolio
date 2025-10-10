import React, { useRef, Suspense, useMemo } from 'react';
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

// BLACK HOLE Component with Accretion Disk
function BlackHole({ position }) {
    const blackHoleRef = useRef();
    const accretionDiskRef = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Rotate accretion disk
        if (accretionDiskRef.current) {
            accretionDiskRef.current.rotation.z = time * 0.5;
        }

        // Pulsing glow effect
        if (glowRef.current) {
            const pulse = Math.sin(time * 2) * 0.3 + 1;
            glowRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group position={position}>
            {/* Black hole core (event horizon) */}
            <mesh ref={blackHoleRef}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Gravitational lensing glow */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial
                    color="#ff6600"
                    transparent
                    opacity={0.3}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Accretion disk */}
            <mesh ref={accretionDiskRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.2, 0.3, 16, 100]} />
                <meshStandardMaterial
                    color="#ff4400"
                    emissive="#ff6600"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Inner bright ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.8, 0.15, 16, 100]} />
                <meshStandardMaterial
                    color="#ffaa00"
                    emissive="#ffaa00"
                    emissiveIntensity={3}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Point light for illumination */}
            <pointLight position={[0, 0, 0]} intensity={3} color="#ff6600" distance={10} />
        </group>
    );
}

// MILKY WAY Galaxy Background
function MilkyWayGalaxy() {
    const galaxyRef = useRef();
    const particleCount = 3000;

    // Generate spiral galaxy pattern
    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Spiral galaxy math
            const radius = Math.random() * 15 + 5;
            const spinAngle = radius * 0.3;
            const branchAngle = ((i % 6) / 6) * Math.PI * 2;

            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY * 0.3;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ - 20; // Far away

            // Colors - mix of blue, white, and orange
            const mixedColor = new THREE.Color();
            const innerColor = new THREE.Color('#4488ff');
            const outerColor = new THREE.Color('#ff8844');
            mixedColor.lerpColors(innerColor, outerColor, radius / 20);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            sizes[i] = Math.random() * 2 + 0.5;
        }

        return { positions, colors, sizes };
    }, []);

    useFrame((state) => {
        if (galaxyRef.current) {
            galaxyRef.current.rotation.z = state.clock.getElapsedTime() * 0.01;
        }
    });

    return (
        <points ref={galaxyRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particleCount}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                transparent
                opacity={0.8}
                vertexColors
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// NEBULA Clouds
function NebulaClouds() {
    const nebulaRef = useRef();

    useFrame((state) => {
        if (nebulaRef.current) {
            nebulaRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <group ref={nebulaRef} position={[0, 0, -15]}>
            {/* Multiple overlapping spheres create nebula effect */}
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]}>
                    <sphereGeometry args={[3 + Math.random() * 3, 32, 32]} />
                    <meshBasicMaterial
                        color={i % 2 === 0 ? '#6366f1' : '#ec4899'}
                        transparent
                        opacity={0.15}
                        side={THREE.BackSide}
                    />
                </mesh>
            ))}
        </group>
    );
}

// SHOOTING STAR Component
function ShootingStar({ startPosition, delay }) {
    const starRef = useRef();
    const trailRef = useRef();
    const [isVisible, setIsVisible] = React.useState(false);
    const startTime = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (!startTime.current && time > delay) {
            startTime.current = time;
            setIsVisible(true);
        }

        if (startTime.current && isVisible) {
            const elapsed = time - startTime.current;
            const duration = 2;
            const progress = elapsed / duration;

            if (progress < 1) {
                // Move diagonally across screen
                starRef.current.position.x = startPosition[0] - progress * 15;
                starRef.current.position.y = startPosition[1] - progress * 8;
                starRef.current.position.z = startPosition[2] - progress * 5;

                // Fade out
                if (trailRef.current) {
                    trailRef.current.material.opacity = 1 - progress;
                }
            } else {
                // Reset for next cycle
                startTime.current = time + Math.random() * 10;
                setIsVisible(false);
            }
        }
    });

    if (!isVisible) return null;

    return (
        <group ref={starRef} position={startPosition}>
            <mesh>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Trail */}
            <mesh ref={trailRef} position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[2, 0.02, 0.02]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={1} />
            </mesh>
            <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" distance={2} />
        </group>
    );
}

// 3D HOLOGRAPHIC SPINNING TEXT
function HolographicText({ text, position }) {
    const textGroupRef = useRef();
    const glitchOffset = useRef({ x: 0, y: 0 });

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Orbit around center
        textGroupRef.current.position.x = position[0] + Math.cos(time * 0.3) * 2;
        textGroupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.5;
        textGroupRef.current.rotation.y = time * 0.5;

        // Random glitch every few seconds
        if (Math.random() > 0.98) {
            glitchOffset.current.x = (Math.random() - 0.5) * 0.1;
            glitchOffset.current.y = (Math.random() - 0.5) * 0.1;
        } else {
            glitchOffset.current.x *= 0.9;
            glitchOffset.current.y *= 0.9;
        }
    });

    return (
        <group ref={textGroupRef} position={position}>
            {/* Main text using 3D boxes as letters (simplified) */}
            {text.split('').map((char, i) => (
                <mesh key={i} position={[(i - text.length / 2) * 0.3, 0, 0]}>
                    <boxGeometry args={[0.25, 0.4, 0.1]} />
                    <meshStandardMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.8}
                        wireframe={Math.random() > 0.7} // Random wireframe for glitch
                    />
                </mesh>
            ))}

            {/* Holographic glow layers */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[text.length * 0.3, 0.6]} />
                <meshBasicMaterial
                    color="#00ffff"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

// Realistic Laptop Component (keeping your original)
function RealisticLaptop({ theme }) {
    const laptopRef = useRef();
    const screenRef = useRef();
    const [isHovered, setIsHovered] = React.useState(false);
    const [isGlitching, setIsGlitching] = React.useState(false);
    const glitchTimeRef = useRef(0);
    const themeRef = useRef(theme);

    const materialRefs = useRef({
        bottomCase: null,
        keyboard: null,
        keys: [],
        trackpad: null,
        screenLid: null,
        bezel: null
    });

    React.useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsGlitching(true);
        glitchTimeRef.current = 0;
        setTimeout(() => setIsGlitching(false), 800);
    };

    useFrame((state) => {
        const isDarkMode = themeRef.current === 'dark';

        if (materialRefs.current.bottomCase) {
            materialRefs.current.bottomCase.color.setHex(isDarkMode ? 0xe5e7eb : 0x2c2c2e);
            materialRefs.current.bottomCase.emissive.setHex(0x000000);
            materialRefs.current.bottomCase.emissiveIntensity = 0;
        }

        if (materialRefs.current.keyboard) {
            materialRefs.current.keyboard.color.setHex(isDarkMode ? 0xd1d5db : 0x1a1a1a);
            materialRefs.current.keyboard.emissive.setHex(0x000000);
            materialRefs.current.keyboard.emissiveIntensity = 0;
        }

        materialRefs.current.keys.forEach(mat => {
            if (mat) {
                mat.color.setHex(isDarkMode ? 0xffffff : 0x3a3a3c);
                mat.emissive.setHex(0x000000);
                mat.emissiveIntensity = 0;
            }
        });

        if (materialRefs.current.trackpad) {
            materialRefs.current.trackpad.color.setHex(isDarkMode ? 0xd1d5db : 0x1a1a1a);
            materialRefs.current.trackpad.emissive.setHex(0x000000);
            materialRefs.current.trackpad.emissiveIntensity = 0;
        }

        if (materialRefs.current.screenLid) {
            materialRefs.current.screenLid.color.setHex(isDarkMode ? 0xe5e7eb : 0x1a1a1a);
            materialRefs.current.screenLid.emissive.setHex(0x000000);
            materialRefs.current.screenLid.emissiveIntensity = 0;
        }

        if (materialRefs.current.bezel) {
            materialRefs.current.bezel.color.setHex(isDarkMode ? 0x9ca3af : 0x0a0a0a);
            materialRefs.current.bezel.emissive.setHex(0x000000);
            materialRefs.current.bezel.emissiveIntensity = 0;
        }

        const rotationSpeed = isHovered ? 0.6 : 0.3;
        laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.3;

        const targetScale = isHovered ? 1.1 : 1;
        laptopRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);

        if (screenRef.current) {
            const time = state.clock.elapsedTime * 0.15;
            const cycleProgress = (time % 10) / 10;

            const colors = [
                { r: 0.05, g: 0.65, b: 0.91 },
                { r: 0.54, g: 0.36, b: 0.96 },
                { r: 0.92, g: 0.28, b: 0.6 },
                { r: 0.05, g: 0.1, b: 0.35 },
                { r: 0.18, g: 0.08, b: 0.35 },
                { r: 0.25, g: 0.05, b: 0.4 },
                { r: 0.05, g: 0.2, b: 0.05 },
                { r: 0.02, g: 0.02, b: 0.02 }
            ];

            let color;
            let emissiveIntensity;

            if (isGlitching) {
                glitchTimeRef.current += state.delta;
                const flickerSpeed = 50;
                const flickerIndex = Math.floor(state.clock.elapsedTime * flickerSpeed) % colors.length;
                const randomColor = colors[flickerIndex];

                const offset = Math.random() * 0.3;
                color = {
                    r: Math.min(1, randomColor.r + offset),
                    g: Math.min(1, randomColor.g + offset),
                    b: Math.min(1, randomColor.b + offset)
                };

                emissiveIntensity = 1.5 + Math.random() * 1.5;

                if (laptopRef.current) {
                    laptopRef.current.position.x += (Math.random() - 0.5) * 0.05;
                    laptopRef.current.position.y += (Math.random() - 0.5) * 0.05;
                }
            } else {
                const numColors = colors.length;
                const colorIndex = cycleProgress * numColors;
                const currentIndex = Math.floor(colorIndex);
                const nextIndex = (currentIndex + 1) % numColors;
                const blend = colorIndex - currentIndex;

                const smoothBlend = blend < 0.5
                    ? 2 * blend * blend
                    : 1 - Math.pow(-2 * blend + 2, 2) / 2;

                const color1 = colors[currentIndex];
                const color2 = colors[nextIndex];

                color = {
                    r: color1.r + (color2.r - color1.r) * smoothBlend,
                    g: color1.g + (color2.g - color1.g) * smoothBlend,
                    b: color1.b + (color2.b - color1.b) * smoothBlend
                };

                emissiveIntensity = Math.sin(state.clock.elapsedTime * 0.8) * 0.3 + 0.9;
            }

            screenRef.current.material.color.setRGB(color.r, color.g, color.b);
            screenRef.current.material.emissive.setRGB(color.r, color.g, color.b);
            screenRef.current.material.emissiveIntensity = emissiveIntensity;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <group
                ref={laptopRef}
                position={[2, 0, 0]} // Moved right to make room for black hole
                onClick={handleClick}
                onPointerOver={() => {
                    setIsHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setIsHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <mesh position={[0, -0.05, 0]}>
                    <boxGeometry args={[2.4, 0.08, 1.6]} />
                    <meshStandardMaterial
                        ref={(mat) => (materialRefs.current.bottomCase = mat)}
                        color="#2c2c2e"
                        metalness={0.8}
                        roughness={0.3}
                    />
                </mesh>

                <mesh position={[0, 0.01, 0.1]}>
                    <boxGeometry args={[2.1, 0.01, 1.3]} />
                    <meshStandardMaterial
                        ref={(mat) => (materialRefs.current.keyboard = mat)}
                        color="#1a1a1a"
                        metalness={0.2}
                        roughness={0.8}
                    />
                </mesh>

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
                                ref={(mat) => {
                                    if (mat && !materialRefs.current.keys.includes(mat)) {
                                        materialRefs.current.keys.push(mat);
                                    }
                                }}
                                color="#3a3a3c"
                                metalness={0.1}
                                roughness={0.9}
                            />
                        </mesh>
                    );
                })}

                <mesh position={[0, 0.01, 0.6]}>
                    <boxGeometry args={[0.8, 0.005, 0.5]} />
                    <meshStandardMaterial
                        ref={(mat) => (materialRefs.current.trackpad = mat)}
                        color="#1a1a1a"
                        metalness={0.4}
                        roughness={0.6}
                    />
                </mesh>

                <mesh position={[0, 0.7, -0.75]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[2.4, 1.5, 0.04]} />
                    <meshStandardMaterial
                        ref={(mat) => (materialRefs.current.screenLid = mat)}
                        color="#1a1a1a"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>

                <mesh position={[0, 0.7, -0.73]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[2.3, 1.4, 0.01]} />
                    <meshStandardMaterial
                        ref={(mat) => (materialRefs.current.bezel = mat)}
                        color="#0a0a0a"
                        metalness={0.6}
                        roughness={0.4}
                    />
                </mesh>

                <mesh ref={screenRef} position={[0, 0.7, -0.725]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[2.2, 1.3, 0.001]} />
                    <meshStandardMaterial
                        color="#0ea5e9"
                        emissive="#0ea5e9"
                        emissiveIntensity={0.8}
                        toneMapped={false}
                    />
                </mesh>

                <mesh position={[0, 1.4, -0.73]} rotation={[-0.3, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
                    <meshStandardMaterial
                        color="#000000"
                        metalness={0.5}
                        roughness={0.5}
                    />
                </mesh>

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

                <pointLight position={[0, 0.7, -0.5]} intensity={1.5} color="#0ea5e9" distance={2} />
                <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" distance={3} />
            </group>
        </Float>
    );
}

// Shatter Particle Component
function ShatterParticle({ position, velocity, color, size }) {
    const meshRef = useRef();
    const vel = useRef(velocity);
    const life = useRef(1);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        vel.current.y -= delta * 5;
        meshRef.current.position.x += vel.current.x * delta * 3;
        meshRef.current.position.y += vel.current.y * delta * 3;
        meshRef.current.position.z += vel.current.z * delta * 3;

        meshRef.current.rotation.x += delta * 10 * vel.current.x;
        meshRef.current.rotation.y += delta * 10 * vel.current.y;

        life.current -= delta * 2;
        if (meshRef.current.material) {
            meshRef.current.material.opacity = Math.max(0, life.current);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1}
                transparent
                opacity={1}
            />
        </mesh>
    );
}

// Floating Code Symbol Component WITH BLACK HOLE GRAVITY
function FloatingSymbol({ position, shape, speed, scale, offset, duration, color, health, theme, blackHolePosition }) {
    const groupRef = useRef();
    const meshRef = useRef();
    const lineRef = useRef();
    const startY = useRef(-2);
    const startTimeRef = useRef(null);
    const [currentHealth, setCurrentHealth] = React.useState(health);
    const [isExploding, setIsExploding] = React.useState(false);
    const [hitAnimation, setHitAnimation] = React.useState(0);
    const audioRef = useRef(null);
    const [shatterParticles, setShatterParticles] = React.useState([]);
    const [beingSucked, setBeingSucked] = React.useState(false);

    const slipVelocity = useRef({ x: 0, y: 0, z: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const dragStartPos = useRef({ x: 0, y: 0, z: 0 });
    const isDraggingRef = useRef(false);
    const { camera } = useThree();
    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());
    const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
    const intersectionPoint = useRef(new THREE.Vector3());

    React.useEffect(() => {
        audioRef.current = new Audio('/sound click.mp3');
        audioRef.current.volume = 0.5;
        audioRef.current.load();

        const handleMouseMove = (event) => {
            if (isDraggingRef.current) {
                mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handlePointerDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
        isDraggingRef.current = true;

        dragStartPos.current = {
            x: groupRef.current.position.x,
            y: groupRef.current.position.y,
            z: groupRef.current.position.z
        };

        plane.current.constant = -groupRef.current.position.z;

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
    };

    const handlePointerUp = (e) => {
        e.stopPropagation();

        if (isDraggingRef.current) {
            setIsDragging(false);
            isDraggingRef.current = false;

            const dx = groupRef.current.position.x - dragStartPos.current.x;
            const dz = groupRef.current.position.z - dragStartPos.current.z;
            const speed = Math.sqrt(dx * dx + dz * dz);

            if (speed > 0.2) {
                slipVelocity.current = {
                    x: dx * 1.5,
                    y: 0.3 + Math.random() * 0.2,
                    z: dz * 1.5
                };
            } else {
                const angle = Math.random() * Math.PI * 2;
                const force = 0.5 + Math.random() * 0.5;
                slipVelocity.current = {
                    x: Math.cos(angle) * force,
                    y: 0.3 + Math.random() * 0.3,
                    z: Math.sin(angle) * force
                };
            }

            if (currentHealth <= 1) {
                setIsExploding(true);

                const particles = [];
                const currentPos = groupRef.current.position;
                for (let i = 0; i < 12; i++) {
                    const angle = (Math.PI * 2 * i) / 12;
                    const spread = 0.3 + Math.random() * 0.3;
                    particles.push({
                        id: Math.random(),
                        position: [currentPos.x, currentPos.y, currentPos.z],
                        velocity: {
                            x: Math.cos(angle) * spread,
                            y: 0.5 + Math.random() * 0.5,
                            z: Math.sin(angle) * spread
                        },
                        size: 0.02 + Math.random() * 0.03
                    });
                }
                setShatterParticles(particles);

                setTimeout(() => {
                    if (groupRef.current) {
                        groupRef.current.visible = false;
                    }
                    setShatterParticles([]);
                }, 800);
            } else {
                setCurrentHealth(currentHealth - 1);
                setHitAnimation(1);
                setTimeout(() => setHitAnimation(0), 200);
            }
        }
    };

    useFrame((state, delta) => {
        if (!groupRef.current || !groupRef.current.visible) return;

        // BLACK HOLE GRAVITY EFFECT
        if (blackHolePosition && !isDraggingRef.current) {
            const dx = blackHolePosition[0] - position[0];
            const dy = blackHolePosition[1] - groupRef.current.position.y;
            const dz = blackHolePosition[2] - position[2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            // If within gravity range (5 units), apply pull
            if (distance < 5) {
                const pullStrength = (1 - distance / 5) * 0.02; // Stronger as closer
                const pullX = (dx / distance) * pullStrength;
                const pullY = (dy / distance) * pullStrength;
                const pullZ = (dz / distance) * pullStrength;

                position[0] += pullX;
                position[2] += pullZ;

                // Spaghettification effect - stretch geometry as it approaches
                if (distance < 2) {
                    const stretchFactor = 1 + (2 - distance) * 0.5;
                    groupRef.current.scale.y = scale * stretchFactor;
                    groupRef.current.rotation.z += delta * 5; // Spin faster

                    // Mark as being sucked
                    setBeingSucked(true);
                }

                // Disappear if too close to event horizon
                if (distance < 0.5) {
                    groupRef.current.visible = false;
                }
            }
        }

        if (isDraggingRef.current) {
            raycaster.current.setFromCamera(mouse.current, camera);
            raycaster.current.ray.intersectPlane(plane.current, intersectionPoint.current);

            position[0] = intersectionPoint.current.x;
            groupRef.current.position.x = intersectionPoint.current.x;
            groupRef.current.position.y = intersectionPoint.current.y;

            return;
        }

        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.getElapsedTime() - offset;
        }

        const elapsed = state.clock.getElapsedTime() - startTimeRef.current;
        const progress = ((elapsed % duration) / duration);

        const yPosition = startY.current + progress * 6;
        groupRef.current.position.y = yPosition;

        if (slipVelocity.current.x !== 0 || slipVelocity.current.y !== 0 || slipVelocity.current.z !== 0) {
            position[0] += slipVelocity.current.x * delta * 10;
            position[2] += slipVelocity.current.z * delta * 10;

            slipVelocity.current.x *= 0.95;
            slipVelocity.current.y -= delta * 2;
            slipVelocity.current.z *= 0.95;

            if (Math.abs(slipVelocity.current.x) < 0.01 && Math.abs(slipVelocity.current.z) < 0.01) {
                slipVelocity.current.x = 0;
                slipVelocity.current.z = 0;
                slipVelocity.current.y = 0;
            }
        }

        groupRef.current.position.x = position[0] + Math.sin(elapsed * 0.2) * 0.2;
        groupRef.current.position.z = position[2] + Math.cos(elapsed * 0.15) * 0.15;

        const wobble = (slipVelocity.current.x !== 0) ? Math.sin(elapsed * 20) * 0.5 : 0;
        groupRef.current.rotation.y = elapsed * 0.1 * speed + wobble;
        groupRef.current.rotation.x = elapsed * 0.05 * speed;

        if (isExploding) {
            const fadeProgress = hitAnimation / 0.8;
            groupRef.current.scale.set(
                scale * (1 - fadeProgress * 0.5),
                scale * (1 - fadeProgress * 0.5),
                scale * (1 - fadeProgress * 0.5)
            );
        } else if (hitAnimation > 0) {
            const flashScale = 1 + hitAnimation * 0.3;
            groupRef.current.scale.set(scale * flashScale, scale * flashScale, scale * flashScale);
            setHitAnimation(Math.max(0, hitAnimation - delta * 5));
        } else if (!beingSucked) {
            groupRef.current.scale.set(scale, scale, scale);
        }

        let opacity;
        if (isExploding) {
            opacity = Math.max(0, 1 - hitAnimation * 3);
        } else if (progress < 0.1) {
            opacity = progress * 8;
        } else if (progress > 0.9) {
            opacity = (1 - progress) * 8;
        } else {
            opacity = 0.7;
        }

        if (meshRef.current) {
            meshRef.current.material.opacity = opacity;
            meshRef.current.material.emissiveIntensity = 1.5 + hitAnimation * 2;

            if (theme === 'light') {
                const darkColor = color === '#0ea5e9' ? '#0284c7' :
                                 color === '#8b5cf6' ? '#7c3aed' :
                                 color === '#ec4899' ? '#db2777' :
                                 color === '#06b6d4' ? '#0891b2' :
                                 color === '#a855f7' ? '#9333ea' : '#be185d';
                meshRef.current.material.color.set(darkColor);
                meshRef.current.material.emissive.set(darkColor);
            } else {
                meshRef.current.material.color.set(color);
                meshRef.current.material.emissive.set(color);
            }
        }
        if (lineRef.current) {
            lineRef.current.material.opacity = opacity * 1.2;
            if (theme === 'light') {
                lineRef.current.material.color.set('#334155');
            } else {
                lineRef.current.material.color.set('#ffffff');
            }
        }
    });

    return (
        <>
            <group ref={groupRef} position={position} scale={scale}>
                <mesh
                    ref={meshRef}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerOver={(e) => (document.body.style.cursor = 'grab')}
                    onPointerOut={(e) => (document.body.style.cursor = 'auto')}
                >
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

            {shatterParticles.map((particle) => (
                <ShatterParticle
                    key={particle.id}
                    position={particle.position}
                    velocity={particle.velocity}
                    color={color || "#0ea5e9"}
                    size={particle.size}
                />
            ))}
        </>
    );
}

// Cloud Component for Light Mode
function Cloud({ position, scale, speed }) {
    const cloudRef = useRef();
    const initialX = useRef(position[0]);

    useFrame((state) => {
        if (!cloudRef.current) return;
        const time = state.clock.getElapsedTime();
        cloudRef.current.position.x = initialX.current + Math.sin(time * speed * 0.3) * 2;
        cloudRef.current.position.y = position[1] + Math.sin(time * speed * 0.2) * 0.3;
    });

    return (
        <group ref={cloudRef} position={position} scale={scale}>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.6, 16, 16]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
            <mesh position={[0.5, 0.1, 0]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.75} />
            </mesh>
            <mesh position={[-0.4, 0.05, 0]}>
                <sphereGeometry args={[0.45, 16, 16]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
            </mesh>
            <mesh position={[0.2, -0.2, 0]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.65} />
            </mesh>
        </group>
    );
}

// Sky Clouds Component for Light Mode
function SkyClouds() {
    const cloudData = React.useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                2 + Math.random() * 4,
                -5 - Math.random() * 10
            ],
            scale: 0.8 + Math.random() * 1.5,
            speed: 0.3 + Math.random() * 0.5
        }));
    }, []);

    return (
        <>
            {cloudData.map((cloud, i) => (
                <Cloud key={i} {...cloud} />
            ))}
        </>
    );
}

// Starfield Background Component
function Starfield({ theme }) {
    const starsRef = useRef();
    const starCount = 1000;

    const starPositions = useMemo(() => {
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 50;
            positions[i + 1] = (Math.random() - 0.5) * 50;
            positions[i + 2] = (Math.random() - 0.5) * 50;
        }
        return positions;
    }, []);

    if (theme === 'light') return null;

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
function SpaceDust({ theme }) {
    const dustRef = useRef();
    const materialRef = useRef();
    const particleCount = 200;

    const { particlePositions, particleSizes, velocities } = useMemo(() => {
        const particlePositions = new Float32Array(particleCount * 3);
        const particleSizes = new Float32Array(particleCount);
        const velocities = [];

        for (let i = 0; i < particleCount * 3; i += 3) {
            particlePositions[i] = (Math.random() - 0.5) * 20;
            particlePositions[i + 1] = (Math.random() - 0.5) * 20;
            particlePositions[i + 2] = (Math.random() - 0.5) * 20;

            const isMeteor = Math.random() > 0.85;
            particleSizes[i / 3] = isMeteor ? 0.08 + Math.random() * 0.12 : 0.02 + Math.random() * 0.03;

            const speed = isMeteor ? 0.04 : 0.02;
            velocities.push({
                x: (Math.random() - 0.5) * speed,
                y: (Math.random() - 0.5) * speed,
                z: (Math.random() - 0.5) * speed,
                isMeteor: isMeteor
            });
        }

        return { particlePositions, particleSizes, velocities };
    }, []);

    useFrame((state, delta) => {
        if (!dustRef.current) return;

        const positions = dustRef.current.geometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            positions[i3] += velocities[i].x;
            positions[i3 + 1] += velocities[i].y;
            positions[i3 + 2] += velocities[i].z;

            if (Math.abs(positions[i3]) > 10) positions[i3] *= -1;
            if (Math.abs(positions[i3 + 1]) > 10) positions[i3 + 1] *= -1;
            if (Math.abs(positions[i3 + 2]) > 10) positions[i3 + 2] *= -1;
        }

        dustRef.current.geometry.attributes.position.needsUpdate = true;

        if (materialRef.current) {
            if (theme === 'light') {
                materialRef.current.color.setHex(0x0284c7);
                materialRef.current.opacity = 0.6;
            } else {
                materialRef.current.color.setHex(0x8b5cf6);
                materialRef.current.opacity = 0.7;
            }
        }
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
                <bufferAttribute
                    attach="attributes-size"
                    count={particleCount}
                    array={particleSizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                size={0.05}
                color="#8b5cf6"
                transparent
                opacity={0.7}
                sizeAttenuation={true}
                vertexColors={false}
            />
        </points>
    );
}

// Floating Symbols Field
function FloatingSymbols({ theme, blackHolePosition }) {
    const shapes = ['box', 'sphere', 'torus', 'octahedron', 'tetrahedron'];
    const spaceColors = [
        '#0ea5e9',
        '#8b5cf6',
        '#ec4899',
        '#06b6d4',
        '#a855f7',
        '#f472b6'
    ];

    const symbolPositions = React.useMemo(() => {
        return Array.from({ length: 30 }).map(() => {
            const isLeftSide = Math.random() > 0.5;

            const xPosition = isLeftSide
                ? -8 + Math.random() * 5.5
                : 2.5 + Math.random() * 5.5;

            return {
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                color: spaceColors[Math.floor(Math.random() * spaceColors.length)],
                position: [
                    xPosition,
                    0,
                    (Math.random() - 0.5) * 6
                ],
                speed: 0.5 + Math.random() * 0.5,
                scale: 1 + Math.random() * 1.5,
                offset: Math.random() * 100,
                duration: 30 + Math.random() * 20,
                health: Math.floor(Math.random() * 4) + 1
            };
        });
    }, []);

    return (
        <>
            {symbolPositions.map((props, i) => (
                <FloatingSymbol key={i} {...props} theme={theme} blackHolePosition={blackHolePosition} />
            ))}
        </>
    );
}

// Main Scene Component
function Scene({ theme }) {
    const blackHolePosition = [-3, 0, 0]; // Position on the left

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={theme === 'light' ? 0.8 : 0.3} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={theme === 'light' ? 1 : 0.4}
                color={theme === 'light' ? '#fbbf24' : '#ffffff'}
            />
            <directionalLight
                position={[-5, 3, -5]}
                intensity={theme === 'light' ? 0.6 : 0.3}
                color={theme === 'light' ? '#60a5fa' : '#8b5cf6'}
            />
            {theme !== 'light' && (
                <pointLight position={[0, 0, 0]} intensity={0.5} color="#0ea5e9" distance={20} />
            )}

            {/* MILKY WAY GALAXY (far background) */}
            <MilkyWayGalaxy />

            {/* NEBULA CLOUDS */}
            <NebulaClouds />

            {/* Starfield Background (hidden in light mode) */}
            <Starfield theme={theme} />

            {/* Sky Clouds (only in light mode) */}
            {theme === 'light' && <SkyClouds />}

            {/* Space Dust Particles */}
            <SpaceDust theme={theme} />

            {/* BLACK HOLE (left side) */}
            <BlackHole position={blackHolePosition} />

            {/* Floating Code Symbols with gravity */}
            <FloatingSymbols theme={theme} blackHolePosition={blackHolePosition} />

            {/* HOLOGRAPHIC 3D TEXT */}
            <HolographicText text="DEVELOPER" position={[0, 2.5, 0]} />

            {/* Realistic Floating Laptop (right side) */}
            <RealisticLaptop theme={theme} />

            {/* SHOOTING STARS */}
            <ShootingStar startPosition={[8, 4, -5]} delay={2} />
            <ShootingStar startPosition={[-8, 5, -3]} delay={5} />
            <ShootingStar startPosition={[6, 3, -8]} delay={8} />
        </>
    );
}

// Main Canvas Component
function Hero3DBackground({ theme }) {
    return (
        <div className="canvas-container" data-theme={theme}>
            <Canvas
                camera={{ position: [0, 1, 8], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene theme={theme} />
                </Suspense>
                {theme === 'light' && <color attach="background" args={['#87CEEB']} />}
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
                    transition: background 0.5s ease;
                }

                .canvas-container[data-theme="light"] {
                    background: linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #ffffff 100%);
                }

                .canvas-container canvas {
                    pointer-events: auto !important;
                }
            `}</style>
        </div>
    );
}

export default React.memo(Hero3DBackground, (prevProps, nextProps) => {
    return prevProps.theme === nextProps.theme;
});
