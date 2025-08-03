"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Box, Sphere, OrbitControls } from '@react-three/drei'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ExternalLink, Github, Eye, Code, Zap, Users } from 'lucide-react'
import * as THREE from 'three'

const projects = [
  {
    id: 1,
    title: "NeuroFlow AI",
    subtitle: "Neural Network Visualizer", 
    description: "An immersive 3D neural network visualization platform that transforms complex machine learning models into interactive, explorable environments. Built with React, Three.js, and TensorFlow.js for real-time model analysis.",
    technologies: ["React", "Three.js", "TensorFlow.js", "WebGL", "Python"],
    color: "#4f46e5",
    position: [0, 0, 0],
    metrics: { users: "10K+", performance: "99.9%", features: "25+" },
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "CryptoSphere",
    subtitle: "DeFi Analytics Dashboard",
    description: "Real-time cryptocurrency and DeFi analytics platform featuring 3D market visualization, portfolio tracking, and predictive modeling. Integrates with major blockchain networks for live data streaming.",
    technologies: ["Next.js", "TypeScript", "Web3", "Chart.js", "Node.js"],
    color: "#059669",
    position: [6, 2, -3],
    metrics: { users: "25K+", performance: "real-time", features: "50+" },
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "MetaSpace",
    subtitle: "Virtual Collaboration Hub",
    description: "A virtual reality meeting platform that creates immersive workspaces for remote teams. Features spatial audio, 3D avatars, and interactive whiteboards for enhanced collaboration.",
    technologies: ["React", "WebRTC", "WebXR", "Socket.io", "MongoDB"],
    color: "#dc2626",
    position: [-6, -1, 2],
    metrics: { users: "5K+", performance: "low-latency", features: "30+" },
    demoUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 4,
    title: "EcoTracker",
    subtitle: "Sustainability Analytics",
    description: "Carbon footprint tracking application with gamification elements, community challenges, and AI-powered sustainability recommendations for individuals and organizations.",
    technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "ML"],
    color: "#7c3aed",
    position: [4, -3, 1],
    metrics: { users: "15K+", performance: "optimized", features: "40+" },
    demoUrl: "#",
    githubUrl: "#",
    featured: false
  }
]

interface HolographicCardProps {
  project: typeof projects[0]
  index: number
  isActive: boolean
  onActivate: (id: number) => void
}

