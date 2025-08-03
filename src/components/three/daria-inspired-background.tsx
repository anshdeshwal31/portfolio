"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'

function FloatingOrganicShapes() {
  const group = useRef<THREE.Group>(null)
  const { mouse, size } = useThree()
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create organic blob shapes inspired by Daria's style
  const shapes = useMemo(() => {
    const shapeCount = 8
    const shapeData = []
    
    for (let i = 0; i < shapeCount; i++) {
      shapeData.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15
        ],
        scale: 0.5 + Math.random() * 1.5,
        color: [
          '#3b82f6', // Blue
          '#8b5cf6', // Purple  
          '#f59e0b', // Yellow
          '#10b981', // Green
          '#ef4444', // Red
          '#06b6d4', // Cyan
          '#f97316', // Orange
          '#ec4899'  // Pink
        ][i],
        rotationSpeed: 0.5 + Math.random() * 1,
        floatSpeed: 0.3 + Math.random() * 0.7
      })
    }
    
    return shapeData
  }, [])

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1
      
      // Mouse interaction
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouse.y * 0.1,
        0.05
      )
      group.current.rotation.y += mouse.x * 0.001
      
      // Scroll interaction
      group.current.position.y = scrollY * 0.001
      
      // Animate individual shapes
      group.current.children.forEach((child, index) => {
        const shape = shapes[index]
        child.rotation.x += delta * shape.rotationSpeed
        child.rotation.z += delta * shape.rotationSpeed * 0.5
        child.position.y += Math.sin(state.clock.elapsedTime * shape.floatSpeed + index) * 0.01
      })
    }
  })

  return (
    <group ref={group}>
      {shapes.map((shape, index) => (
        <mesh key={index} position={shape.position as [number, number, number]} scale={shape.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial
            color={shape.color}
            transparent
            opacity={0.15}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

function ColorfulParticles() {
  const ref = useRef<THREE.Points>(null)
  const { mouse } = useThree()
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate colorful particles inspired by Daria's design
  const [positions, colors] = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const colorPalette = [
      { r: 0.23, g: 0.51, b: 0.96 }, // Blue
      { r: 0.55, g: 0.36, b: 0.96 }, // Purple
      { r: 0.96, g: 0.62, b: 0.07 }, // Yellow
      { r: 0.06, g: 0.73, b: 0.51 }, // Green
      { r: 0.94, g: 0.27, b: 0.27 }, // Red
      { r: 0.02, g: 0.71, b: 0.83 }, // Cyan
    ]
    
    for (let i = 0; i < count; i++) {
      // Positions
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      
      // Colors
      const colorIndex = Math.floor(Math.random() * colorPalette.length)
      const color = colorPalette[colorIndex]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      
      // Mouse interaction
      ref.current.rotation.y += mouse.x * 0.05
      ref.current.rotation.x += mouse.y * 0.05
      
      // Scroll interaction
      ref.current.position.y = scrollY * 0.0005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function PlayfulGeometry() {
  const meshRef1 = useRef<THREE.Mesh>(null)
  const meshRef2 = useRef<THREE.Mesh>(null)
  const meshRef3 = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()
  
  useFrame((state, delta) => {
    // First shape - star-like
    if (meshRef1.current) {
      meshRef1.current.rotation.x += delta * 0.3
      meshRef1.current.rotation.y += delta * 0.2
      meshRef1.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
    
    // Second shape - organic blob
    if (meshRef2.current) {
      meshRef2.current.rotation.z += delta * 0.4
      meshRef2.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 2
      meshRef2.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 1
    }
    
    // Third shape - playful ring
    if (meshRef3.current) {
      meshRef3.current.rotation.x += delta * 0.2
      meshRef3.current.rotation.y += delta * 0.5
      meshRef3.current.position.z = Math.sin(state.clock.elapsedTime * 0.6) * 2
    }
  })

  return (
    <>
      {/* Star-like shape */}
      <mesh ref={meshRef1} position={[6, 3, -8]}>
        <dodecahedronGeometry args={[1.2]} />
        <meshStandardMaterial
          color="#f59e0b"
          transparent
          opacity={0.3}
          wireframe
          emissive="#f59e0b"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Organic blob */}
      <mesh ref={meshRef2} position={[-5, -2, -6]}>
        <sphereGeometry args={[1.5, 8, 6]} />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.25}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Playful ring */}
      <mesh ref={meshRef3} position={[3, -4, -10]}>
        <torusGeometry args={[2, 0.5, 8, 16]} />
        <meshStandardMaterial
          color="#ec4899"
          transparent
          opacity={0.2}
          wireframe
          emissive="#ec4899"
          emissiveIntensity={0.05}
        />
      </mesh>
    </>
  )
}

function WarmLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#fef3c7" />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[0, 15, 5]} intensity={0.5} color="#f59e0b" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.3}
        color="#10b981"
        castShadow
      />
    </>
  )
}

export function DariaInspiredBackground({ section = "hero" }: { section?: string }) {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <WarmLighting />
        <ColorfulParticles />
        <FloatingOrganicShapes />
        <PlayfulGeometry />
      </Canvas>
      
      {/* SVG Decorative Elements Overlay - Inspired by Daria's style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Stars */}
        <motion.div
          className="absolute top-20 right-20 w-8 h-8 text-yellow-400"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-60">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute top-60 left-16 w-6 h-6 text-green-400"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-50">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </motion.div>

        {/* Floating Circles */}
        <motion.div
          className="absolute bottom-40 right-32 w-12 h-12 border-2 border-blue-400 rounded-full opacity-30"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute top-80 right-60 w-8 h-8 border-2 border-purple-400 rounded-full opacity-40"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Organic Blob Shapes */}
        <motion.div
          className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-sm"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute top-40 left-80 w-10 h-10 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-sm"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Playful Lines */}
        <motion.div
          className="absolute top-32 left-1/3 w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent rounded-full"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>
    </motion.div>
  )
}
