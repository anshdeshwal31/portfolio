"use client"

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Float, Trail, OrbitControls, Text3D, Environment } from '@react-three/drei'
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
      
      // Orbital motion around center
      const radius = 8
      const speed = 0.2 + delay * 0.1
      meshRef.current.position.x = Math.cos(time * speed + delay) * radius
      meshRef.current.position.z = Math.sin(time * speed + delay) * radius
      meshRef.current.position.y = Math.sin(time * speed * 2 + delay) * 2
      
      // Self rotation
      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.3
      
      // Scale based on hover
      const targetScale = hovered ? 1.5 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          position={position}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            transparent
            opacity={0.8}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        
        {/* Skill label that appears on hover */}
        {hovered && (
          <Text3D
            ref={textRef}
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.3}
            height={0.02}
            curveSegments={12}
            position={[0, 2, 0]}
          >
            {skill}
            <meshStandardMaterial color="#ffffff" />
          </Text3D>
        )}
      </Float>
      
      {/* Trail effect */}
      <Trail
        width={0.1}
        length={20}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh ref={meshRef} />
      </Trail>
    </group>
  )
}

function SkillsVisualization() {
  const skills = [
    { name: "React", color: "#61dafb", delay: 0 },
    { name: "Three.js", color: "#ffffff", delay: 1 },
    { name: "TypeScript", color: "#3178c6", delay: 2 },
    { name: "Next.js", color: "#000000", delay: 3 },
    { name: "Node.js", color: "#339933", delay: 4 },
    { name: "Python", color: "#3776ab", delay: 5 },
    { name: "AWS", color: "#ff9900", delay: 6 },
    { name: "Docker", color: "#2496ed", delay: 7 },
    { name: "WebGL", color: "#990000", delay: 8 },
    { name: "AI/ML", color: "#ff6b6b", delay: 9 }
  ]

  return (
    <>
      {skills.map((skill, index) => (
        <SkillOrb
          key={skill.name}
          position={[0, 0, 0]}
          skill={skill.name}
          color={skill.color}
          delay={skill.delay}
        />
      ))}
      
      {/* Add central energy core */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#4f46e5"
            emissive="#4f46e5"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
      </Float>
      
      {/* Add orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6, 6.2, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <ringGeometry args={[9, 9.3, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

function CameraRig() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Slow camera orbit
    camera.position.x = Math.cos(time * 0.1) * 15
    camera.position.z = Math.sin(time * 0.1) * 15
    camera.position.y = 5 + Math.sin(time * 0.2) * 2
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

interface OrbitalSkillsVisualizerProps {
  className?: string
}

export function OrbitalSkillsVisualizer({ className = "" }: OrbitalSkillsVisualizerProps) {
  return (
    <motion.div 
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        camera={{ 
          position: [15, 5, 15], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        {/* Lighting setup for dramatic effect */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#06b6d4"
          castShadow
        />
        
        <Environment preset="night" />
        
        {/* Orbital skills visualization */}
        <SkillsVisualization />
        
        {/* Camera animation */}
        <CameraRig />
        
        {/* Optional orbit controls for manual interaction */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </motion.div>
  )
}