function HolographicCard({ project, index, isActive, onActivate }: HolographicCardProps) {
  const meshRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const { mouse, viewport } = useThree()
  
  useFrame((state) => {
    if (meshRef.current && cardRef.current && glowRef.current) {
      const time = state.clock.elapsedTime
      
      // Floating animation
      const floatY = Math.sin(time * 0.5 + index) * 0.5
      const floatX = Math.cos(time * 0.3 + index) * 0.3
      
      meshRef.current.position.x = project.position[0] + floatX
      meshRef.current.position.y = project.position[1] + floatY
      meshRef.current.position.z = project.position[2] + Math.sin(time * 0.2 + index) * 0.2
      
      // Rotation
      meshRef.current.rotation.y = Math.sin(time * 0.1 + index) * 0.1
      cardRef.current.rotation.x = Math.cos(time * 0.15 + index) * 0.05
      
      // Active state animations
      if (isActive) {
        const targetScale = 1.2
        const currentScale = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
        meshRef.current.scale.setScalar(currentScale)
        
        // Mouse tracking when active
        meshRef.current.lookAt(
          mouse.x * viewport.width * 0.1,
          mouse.y * viewport.height * 0.1,
          5
        )
      } else {
        const targetScale = 1
        const currentScale = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
        meshRef.current.scale.setScalar(currentScale)
      }
      
      // Glow effect
      if (glowRef.current.material && !Array.isArray(glowRef.current.material)) {
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = isActive ? 0.3 : 0.1
      }
    }
  })

  const handleClick = () => {
    onActivate(project.id)
  }

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
      <group ref={meshRef} onClick={handleClick}>
        {/* Glow effect */}
        <mesh ref={glowRef} scale={[2.2, 1.4, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Main card */}
        <mesh ref={cardRef} scale={[2, 1.2, 0.05]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={isActive ? project.color : "#1a1a2e"}
            emissive={project.color}
            emissiveIntensity={isActive ? 0.2 : 0.05}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Project title */}
        <Text
          position={[0, 0.3, 0.1]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {project.title}
        </Text>
        
        {/* Subtitle */}
        <Text
          position={[0, 0.1, 0.1]}
          fontSize={0.08}
          color="#a0a0a0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-regular.woff"
        >
          {project.subtitle}
        </Text>
        
        {/* Tech stack indicators */}
        {project.technologies.slice(0, 3).map((tech, techIndex) => (
          <mesh
            key={tech}
            position={[-0.6 + techIndex * 0.6, -0.4, 0.1]}
            scale={[0.1, 0.05, 0.01]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={project.color} transparent opacity={0.7} />
          </mesh>
        ))}
        
        {/* Holographic scan lines */}
        {isActive && (
          <group>
            {Array.from({ length: 8 }).map((_, i) => (
              <mesh
                key={i}
                position={[0, 0.4 - i * 0.1, 0.11]}
                scale={[1.8, 0.01, 0.01]}
              >
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                  color={project.color}
                  transparent
                  opacity={0.3 + Math.sin(Date.now() * 0.01 + i) * 0.2}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            ))}
          </group>
        )}
      </group>
    </Float>
  )
}

function ProjectsLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1a1a2e" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
      <spotLight
        position={[0, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
    </>
  )
}

function ParticleEnvironment() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 150
  
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    
    colors[i * 3] = 0.3
    colors[i * 3 + 1] = 0.6 + Math.random() * 0.4
    colors[i * 3 + 2] = 1
  }
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function HolographicProjects() {
  const containerRef = useRef(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  
  const activeProjectData = projects.find(p => p.id === activeProject)

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden min-h-screen"
    >
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/90">Holographic Portfolio</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Featured
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
            Explore my projects in an immersive 3D environment. Each holographic card represents 
            a unique solution crafted with cutting-edge technologies.
          </p>
        </motion.div>

        {/* 3D Projects Visualization */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* 3D Canvas */}
          <motion.div
            className="lg:col-span-2 relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Canvas
              camera={{ position: [0, 0, 12], fov: 60 }}
              style={{ background: 'transparent' }}
              dpr={[1, 2]}
            >
              <ProjectsLighting />
              <ParticleEnvironment />
              
              {projects.map((project, index) => (
                <HolographicCard
                  key={project.id}
                  project={project}
                  index={index}
                  isActive={activeProject === project.id}
                  onActivate={setActiveProject}
                />
              ))}
              
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                autoRotate={activeProject === null}
                autoRotateSpeed={0.3}
                minDistance={8}
                maxDistance={20}
              />
            </Canvas>
            
            {/* Instructions */}
            <div className="absolute bottom-6 left-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <p className="text-white/80 text-sm">
                🖱️ Click cards to explore • Drag to rotate • Scroll to zoom
              </p>
            </div>
          </motion.div>
          
          {/* Project Details Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {activeProjectData ? (
              <motion.div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: activeProjectData.color }}
                  />
                  <h3 className="text-2xl font-semibold text-white">
                    {activeProjectData.title}
                  </h3>
                </div>
                
                <p className="text-lg text-blue-400 mb-4 font-medium">
                  {activeProjectData.subtitle}
                </p>
                
                <p className="text-white/70 leading-relaxed mb-6">
                  {activeProjectData.description}
                </p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(activeProjectData.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-xl font-semibold text-white">{value}</div>
                      <div className="text-sm text-white/60 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor="pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor="pointer"
                  >
                    <Github className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
                <Eye className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Explore Projects
                </h3>
                <p className="text-white/60">
                  Click on any holographic card to view detailed information about the project.
                </p>
              </div>
            )}
            
            {/* Project List */}
            <div className="space-y-3">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    activeProject === project.id
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/8'
                  }`}
                  onClick={() => setActiveProject(project.id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <div>
                      <div className="text-white font-medium">{project.title}</div>
                      <div className="text-white/60 text-sm">{project.subtitle}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
