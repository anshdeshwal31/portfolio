"use client"

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Float, Trail, OrbitControls, Text3D, Environment, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface SkillOrbProps {
  position: [number, number, number]
  skill: string
  color: string
  delay: number
}

function SkillOrb({ position, skill, color, delay }: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Enhanced orbital motion with multiple layers
      const primaryRadius = 12
      const secondaryRadius = 3
      const speed = 0.15 + delay * 0.08
      
      // Primary orbital motion
      const primaryAngle = time * speed + delay
      const primaryX = Math.cos(primaryAngle) * primaryRadius
      const primaryZ = Math.sin(primaryAngle) * primaryRadius
      
      // Secondary motion for organic feel
      const secondaryAngle = time * speed * 2.5 + delay
      const secondaryX = Math.cos(secondaryAngle) * secondaryRadius
      const secondaryY = Math.sin(secondaryAngle * 1.3) * 4
      const secondaryZ = Math.sin(secondaryAngle) * secondaryRadius
      
      meshRef.current.position.x = primaryX + secondaryX
      meshRef.current.position.y = secondaryY
      meshRef.current.position.z = primaryZ + secondaryZ
      
      // Enhanced self rotation
      meshRef.current.rotation.x = time * 0.8 + delay
      meshRef.current.rotation.y = time * 0.5 + delay
      meshRef.current.rotation.z = time * 0.3 + delay
      
      // Enhanced scale based on hover with pulsing
      const basePulse = 1 + Math.sin(time * 2 + delay) * 0.1
      const targetScale = hovered ? 1.8 : 1.2
      const currentScale = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale * basePulse, 0.1)
      meshRef.current.scale.setScalar(currentScale)
    }
  })

  return (
    <group>
      <Float speed={3} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh
          ref={meshRef}
          position={position}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <sphereGeometry args={[0.8, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            transparent
            opacity={0.9}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Outer glow ring */}
        <mesh ref={meshRef} position={position}>
          <ringGeometry args={[1.2, 1.6, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.6 : 0.2}
            transparent
            opacity={hovered ? 0.4 : 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Skill label with enhanced visibility */}
        {hovered && (
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
            <mesh position={[0, 3, 0]}>
              <planeGeometry args={[4, 1]} />
              <meshStandardMaterial
                color="#000000"
                transparent
                opacity={0.8}
              />
            </mesh>
            <meshStandardMaterial
              attach="material"
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
            <text
              position={[0, 3.1, 0.01]}
              fontSize={0.4}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/inter-bold.woff"
            >
              {skill}
            </text>
          </Float>
        )}
      </Float>
      
      {/* Enhanced trail effect */}
      <Trail
        width={0.2}
        length={30}
        color={color}
        attenuation={(t) => t * t}
        opacity={0.6}
      >
        <mesh ref={meshRef} />
      </Trail>
    </group>
  )
}

function EnhancedSkillsVisualization() {
  const skills = [
    { name: "React", color: "#61dafb", delay: 0 },
    { name: "Three.js", color: "#ffffff", delay: 1 },
    { name: "TypeScript", color: "#3178c6", delay: 2 },
    { name: "Next.js", color: "#000000", delay: 3 },
    { name: "Node.js", color: "#339933", delay: 4 },
    { name: "Python", color: "#3776ab", delay: 5 },
    { name: "AWS", color: "#ff9900", delay: 6 },
    { name: "Docker", color: "#2496ed", delay: 7 },
    { name: "GraphQL", color: "#e10098", delay: 8 },
    { name: "PostgreSQL", color: "#336791", delay: 9 },
    { name: "WebGL", color: "#990000", delay: 10 },
    { name: "AI/ML", color: "#ff6b6b", delay: 11 }
  ]

  return (
    <>
      {/* Skill orbs */}
      {skills.map((skill, index) => (
        <SkillOrb
          key={skill.name}
          position={[0, 0, 0]}
          skill={skill.name}
          color={skill.color}
          delay={skill.delay}
        />
      ))}
      
      {/* Background particles */}
      <RichBackgroundParticles />
    </>
  )
}

function RichBackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const [positions, colors] = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create star field distribution like hero section
      const radius = Math.random() * 80 + 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // White star-like colors
      colors[i * 3] = 0.9 + Math.random() * 0.1     // Red
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1 // Green
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1 // Blue
    }
    
    return [positions, colors]
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
    <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const shapes = useMemo(() => [
    { type: 'box', position: [20, 15, -18], color: "#8b5cf6", size: [1, 4, 1], speed: 0.8 },
    { type: 'sphere', position: [-25, -8, 22], color: "#06b6d4", size: 1.5, speed: 1.2 },
    { type: 'box', position: [18, -20, 25], color: "#a855f7", size: [2, 0.5, 2], speed: 0.6 },
    { type: 'sphere', position: [-22, 25, -15], color: "#4f46e5", size: 1.2, speed: 1.0 },
    { type: 'box', position: [30, 5, 20], color: "#0ea5e9", size: [0.5, 3, 0.5], speed: 1.5 },
    { type: 'sphere', position: [-15, -25, 30], color: "#7c3aed", size: 1.8, speed: 0.9 }
  ], [])

  return (
    <>
      {shapes.map((shape, index) => (
        <Float
          key={index}
          speed={shape.speed}
          rotationIntensity={0.4 + index * 0.1}
          floatIntensity={0.6 + index * 0.1}
          position={shape.position as [number, number, number]}
        >
          {shape.type === 'box' ? (
            <mesh>
              <boxGeometry args={shape.size as [number, number, number]} />
              <meshStandardMaterial
                color={shape.color}
                emissive={shape.color}
                emissiveIntensity={0.4}
                transparent
                opacity={0.7}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ) : (
            <mesh>
              <sphereGeometry args={[shape.size as number, 20, 20]} />
              <meshStandardMaterial
                color={shape.color}
                emissive={shape.color}
                emissiveIntensity={0.4}
                transparent
                opacity={0.8}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          )}
        </Float>
      ))}
    </>
  )
}

