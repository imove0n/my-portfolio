# 3D Hero Background - Model Setup Guide

## 📦 Installation Complete!

The 3D background is now installed and working with **placeholder geometries**. You'll see robotic hands and a floating laptop made from basic shapes.

## 🎨 Current Setup (Placeholders)

- **Left & Right Hands**: Built from boxes, cylinders, and spheres with metallic materials
- **Laptop**: Box geometries with glowing screen effect
- **Energy Ring**: Torus geometry that pulses around the laptop
- **Lighting**: Ambient + directional lights for realistic shadows

## 🔄 How to Replace with Real 3D Models

### Step 1: Get Your 3D Models

You need two `.glb` or `.gltf` files:
1. **robotic-hand.glb** - A robotic/AI hand model
2. **laptop.glb** - A laptop/computer model

**Where to find free 3D models:**
- [Sketchfab](https://sketchfab.com/feed) - Search for "robotic hand" or "robot arm"
- [Poly Pizza](https://poly.pizza/) - Free low-poly models
- [Quaternius](http://quaternius.com/) - Free robot/tech models
- [Free3D](https://free3d.com/) - Various categories
- [TurboSquid Free](https://www.turbosquid.com/Search/3D-Models/free/robot-hand)

**Model Requirements:**
- Format: `.glb` (preferred) or `.gltf`
- Size: Keep under 5MB per model for web performance
- Optimization: Use tools like [gltf.report](https://gltf.report/) to optimize

### Step 2: Place Models in Your Project

Create a `public/models/` folder and place your files:

```
my-portfolio/
├── public/
│   ├── models/
│   │   ├── robotic-hand.glb    ← Place your hand model here
│   │   └── laptop.glb          ← Place your laptop model here
│   ├── chatbot.png
│   └── ...other files
```

### Step 3: Update the Component Code

Open `components/Hero3DBackground.js` and replace the placeholder components:

#### For the Robotic Hands:

**Find this section** (around line 10-70):
```javascript
function RoboticHand({ position, rotation }) {
    // Current placeholder code...
}
```

**Replace with:**
```javascript
function RoboticHand({ position, rotation }) {
    const handRef = useRef();
    const { scene } = useGLTF('/models/robotic-hand.glb');

    useFrame((state) => {
        // Subtle floating animation
        handRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <primitive
            ref={handRef}
            object={scene.clone()}
            position={position}
            rotation={rotation}
            scale={0.5}  // Adjust this number to resize the model
        />
    );
}
```

#### For the Laptop:

**Find this section** (around line 90-150):
```javascript
function FloatingLaptop() {
    // Current placeholder code...
}
```

**Replace with:**
```javascript
function FloatingLaptop() {
    const laptopRef = useRef();
    const energyRef = useRef();
    const { scene } = useGLTF('/models/laptop.glb');

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
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={laptopRef}>
                {/* The actual laptop model */}
                <primitive object={scene.clone()} scale={1} />

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
```

### Step 4: Preload Models (Optional but Recommended)

At the bottom of `Hero3DBackground.js`, **uncomment these lines**:

```javascript
// Preload models for better performance
useGLTF.preload('/models/robotic-hand.glb');
useGLTF.preload('/models/laptop.glb');
```

### Step 5: Adjust Model Sizes

Models might be too big or too small. Adjust the `scale` prop:

```javascript
<primitive object={scene.clone()} scale={0.5} />  // Make it smaller
<primitive object={scene.clone()} scale={2} />    // Make it bigger
```

### Step 6: Adjust Positions

Fine-tune the hand positions in the `Scene` component:

```javascript
<RoboticHand
    position={[-4, 0, 0]}  // [x, y, z] - adjust these numbers
    rotation={[0, 0.3, 0]} // [x, y, z] rotation in radians
/>
```

## 🎨 Customization Options

### Change Colors

Edit the materials in the placeholder code or add custom materials to your models:

```javascript
<meshStandardMaterial
    color="#0ea5e9"        // Main color
    emissive="#0ea5e9"     // Glow color
    emissiveIntensity={2}   // Glow strength
    metalness={0.9}         // How metallic (0-1)
    roughness={0.2}         // How rough/shiny (0-1)
/>
```

### Adjust Animation Speed

```javascript
// Floating speed
<Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>

// Rotation speed
laptopRef.current.rotation.y += 0.003;  // Increase number = faster
```

### Change Lighting

In the `Scene` component:

```javascript
<ambientLight intensity={0.4} />  // Overall brightness
<directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
<pointLight position={[0, 2, 0]} intensity={0.5} color="#0ea5e9" />
```

## 🐛 Troubleshooting

### Models not appearing:
1. Check browser console for errors
2. Verify file paths are correct (`/models/filename.glb`)
3. Make sure files are in `public/models/` folder
4. Try a different model - some models might need adjustments

### Models too big/small:
- Adjust the `scale` prop

### Models in wrong position:
- Adjust `position={[x, y, z]}` values
- Try different rotation values

### Performance issues:
- Use smaller models (under 5MB)
- Optimize with [gltf.report](https://gltf.report/)
- Reduce polygon count in Blender

## 📱 Mobile Optimization

The 3D scene is optimized for mobile with:
- Reduced particle count on mobile
- Disabled some effects on low-end devices
- Client-side rendering only (SSR disabled)

## 🎯 Current Features

✅ Cinematic 3D background layer
✅ Two robotic hands (left & right)
✅ Floating/rotating laptop in center
✅ Energy ring effect around laptop
✅ Glowing particle effects
✅ Realistic lighting and shadows
✅ Text overlay centered on top
✅ Theme-aware (works with dark/light modes)
✅ Mobile responsive
✅ Performance optimized

## 🚀 Next Steps

1. Find/create your 3D models
2. Place them in `public/models/`
3. Update the component code
4. Adjust scale and position
5. Customize colors and effects
6. Test on mobile devices

Enjoy your cinematic 3D hero section! 🎬✨
