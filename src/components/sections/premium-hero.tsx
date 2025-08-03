"use client"

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles, Code, Palette, Zap } from 'lucide-react'
import * as THREE from 'three'

// Interactive 3D Energy Orb Component
function EnergyOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { mouse, viewport, clock } = useThree()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Custom shader for energy effect
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform float mouseX;
    uniform float mouseY;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float noise = sin(pos.x * 4.0 + time) * cos(pos.y * 4.0 + time) * sin(pos.z * 4.0 + time);
      pos += normal * noise * 0.1;
      
      // Mouse interaction
      pos.x += mouseX * 0.5;
      pos.y += mouseY * 0.5;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform float intensity;
    
    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      
      // Energy core
      float core = 1.0 - smoothstep(0.0, 0.3, dist);
      
      // Pulsing energy waves
      float wave1 = sin(dist * 10.0 - time * 3.0) * 0.5 + 0.5;
      float wave2 = sin(dist * 15.0 - time * 2.0) * 0.3 + 0.7;
      
      // Color mixing
      vec3 color1 = vec3(0.3, 0.6, 1.0); // Blue
      vec3 color2 = vec3(0.8, 0.4, 1.0); // Purple
      vec3 color3 = vec3(0.2, 1.0, 0.8); // Cyan
      
      vec3 finalColor = mix(color1, color2, wave1);
      finalColor = mix(finalColor, color3, wave2 * 0.5);
      
      float alpha = core * intensity * (wave1 * 0.7 + wave2 * 0.3);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime
      
      // Rotation based on mouse and time
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.3 + mouse.y * 0.2
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2 + mouse.x * 0.3
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1
      
      // Scale pulsing
      const scale = 1 + Math.sin(time * 0.8) * 0.1
      meshRef.current.scale.setScalar(scale)
      
      // Update shader uniforms
      materialRef.current.uniforms.time.value = time
      materialRef.current.uniforms.mouseX.value = mouse.x
      materialRef.current.uniforms.mouseY.value = mouse.y
      materialRef.current.uniforms.intensity.value = 0.8 + Math.sin(time * 2) * 0.2
      
      // Scroll interaction
      const scrollFactor = Math.min(scrollY * 0.001, 1)
      meshRef.current.position.y = -scrollFactor * 2
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          mouseX: { value: 0 },
          mouseY: { value: 0 },
          intensity: { value: 1 }
        }}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Floating particles around the orb
function EnergyParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    const radius = 4 + Math.random() * 6
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    // Color variation
    colors[i * 3] = 0.3 + Math.random() * 0.7     // R
    colors[i * 3 + 1] = 0.6 + Math.random() * 0.4 // G
    colors[i * 3 + 2] = 1.0                       // B
  }

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime
      pointsRef.current.rotation.y = time * 0.1 + mouse.x * 0.1
      pointsRef.current.rotation.x = time * 0.05 + mouse.y * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// Premium lighting setup
function PremiumLighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#1a1a2e" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, 0, 15]} intensity={0.6} color="#06b6d4" />
    </>
  )
}

export function PremiumHeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills')
    skillsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    { icon: Code, text: "Full-Stack Architecture" },
    { icon: Palette, text: "3D Visual Design" },
    { icon: Zap, text: "Performance Optimization" }
  ]

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
        >
          <PremiumLighting />
          <EnergyOrb />
          <EnergyParticles />
        </Canvas>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/30 via-purple-900/20 to-transparent" />
      
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-screen py-32">
          {/* Left side - Content */}
          <motion.div
            className="space-y-12 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white/90">Available for Projects</span>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-6">
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Ansh
                <motion.span 
                  className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  Deshwal
                </motion.span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              Digital Experience Architect crafting immersive web experiences with cutting-edge 3D technologies. 
              Transforming ideas into interactive digital art that pushes the boundaries of what's possible.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.0 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white/80">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  View Projects
                  <ArrowDown className="w-4 h-4 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300" />
                </span>
              </motion.button>

              <motion.button
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Visualization space */}
          <motion.div
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
              {/* This space is filled by the Three.js canvas */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl animate-pulse" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors duration-300 group"
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
        whileHover={{ y: -5 }}
        data-cursor="pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Explore Experience</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="group-hover:text-white transition-colors duration-300"
          >
            <ArrowDown size={20} />
          </motion.div>
        </div>
      </motion.button>
    </section>
  )
}
