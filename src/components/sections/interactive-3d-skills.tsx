"use client"

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, OrbitControls } from '@react-three/drei'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import * as THREE from 'three'

const skills = [
  { name: "React", level: 95, color: "#61DAFB", position: [4, 0, 0] },
  { name: "Next.js", level: 90, color: "#000000", position: [-4, 2, 1] },
  { name: "TypeScript", level: 88, color: "#3178C6", position: [2, -3, -2] },
  { name: "Three.js", level: 85, color: "#000000", position: [-3, -1, 3] },
  { name: "Node.js", level: 87, color: "#339933", position: [1, 3, -1] },
  { name: "MongoDB", level: 82, color: "#47A248", position: [-2, 0, -3] },
  { name: "Python", level: 80, color: "#3776AB", position: [3, 1, 2] },
  { name: "TailwindCSS", level: 92, color: "#06B6D4", position: [-1, -2, 0] }
]

interface SkillOrbProps {
  skill: typeof skills[0]
  index: number
  isHovered: boolean
  onHover: (index: number | null) => void
}

function SkillOrb({ skill, index, isHovered, onHover }: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()
  
  const baseRadius = 0.3 + (skill.level / 100) * 0.4
  const targetScale = isHovered ? 1.5 : 1
  
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const time = state.clock.elapsedTime
      
      // Orbital rotation
      const radius = 5 + Math.sin(time * 0.3 + index) * 1
      const angle = time * 0.2 + index * (Math.PI * 2 / skills.length)
      
      meshRef.current.position.x = Math.cos(angle) * radius + skill.position[0] * 0.5
      meshRef.current.position.y = Math.sin(angle) * radius * 0.7 + skill.position[1] * 0.3
      meshRef.current.position.z = Math.sin(time * 0.1 + index) * 2 + skill.position[2] * 0.5
      
      // Copy position to glow
      glowRef.current.position.copy(meshRef.current.position)
      
      // Rotation
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.015
      
      // Scale animation
      const currentScale = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      meshRef.current.scale.setScalar(currentScale)
      glowRef.current.scale.setScalar(currentScale * 1.2)
      
      // Mouse interaction
      if (isHovered) {
        meshRef.current.position.x += mouse.x * 0.5
        meshRef.current.position.y += mouse.y * 0.5
        glowRef.current.position.copy(meshRef.current.position)
      }
    }
  })

  return (
    <group>
      {/* Glow effect */}
      <mesh
        ref={glowRef}
        onPointerOver={() => onHover(index)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[baseRadius * 1.5, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={isHovered ? 0.3 : 0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Main orb */}
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(index)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[baseRadius, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Skill label */}
      {isHovered && (
        <Text
          position={[0, baseRadius + 0.8, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {skill.name}
        </Text>
      )}
    </group>
  )
}

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.rotation.x = time * 0.1
      meshRef.current.rotation.y = time * 0.15
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#4f46e5"
        emissive="#4f46e5"
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function SkillsLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#1a1a2e" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, 0, 15]} intensity={0.6} color="#06b6d4" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        color="#ffffff"
        castShadow
      />
    </>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 100
  
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    
    colors[i * 3] = Math.random()
    colors[i * 3 + 1] = 0.5 + Math.random() * 0.5
    colors[i * 3 + 2] = 1
  }
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function Interactive3DSkills() {
  const containerRef = useRef(null)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden min-h-screen"
    >
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white/90">Interactive Skills Universe</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Technical
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
            Explore my technical skills in an immersive 3D environment. Each orb represents a technology, 
            scaled by proficiency and animated with interactive physics.
          </p>
        </motion.div>

        {/* 3D Skills Visualization */}
        <motion.div
          className="relative h-[600px] lg:h-[800px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Canvas
            camera={{ position: [0, 0, 15], fov: 75 }}
            style={{ background: 'transparent' }}
            dpr={[1, 2]}
          >
            <SkillsLighting />
            <ParticleField />
            <CentralCore />
            
            {skills.map((skill, index) => (
              <SkillOrb
                key={skill.name}
                skill={skill}
                index={index}
                isHovered={hoveredSkill === index}
                onHover={setHoveredSkill}
              />
            ))}
            
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={true}
              autoRotate={hoveredSkill === null}
              autoRotateSpeed={0.5}
              minDistance={10}
              maxDistance={25}
            />
          </Canvas>
          
          {/* Skill info panel */}
          {hoveredSkill !== null && (
            <motion.div
              className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {skills[hoveredSkill].name}
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skills[hoveredSkill].level}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                <span className="text-white/80 font-medium">
                  {skills[hoveredSkill].level}%
                </span>
              </div>
              <p className="text-white/60 text-sm">
                Proficiency level in {skills[hoveredSkill].name} development and implementation.
              </p>
            </motion.div>
          )}
          
          {/* Instructions */}
          <div className="absolute bottom-8 right-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <p className="text-white/80 text-sm">
              🖱️ Drag to rotate • 🔍 Scroll to zoom • ✨ Hover to explore
            </p>
          </div>
        </motion.div>

        {/* Skills grid for mobile */}
        <motion.div
          className="lg:hidden mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div
                className="w-4 h-4 rounded-full mx-auto mb-3"
                style={{ backgroundColor: skill.color }}
              />
              <h3 className="text-white font-medium mb-2">{skill.name}</h3>
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                />
              </div>
              <span className="text-white/60 text-sm mt-2 block">{skill.level}%</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
