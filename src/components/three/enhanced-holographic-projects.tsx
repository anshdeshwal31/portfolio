"use client"

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, Html, OrbitControls, Text, Sphere, Box, Plane, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Star field background for consistent cosmos theme
function StarFieldBackground() {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const [positions, colors] = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create star field distribution like hero section
      const radius = Math.random() * 60 + 20
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
      particlesRef.current.rotation.x = time * 0.008
      particlesRef.current.rotation.y = time * 0.015
      particlesRef.current.rotation.z = time * 0.003
    }
  })

  return (
    <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

interface ProjectCardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  project: {
    title: string
    description: string
    image: string
    tech: string[]
    link: string
  }
  index: number
}

function ProjectCard({ position, rotation, project, index }: ProjectCardProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Enhanced floating with more pronounced movement
      const floatY = Math.sin(time * 0.8 + index * 1.2) * 0.8 + Math.cos(time * 0.5 + index) * 0.4
      const floatX = Math.cos(time * 0.6 + index * 0.8) * 0.5
      const floatZ = Math.sin(time * 0.4 + index * 1.5) * 0.3
      
      groupRef.current.position.x = position[0] + floatX
      groupRef.current.position.y = position[1] + floatY
      groupRef.current.position.z = position[2] + floatZ
      
      // More dramatic rotation and scaling
      if (hovered) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y, 
          rotation[1] + Math.PI * 0.25, 
          0.15
        )
        groupRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.15)
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y, 
          rotation[1] + Math.sin(time * 0.3 + index) * 0.1, 
          0.1
        )
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
      
      // Enhanced auto-rotation
      groupRef.current.rotation.x = Math.sin(time * 0.3 + index) * 0.08
      groupRef.current.rotation.z = Math.cos(time * 0.25 + index) * 0.06
    }
    
    // Pulsing glow effect
    if (glowRef.current) {
      const time = state.clock.getElapsedTime()
      const glowIntensity = hovered ? 0.8 : 0.3
      const pulse = Math.sin(time * 3 + index) * 0.2 + 0.8
      glowRef.current.scale.setScalar(pulse * (hovered ? 1.2 : 1.0))
      
      const material = glowRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = glowIntensity * pulse
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Background glow sphere */}
      <mesh ref={glowRef} position={[0, 0, -0.5]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshStandardMaterial
          color="#4f46e5"
          transparent
          opacity={hovered ? 0.15 : 0.08}
          emissive="#4f46e5"
          emissiveIntensity={hovered ? 0.8 : 0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
        {/* Enhanced main card surface */}
        <mesh>
          <boxGeometry args={[5, 7, 0.3]} />
          <meshStandardMaterial
            color={hovered ? "#1e1b4b" : "#0f172a"}
            transparent
            opacity={0.95}
            metalness={0.9}
            roughness={0.1}
            emissive={hovered ? "#4f46e5" : "#1e1b4b"}
            emissiveIntensity={hovered ? 0.4 : 0.15}
          />
        </mesh>
        
        {/* Multi-layered holographic borders */}
        <mesh position={[0, 0, 0.16]}>
          <boxGeometry args={[5.2, 7.2, 0.02]} />
          <meshStandardMaterial
            color="#4f46e5"
            transparent
            opacity={hovered ? 0.8 : 0.4}
            emissive="#4f46e5"
            emissiveIntensity={hovered ? 0.6 : 0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        <mesh position={[0, 0, 0.18]}>
          <boxGeometry args={[5.4, 7.4, 0.01]} />
          <meshStandardMaterial
            color="#8b5cf6"
            transparent
            opacity={hovered ? 0.6 : 0.2}
            emissive="#8b5cf6"
            emissiveIntensity={hovered ? 0.5 : 0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Tech stack indicators as floating orbs */}
        {project.tech.slice(0, 4).map((tech, i) => {
          const angle = (i / 4) * Math.PI * 2
          const radius = 3.5
          return (
            <Float key={tech} speed={3 + i * 0.5} rotationIntensity={0.3} floatIntensity={0.2}>
              <Sphere 
                args={[0.15, 8, 8]}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius * 0.5,
                  0.5
                ]}
              >
                <meshStandardMaterial
                  color="#06b6d4"
                  emissive="#06b6d4"
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.8}
                />
              </Sphere>
            </Float>
          )
        })}
        
        {/* Enhanced HTML content overlay */}
        <Html
          position={[0, 0, 0.2]}
          transform
          occlude
          style={{
            width: '350px',
            height: '450px',
            pointerEvents: hovered ? 'auto' : 'none',
            userSelect: 'none'
          }}
        >
          <div className={`w-full h-full bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-md border border-blue-500/40 rounded-xl p-6 text-white transition-all duration-500 ${
            hovered ? 'shadow-2xl shadow-blue-500/30' : ''
          }`}>
            {/* Project preview image area */}
            <div className="h-40 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 animate-pulse" />
              <span className="text-3xl font-bold z-10">{project.title.charAt(0)}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-blue-300">{project.title}</h3>
            <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
            
            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-blue-600/30 border border-blue-500/40 rounded-full text-xs text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                View Live
              </button>
              <button className="px-4 bg-gray-700/50 border border-gray-600 text-gray-300 py-2 rounded-lg text-sm hover:bg-gray-600/50 transition-all duration-300">
                Code
              </button>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  )
}

