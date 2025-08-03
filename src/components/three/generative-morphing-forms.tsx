"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Complex morphing animation
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
      meshRef.current.rotation.y = time * 0.1
      meshRef.current.rotation.z = Math.cos(time * 0.2) * 0.1
      
      // Gentle scaling
      const scale = 1 + Math.sin(time * 0.5) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <MeshDistortMaterial
          color="#4f46e5"
          emissive="#1e1b4b"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
          distort={0.5}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      // Create star field distribution like hero section
      const radius = Math.random() * 40 + 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime()
      particlesRef.current.rotation.x = time * 0.01
      particlesRef.current.rotation.y = time * 0.02
      particlesRef.current.rotation.z = time * 0.005
    }
  })

  return (
    <Points ref={particlesRef} positions={particlePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function ResponsiveLights({ mouse }: { mouse: { x: number; y: number } }) {
  const lightRef = useRef<THREE.PointLight>(null!)
  
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 10
      lightRef.current.position.y = mouse.y * 10
      lightRef.current.position.z = 5
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={lightRef} intensity={1} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#06b6d4"
        castShadow
      />
    </>
  )
}

interface GenerativeMorphingFormsProps {
  mouse?: { x: number; y: number }
  className?: string
}

export function GenerativeMorphingForms({ mouse = { x: 0, y: 0 }, className = "" }: GenerativeMorphingFormsProps) {
  return (
    <motion.div 
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        camera={{ 
          position: [8, 4, 8], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        shadows
      >
        {/* Responsive lighting */}
        <ResponsiveLights mouse={mouse} />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
        
        {/* Fog for atmosphere */}
        <fog attach="fog" args={['#000000', 10, 50]} />
        
        {/* Main morphing form */}
        <MorphingBlob />
        
        {/* Enhanced secondary floating elements */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3} position={[5, 2, -3]}>
          <Sphere args={[1, 32, 32]}>
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#4c1d95"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
              metalness={0.7}
              roughness={0.2}
            />
          </Sphere>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2} position={[-4, -1, 2]}>
          <Sphere args={[0.8, 32, 32]}>
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#0e7490"
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
              metalness={0.8}
              roughness={0.1}
            />
          </Sphere>
        </Float>
        
        {/* Additional smaller orbs for richness */}
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4} position={[2, -3, -1]}>
          <Sphere args={[0.5, 24, 24]}>
            <meshStandardMaterial
              color="#a855f7"
              emissive="#7c2d92"
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
              metalness={0.6}
              roughness={0.3}
            />
          </Sphere>
        </Float>
        
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.5} position={[-2, 3, 4]}>
          <Sphere args={[0.6, 28, 28]}>
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0284c7"
              emissiveIntensity={0.2}
              transparent
              opacity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </Sphere>
        </Float>
        
        {/* Floating particles */}
        <FloatingParticles />
      </Canvas>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
}