function EnergyRings() {
  const ringsRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (ringsRef.current) {
      const time = state.clock.getElapsedTime()
      ringsRef.current.rotation.x = time * 0.1
      ringsRef.current.rotation.y = time * 0.15
      ringsRef.current.rotation.z = time * 0.05
    }
  })

  return (
    <group ref={ringsRef}>
      {/* Multiple energy rings at different scales */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <ringGeometry args={[18, 18.5, 64]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#4f46e5"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 6, Math.PI / 3, -Math.PI / 6]}>
        <ringGeometry args={[22, 22.5, 64]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, Math.PI / 3]}>
        <ringGeometry args={[26, 26.5, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.25}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function EnhancedCameraRig() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Enhanced camera movement with more dynamic motion
    const radius = 25
    const height = 8 + Math.sin(time * 0.3) * 4
    
    camera.position.x = Math.cos(time * 0.08) * radius
    camera.position.z = Math.sin(time * 0.08) * radius
    camera.position.y = height
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

interface EnhancedOrbitalSkillsVisualizerProps {
  className?: string
}

export function EnhancedOrbitalSkillsVisualizer({ className = "" }: EnhancedOrbitalSkillsVisualizerProps) {
  return (
    <motion.div 
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        camera={{ 
          position: [25, 8, 25], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        {/* Enhanced dramatic lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#4f46e5" />
        <pointLight position={[-15, -15, -15]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[0, 30, 0]} intensity={1} color="#06b6d4" />
        <spotLight
          position={[0, 40, 0]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#4f46e5"
          castShadow
        />
        
        <Environment preset="night" />
        
        {/* Enhanced orbital skills visualization */}
        <EnhancedSkillsVisualization />
        
        {/* Enhanced camera animation */}
        <EnhancedCameraRig />
        
        {/* Enhanced orbit controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.2}
          maxDistance={40}
          minDistance={15}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </motion.div>
  )
}
