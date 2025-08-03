"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import { Points, PointMaterial } from "@react-three/drei"

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const { mouse } = useThree()
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate random positions for particles
  const particles = new Float32Array(2000 * 3)
  for (let i = 0; i < 2000; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 20
    particles[i * 3 + 1] = (Math.random() - 0.5) * 20
    particles[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      
      // Mouse interaction
      ref.current.rotation.y += mouse.x * 0.1
      ref.current.rotation.x += mouse.y * 0.1
      
      // Scroll interaction
      ref.current.position.y = scrollY * 0.002
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function GeometricShape() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.1
      
      // Mouse interaction
      meshRef.current.rotation.x += mouse.y * 0.05
      meshRef.current.rotation.y += mouse.x * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
    </>
  )
}

export function ThreeBackground({ section = "hero" }: { section?: string }) {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        className="w-full h-full"
        dpr={[1, 2]}
      >
        <Lighting />
        <ParticleField />
        {section === "hero" && <GeometricShape />}
      </Canvas>
    </motion.div>
  )
}
