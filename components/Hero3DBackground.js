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

// MILKY WAY Galaxy Background - FAR AWAY
function MilkyWayGalaxy() {
    const galaxyRef = useRef();
    const particleCount = 5000; // More particles for better detail at distance

    // Generate spiral galaxy pattern
    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Spiral galaxy math - larger radius for bigger galaxy
            const radius = Math.random() * 25 + 8; // Bigger galaxy
            const spinAngle = radius * 0.3;
            const branchAngle = ((i % 6) / 6) * Math.PI * 2;

            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY * 0.4;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ - 50; // MUCH farther away!

            // Colors - mix of blue, white, and orange (galaxy colors)
            const mixedColor = new THREE.Color();
            const innerColor = new THREE.Color('#5599ff'); // Bright blue core
            const outerColor = new THREE.Color('#ff9955'); // Orange outer arms
            mixedColor.lerpColors(innerColor, outerColor, radius / 30);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            sizes[i] = Math.random() * 3 + 0.8; // Slightly bigger particles
        }

        return { positions, colors, sizes };
    }, []);

    useFrame((state) => {
        if (galaxyRef.current) {
            galaxyRef.current.rotation.z = state.clock.getElapsedTime() * 0.005; // Slower rotation
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
                size={0.12}
                transparent
                opacity={0.7} // Slightly more subtle
                vertexColors
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// DISTANT GALAXIES - 7 small random galaxies that change position on every reload
function DistantGalaxies() {
    // Generate 7 random small distant galaxies - different position on each page load
    const galaxies = useMemo(() => {
        const colorPalette = [
            ['#6688ff', '#99aaff'],
            ['#ff88bb', '#ffaacc'],
            ['#88ffaa', '#aaffcc'],
            ['#ffaa77', '#ffcc99'],
            ['#aa88ff', '#ccaaff'],
            ['#77ddff', '#99eeff'],
            ['#ffbb88', '#ffddaa']
        ];

        return Array.from({ length: 7 }).map((_, index) => {
            // Random position in 3D space
            const x = (Math.random() - 0.5) * 80; // Random X: -40 to +40
            const y = (Math.random() - 0.5) * 60; // Random Y: -30 to +30
            const z = -150 - Math.random() * 100; // Random Z: -150 to -250 (super far!)

            return {
                position: [x, y, z],
                particleCount: 600 + Math.floor(Math.random() * 400), // 600-1000 particles (small)
                radius: [3 + Math.random() * 2, 8 + Math.random() * 4], // Small radius: 3-5 to 8-12
                rotation: 0.0005 + Math.random() * 0.002, // Slow rotation
                spiralArms: 3 + Math.floor(Math.random() * 3), // 3-5 arms
                colors: colorPalette[index],
                opacity: 0.25 + Math.random() * 0.2 // 0.25-0.45 (faint)
            };
        });
    }, []); // Empty dependency = generates new positions on every mount/reload

    return (
        <>
            {galaxies.map((galaxy, index) => (
                <SingleDistantGalaxy key={index} {...galaxy} />
            ))}
        </>
    );
}

// Single distant galaxy component
function SingleDistantGalaxy({ position, particleCount, radius, rotation, colors, spiralArms, opacity }) {
    const galaxyRef = useRef();

    const { positions, colors: particleColors, sizes } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Spiral galaxy math - using unique spiral arms count
            const r = Math.random() * (radius[1] - radius[0]) + radius[0];
            const spinAngle = r * (0.2 + Math.random() * 0.2); // Variable spin tightness
            const branchAngle = ((i % spiralArms) / spiralArms) * Math.PI * 2;

            // More variation in particle distribution for authenticity
            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (0.4 + Math.random() * 0.4);
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.3);
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (0.4 + Math.random() * 0.4);

            positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
            positions[i3 + 1] = randomY * (0.2 + Math.random() * 0.2); // Variable thickness
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

            // Color mixing with more variation
            const mixedColor = new THREE.Color();
            const innerColor = new THREE.Color(colors[0]);
            const outerColor = new THREE.Color(colors[1]);
            const colorMix = r / radius[1] + (Math.random() - 0.5) * 0.2; // Add some randomness
            mixedColor.lerpColors(innerColor, outerColor, Math.max(0, Math.min(1, colorMix)));

            particleColors[i3] = mixedColor.r;
            particleColors[i3 + 1] = mixedColor.g;
            particleColors[i3 + 2] = mixedColor.b;

            // Variable particle sizes for more realistic look
            sizes[i] = Math.random() * 1.2 + 0.2;
        }

        return { positions, colors: particleColors, sizes };
    }, [particleCount, radius, colors, spiralArms]);

    useFrame((state) => {
        if (galaxyRef.current) {
            galaxyRef.current.rotation.z = state.clock.getElapsedTime() * rotation;
        }
    });

    return (
        <points ref={galaxyRef} position={position}>
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
                    array={particleColors}
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
                size={0.08}
                transparent
                opacity={opacity}
                vertexColors
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
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

// Floating Code Symbol Component
function FloatingSymbol({ position, shape, speed, scale, offset, duration, color, health, theme }) {
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
        } else {
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
function FloatingSymbols({ theme }) {
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
                <FloatingSymbol key={i} {...props} theme={theme} />
            ))}
        </>
    );
}

// Main Scene Component
function Scene({ theme }) {
    return (
        <>
            {/* Lighting - adjusted based on theme */}
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

            {/* MILKY WAY GALAXY (far, far away in the background) */}
            <MilkyWayGalaxy />

            {/* DISTANT GALAXIES (multiple smaller galaxies even farther away) */}
            <DistantGalaxies />

            {/* Starfield Background (hidden in light mode) */}
            <Starfield theme={theme} />

            {/* Sky Clouds (only in light mode) */}
            {theme === 'light' && <SkyClouds />}

            {/* Space Dust Particles */}
            <SpaceDust theme={theme} />

            {/* Floating Code Symbols */}
            <FloatingSymbols theme={theme} />

            {/* Realistic Floating Laptop */}
            <RealisticLaptop theme={theme} />
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