function ProjectsScene() {
  const projects = [
    {
      title: "Neural Vision AI",
      description: "Advanced computer vision platform with real-time neural network training and interactive 3D model visualization for cutting-edge AI applications.",
      image: "/projects/ai-dashboard.jpg",
      tech: ["Next.js", "TensorFlow.js", "Three.js", "WebGL", "Python"],
      link: "#"
    },
    {
      title: "Ethereal Commerce",
      description: "Next-generation shopping experience featuring AR product visualization, voice AI assistance, and immersive 3D product galleries.",
      image: "/projects/3d-ecommerce.jpg", 
      tech: ["React", "WebXR", "Three.js", "Stripe", "Node.js"],
      link: "#"
    },
    {
      title: "Quantum Analytics",
      description: "Real-time quantum computing simulation dashboard with interactive particle physics visualization and advanced analytics.",
      image: "/projects/quantum-viz.jpg",
      tech: ["Vue.js", "D3.js", "WebGL", "Python", "Quantum SDK"],
      link: "#"
    },
    {
      title: "Blockchain Nexus",
      description: "Immersive blockchain explorer with 3D network visualization, smart contract interaction, and DeFi protocol integration.",
      image: "/projects/blockchain-viz.jpg",
      tech: ["React", "Three.js", "Web3.js", "Solidity", "IPFS"],
      link: "#"
    }
  ]

  // Enhanced circular arrangement with better spacing
  const projectPositions = useMemo(() => {
    return projects.map((_, index) => {
      const angle = (index / projects.length) * Math.PI * 2
      const radius = 10
      return [
        Math.cos(angle) * radius,
        Math.sin(index * 0.8) * 3, // More vertical variation
        Math.sin(angle) * radius
      ] as [number, number, number]
    })
  }, [projects.length])

  const projectRotations = useMemo(() => {
    return projects.map((_, index) => {
      const angle = (index / projects.length) * Math.PI * 2
      return [
        Math.sin(index * 0.5) * 0.2, // Slight tilt variation
        -angle + Math.PI / 2, 
        Math.cos(index * 0.3) * 0.1
      ] as [number, number, number]
    })
  }, [projects.length])

  return (
    <>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.title}
          position={projectPositions[index]}
          rotation={projectRotations[index]}
          project={project}
          index={index}
        />
      ))}
    </>
  )
}

function EnhancedEnvironment() {
  const lightRigRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (lightRigRef.current) {
      const time = state.clock.getElapsedTime()
      lightRigRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group ref={lightRigRef}>
      {/* Multiple colored point lights for dynamic lighting */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#4f46e5" />
      <pointLight position={[-10, 5, -10]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[5, -8, 15]} intensity={1.2} color="#06b6d4" />
      <pointLight position={[-8, 12, -5]} intensity={1} color="#a855f7" />
      
      {/* Dynamic spot lights */}
      <spotLight
        position={[0, 25, 0]}
        angle={0.6}
        penumbra={1}
        intensity={1.5}
        color="#4f46e5"
        castShadow
      />
      
      <spotLight
        position={[20, 10, 20]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        color="#8b5cf6"
        target-position={[0, 0, 0]}
      />
    </group>
  )
}

function CameraController() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Enhanced camera movement
    const radius = 18
    const height = 3 + Math.sin(time * 0.2) * 2
    
    camera.position.x = Math.cos(time * 0.08) * radius
    camera.position.z = Math.sin(time * 0.08) * radius
    camera.position.y = height
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Consistent starfield background like hero section
function ProjectsStarField() {
  const starsRef = useRef<THREE.Points>(null!)
  
  const [positions, colors] = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create star field distribution
      const radius = Math.random() * 60 + 20
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
    if (starsRef.current) {
      const time = state.clock.getElapsedTime()
      starsRef.current.rotation.x = time * 0.01
      starsRef.current.rotation.y = time * 0.02
      starsRef.current.rotation.z = time * 0.005
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

interface EnhancedHolographicProjectsProps {
  className?: string
}

export function EnhancedHolographicProjects({ className = "" }: EnhancedHolographicProjectsProps) {
  return (
    <motion.div 
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ 
          position: [18, 3, 18], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        shadows
      >
        {/* Enhanced lighting and environment */}
        <EnhancedEnvironment />
        <Environment preset="night" />
        
        {/* Consistent starfield background */}
        <ProjectsStarField />
        
        {/* Enhanced fog for atmosphere */}
        <fog attach="fog" args={['#000000', 25, 60]} />
        
        {/* Project cards with enhanced visibility */}
        <ProjectsScene />
        
        {/* Enhanced camera animation */}
        <CameraController />
        
        {/* Enhanced manual controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          maxDistance={25}
          minDistance={12}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 8}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
      
      {/* Enhanced atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-purple-900/5 to-transparent pointer-events-none" />
    </motion.div>
  )
}
