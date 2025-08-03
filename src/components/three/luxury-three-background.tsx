"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function LuxuryParticleField() {
  const ref = useRef<THREE.Points>(null)
  const { mouse, size } = useThree()
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate elegant particle positions
  const [positions, colors] = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create more structured, elegant distribution
      const radius = Math.random() * 15 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) 
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Luxury color palette - blues, purples, golds
      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        // Blue tones
        colors[i * 3] = 0.2 + Math.random() * 0.3     // R
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4 // G  
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B
      } else if (colorChoice < 0.7) {
        // Purple tones
        colors[i * 3] = 0.5 + Math.random() * 0.4     // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3 // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B
      } else {
        // Gold/warm tones
        colors[i * 3] = 0.8 + Math.random() * 0.2     // R
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.3 // G
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.2 // B
      }
    }
    
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      
      // Elegant rotation with mouse interaction
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.1 + mouse.y * 0.05
      ref.current.rotation.y = Math.sin(time * 0.05) * 0.2 + mouse.x * 0.1
      
      // Scroll-based movement
      ref.current.position.y = scrollY * 0.0005
      
      // Breathing effect
      const scale = 1 + Math.sin(time * 0.3) * 0.05
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // Elegant floating motion
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.1
      meshRef.current.position.y = Math.sin(time * 0.5) * 2
      meshRef.current.position.x = Math.cos(time * 0.3) * 1 + mouse.x * 2
      
      // Scale pulsing
      const scale = 1 + Math.sin(time * 0.8) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef} position={[4, 0, -5]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color="#4f46e5"
        transparent
        opacity={0.2}
        wireframe
        emissive="#3b82f6"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function PremiumLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#4f46e5" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.7}
        color="#f59e0b"
        castShadow
      />
    </>
  )
}

function GridBackground() {
  const gridRef = useRef<THREE.GridHelper>(null)
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = state.clock.elapsedTime * 0.02
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5 - 10
    }
  })
  
  return (
    <gridHelper 
      ref={gridRef}
      args={[50, 50, '#3b82f6', '#1e40af']} 
      position={[0, -10, 0]}
      material-opacity={0.1}
      material-transparent={true}
    />
  )
}

export function LuxuryThreeBackground({ section = "hero" }: { section?: string }) {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 15], 
          fov: 60,
          near: 0.1,
          far: 1000 
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <PremiumLighting />
        <LuxuryParticleField />
        <FloatingGeometry />
        <GridBackground />
      </Canvas>
    </motion.div>
  )
}
