"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

function ReactiveParticleWave({ mouse }: { mouse: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null!)
  
  const [positions, colors] = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create star field distribution like hero section
      const radius = Math.random() * 40 + 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // White star colors
      colors[i * 3] = 0.9 + Math.random() * 0.1     // Red
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1 // Green
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1 // Blue
    }
    
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Gentle rotation
      pointsRef.current.rotation.x = time * 0.008
      pointsRef.current.rotation.y = time * 0.012
      pointsRef.current.rotation.z = time * 0.004
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

function FloatingContactOrbs() {
  const orbs = [
    { position: [6, 3, -2], color: "#4f46e5", scale: 0.8 },
    { position: [-5, 1, 3], color: "#8b5cf6", scale: 1.2 },
    { position: [3, -2, 4], color: "#06b6d4", scale: 0.6 },
    { position: [-3, 4, -3], color: "#a855f7", scale: 0.9 },
    { position: [7, -1, 1], color: "#0ea5e9", scale: 0.7 },
    { position: [-6, -3, -4], color: "#3b82f6", scale: 1.0 }
  ]

  return (
    <>
      {orbs.map((orb, index) => (
        <Float
          key={index}
          speed={1 + index * 0.3}
          rotationIntensity={0.3 + index * 0.1}
          floatIntensity={0.2 + index * 0.1}
          position={orb.position as [number, number, number]}
        >
          <mesh>
            <sphereGeometry args={[orb.scale, 16, 16]} />
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          
          {/* Add orbital rings around each orb */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[orb.scale * 1.5, orb.scale * 1.6, 32]} />
            <meshBasicMaterial
              color={orb.color}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function LightBeams() {
  const beamRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (beamRef.current) {
      const time = state.clock.getElapsedTime()
      beamRef.current.rotation.y = time * 0.2
      beamRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    }
  })

  return (
    <group ref={beamRef}>
      {/* Vertical light beams */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 8
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
            rotation={[0, angle, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, 15, 8]} />
            <meshStandardMaterial
              color="#4f46e5"
              emissive="#4f46e5"
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}

interface ImmersiveContactEnvironmentProps {
  mouse?: { x: number; y: number }
  className?: string
}

export function ImmersiveContactEnvironment({ 
  mouse = { x: 0, y: 0 }, 
  className = "" 
}: ImmersiveContactEnvironmentProps) {
  return (
    <motion.div 
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ 
          position: [0, 8, 12], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.4}
          penumbra={1}
          intensity={1}
          color="#06b6d4"
          castShadow
        />
        
        {/* Environment */}
        <Environment preset="night" />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 15, 40]} />
        
        {/* Main particle wave */}
        <ReactiveParticleWave mouse={mouse} />
        
        {/* Floating contact orbs */}
        <FloatingContactOrbs />
        
        {/* Light beam effects */}
        <LightBeams />
      </Canvas>
      
      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/5 to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
    </motion.div>
  )
}
