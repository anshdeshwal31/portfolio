"use client"

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Environment, Float } from '@react-three/drei'
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
      // Create more diverse particle distribution
      const cluster = Math.random()
      let x, y, z
      
      if (cluster < 0.6) {
        // Central sphere distribution
        const radius = Math.random() * 20 + 5
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        
        x = radius * Math.sin(phi) * Math.cos(theta)
        y = radius * Math.sin(phi) * Math.sin(theta)
        z = radius * Math.cos(phi)
      } else {
        // Outer ring particles
        const angle = Math.random() * Math.PI * 2
        const radius = 25 + Math.random() * 15
        x = Math.cos(angle) * radius
        y = (Math.random() - 0.5) * 8
        z = Math.sin(angle) * radius
      }
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      // Enhanced color palette
      const colorChoice = Math.random()
      if (colorChoice < 0.3) {
        colors[i * 3] = 0.2 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.4  
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 0.5 + Math.random() * 0.5
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 2] = 1.0
      } else {
        colors[i * 3] = 0.0 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
      }
    }
    
    return [positions, colors]
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime()
      
      // Enhanced rotation with mouse influence
      const mouseInfluence = mouse ? (mouse.x * 0.15 + mouse.y * 0.15) : 0
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.3 + mouseInfluence * 0.2
      ref.current.rotation.y = Math.cos(time * 0.15) * 0.4 + mouseInfluence * 0.3
      ref.current.rotation.z = Math.sin(time * 0.08) * 0.2
      
      // Enhanced breathing effect
      const scale = 1 + Math.sin(time * 0.5) * 0.15 + Math.cos(time * 0.3) * 0.05
      ref.current.scale.setScalar(scale)
    }
    
    // Enhanced central energy orb animation
    if (sphereRef.current) {
      const time = state.clock.getElapsedTime()
      sphereRef.current.rotation.x = time * 0.4
      sphereRef.current.rotation.y = time * 0.25
      
      // More dynamic pulsing
      const intensity = 1 + Math.sin(time * 3) * 0.4 + Math.cos(time * 1.7) * 0.2
      sphereRef.current.scale.setScalar(intensity)
    }
  })

  return (
    <>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Enhanced central energy orb */}
      <Float speed={3} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshStandardMaterial
            color="#4f46e5"
            emissive="#4f46e5"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
            wireframe
          />
        </mesh>
        
        {/* Inner glow sphere */}
        <mesh scale={0.5}>
          <sphereGeometry args={[0.8, 24, 24]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
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
          rotationIntensity={0.4}
          floatIntensity={0.3}
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
      ringsRef.current.rotation.y = time * 0.05
      ringsRef.current.rotation.z = Math.sin(time * 0.08) * 0.3
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
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Middle ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[8, 8.3, 48]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.2}
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
          position: [0, 0, 12], 
          fov: 75,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Enhanced lighting for richer atmosphere */}
        <ambientLight intensity={0.4} color="#4f46e5" />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, 15, 5]} intensity={0.6} color="#a855f7" />
        <pointLight position={[5, -10, -5]} intensity={0.5} color="#0ea5e9" />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
        
        {/* All 3D elements */}
        <EtherealParticles mouse={mouse} />
        <FloatingOrbs />
        <EnergyRings />
        
        {/* Camera controller for mouse interaction */}
        <CameraController mouse={mouse} />
      </Canvas>
      
      {/* Enhanced overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/15 via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
}
