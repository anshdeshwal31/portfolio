"use client"

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere, Environment, Float, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface EtherealParticlesProps {
  count?: number
  mouse?: { x: number; y: number }
}

function EtherealParticles({ count = 4000, mouse }: EtherealParticlesProps) {
  const ref = useRef<THREE.Points>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create layered particle distribution for richer background
      const layer = Math.floor(i / (count / 3))
      let radius, distribution
      
      if (layer === 0) {
        // Dense inner layer
        radius = Math.random() * 8 + 3
        distribution = 1.0
      } else if (layer === 1) {
        // Medium outer layer
        radius = Math.random() * 12 + 8
        distribution = 0.7
      } else {
        // Sparse far layer for depth
        radius = Math.random() * 25 + 15
        distribution = 0.4
      }
      
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * distribution
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * distribution
      positions[i * 3 + 2] = radius * Math.cos(phi) * distribution
      
      // Enhanced ethereal color palette with more variety
      const colorChoice = Math.random()
      const intensity = Math.random() * 0.3 + 0.7
      
      if (colorChoice < 0.3) {
        // Cool blues
        colors[i * 3] = 0.1 + Math.random() * 0.2 // R
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4 // G  
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B
      } else if (colorChoice < 0.6) {
        // Royal purples
        colors[i * 3] = 0.4 + Math.random() * 0.4 // R
        colors[i * 3 + 1] = 0.1 + Math.random() * 0.3 // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B
      } else if (colorChoice < 0.85) {
        // Cyan highlights
        colors[i * 3] = 0.0 + Math.random() * 0.2 // R
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3 // G
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1 // B
      } else {
        // Bright whites for sparkle
        colors[i * 3] = 0.9 + Math.random() * 0.1 // R
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1 // G
        colors[i * 3 + 2] = 1.0 // B
      }
      
      // Apply intensity
      colors[i * 3] *= intensity
      colors[i * 3 + 1] *= intensity
      colors[i * 3 + 2] *= intensity
    }
    
    return [positions, colors]
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime()
      
      // Enhanced rotation with multiple axes and mouse influence
      const mouseInfluence = mouse ? (mouse.x * 0.1 + mouse.y * 0.1) : 0
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.3 + mouseInfluence * 0.15
      ref.current.rotation.y = Math.cos(time * 0.15) * 0.4 + mouseInfluence * 0.25
      ref.current.rotation.z = Math.sin(time * 0.08) * 0.2
      
      // Dynamic breathing effect with varying intensity
      const breathScale = 1 + Math.sin(time * 0.5) * 0.15
      const pulseScale = 1 + Math.sin(time * 2) * 0.05
      ref.current.scale.setScalar(breathScale * pulseScale)
      
      // Animate individual particle positions for organic movement
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const particleIndex = i / 3
        const originalX = positions[i]
        const originalY = positions[i + 1]
        const originalZ = positions[i + 2]
        
        // Add subtle floating animation to each particle
        positions[i] = originalX + Math.sin(time + particleIndex * 0.01) * 0.1
        positions[i + 1] = originalY + Math.cos(time + particleIndex * 0.015) * 0.1
        positions[i + 2] = originalZ + Math.sin(time * 0.8 + particleIndex * 0.008) * 0.1
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
    
    // Enhanced central energy orb animation
    if (sphereRef.current) {
      const time = state.clock.getElapsedTime()
      sphereRef.current.rotation.x = time * 0.4
      sphereRef.current.rotation.y = time * 0.3
      sphereRef.current.rotation.z = time * 0.2
      
      // Complex pulsing glow effect
      const mainPulse = 1 + Math.sin(time * 2) * 0.3
      const secondaryPulse = 1 + Math.sin(time * 3.7) * 0.1
      const microPulse = 1 + Math.sin(time * 8) * 0.05
      sphereRef.current.scale.setScalar(mainPulse * secondaryPulse * microPulse)
    }
  })

  return (
    <>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Central energy orb with enhanced effects */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshStandardMaterial
            color="#4f46e5"
            emissive="#4f46e5"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
      </Float>
      
      {/* Inner core orb */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[0.8, 24, 24]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </>
  )
}

// Add floating secondary orbs for richness
function FloatingOrbs() {
  const orbs = useMemo(() => [
    { position: [8, 3, -5], color: "#06b6d4", size: 0.6, speed: 1.2 },
    { position: [-6, -2, 4], color: "#8b5cf6", size: 0.8, speed: 0.8 },
    { position: [5, -4, 8], color: "#4f46e5", size: 0.4, speed: 1.5 },
    { position: [-8, 5, -3], color: "#06b6d4", size: 0.5, speed: 1.0 },
    { position: [3, 7, -8], color: "#a855f7", size: 0.7, speed: 0.9 },
    { position: [-4, -6, 6], color: "#0ea5e9", size: 0.3, speed: 1.8 }
  ], [])

  return (
    <>
      {orbs.map((orb, index) => (
        <Float
          key={index}
          speed={orb.speed}
          rotationIntensity={0.4 + index * 0.1}
          floatIntensity={0.3 + index * 0.05}
          position={orb.position as [number, number, number]}
        >
          <mesh>
            <sphereGeometry args={[orb.size, 16, 16]} />
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={0.4}
              transparent
              opacity={0.6}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// Add energy rings for depth
function EnergyRings() {
  const ringsRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ringsRef.current) {
      const time = state.clock.getElapsedTime()
      ringsRef.current.rotation.x = time * 0.1
      ringsRef.current.rotation.y = time * 0.15
      ringsRef.current.rotation.z = time * 0.08
    }
  })

  return (
    <group ref={ringsRef}>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[12, 12.5, 64]} />
        <meshBasicMaterial
          color="#4f46e5"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Middle ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[8, 8.3, 48]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner ring */}
      <mesh rotation={[Math.PI / 6, -Math.PI / 3, Math.PI / 4]}>
        <ringGeometry args={[5, 5.2, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function CameraController({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree()
  
  useFrame(() => {
    // Subtle camera movement based on mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.02)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

interface EtherealEnergyBackgroundProps {
  section?: string
  className?: string
}

export function EtherealEnergyBackground({ section, className = "" }: EtherealEnergyBackgroundProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMouse({
      x: (event.clientX - rect.left) / rect.width * 2 - 1,
      y: -(event.clientY - rect.top) / rect.height * 2 + 1
    })
  }

  return (
    <motion.div 
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 10], 
          fov: 75,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Enhanced ambient lighting for ethereal glow */}
        <ambientLight intensity={0.4} color="#4f46e5" />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, 15, 5]} intensity={0.6} color="#a855f7" />
        <pointLight position={[5, -10, -5]} intensity={0.5} color="#0ea5e9" />
        
        {/* Dynamic lighting that follows mouse */}
        <CameraController mouse={mouse} />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
        
        {/* Enhanced particle and energy system */}
        <EtherealParticles mouse={mouse} />
        
        {/* Additional floating orbs for richness */}
        <FloatingOrbs />
        
        {/* Energy rings for depth */}
        <EnergyRings />
        
        {/* Atmospheric fog for depth */}
        <fog attach="fog" args={['#000000', 20, 60]} />
      </Canvas>
      
      {/* Enhanced overlay gradients for depth and atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/15 via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/5 to-transparent pointer-events-none" />
      
      {/* Atmospheric light streaks */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none" />
    </motion.div>
  )
}
