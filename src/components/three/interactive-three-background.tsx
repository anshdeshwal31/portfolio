"use client"

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere, Box, Torus } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Interactive particle field that responds to cursor
function InteractiveParticleField() {
  const ref = useRef<THREE.Points>(null)
  const { mouse, size, viewport } = useThree()
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Generate particle positions and colors
  const [positions, colors, sizes] = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    // Color palette inspired by modern dark themes
    const colorPalette = [
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5cf6), // Purple  
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xf59e0b), // Amber
      new THREE.Color(0xef4444), // Red
    ]
    
    for (let i = 0; i < count; i++) {
      // Create layered depth for parallax effect
      const layer = Math.floor(i / (count / 5))
      const z = -20 - (layer * 10)
      
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = z
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    return [positions, colors, sizes]
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      const { geometry } = ref.current
      const positions = geometry.attributes.position.array as Float32Array
      
      // Parallax scrolling effect
      const scrollSpeed = scrollY * 0.001
      
      for (let i = 0; i < positions.length; i += 3) {
        // Apply parallax based on Z depth
        const z = positions[i + 2]
        const layer = Math.abs(z + 20) / 10
        const parallaxFactor = 0.1 + (layer * 0.05)
        
        // Mouse interaction - particles move away from cursor
        const distance = Math.sqrt(
          Math.pow(positions[i] - mousePos.x * 50, 2) + 
          Math.pow(positions[i + 1] - mousePos.y * 50, 2)
        )
        
        const repelForce = Math.max(0, 10 - distance) * 0.02
        const angle = Math.atan2(
          positions[i + 1] - mousePos.y * 50,
          positions[i] - mousePos.x * 50
        )
        
        positions[i] += Math.cos(angle) * repelForce
        positions[i + 1] += Math.sin(angle) * repelForce
        
        // Floating animation
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i] * 0.01) * 0.01
        
        // Parallax scroll
        positions[i + 1] -= scrollSpeed * parallaxFactor
        
        // Reset particles that go too far
        if (positions[i + 1] < -50) {
          positions[i + 1] = 50
        }
        if (Math.abs(positions[i]) > 60) {
          positions[i] = (Math.random() - 0.5) * 100
        }
      }
      
      geometry.attributes.position.needsUpdate = true
      
      // Rotate entire particle field slightly
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Floating geometric shapes with interactive behavior
function FloatingGeometry() {
  const group = useRef<THREE.Group>(null)
  const { mouse } = useThree()
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create multiple geometric shapes
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 10
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      type: ['box', 'sphere', 'torus'][Math.floor(Math.random() * 3)],
      scale: 0.5 + Math.random() * 1.5,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]
    }))
  }, [])

  useFrame((state, delta) => {
    if (group.current) {
      // Parallax effect for the entire group
      group.current.position.y = scrollY * 0.002
      
      // Individual shape animations
      group.current.children.forEach((child, index) => {
        const shape = shapes[index]
        
        // Floating animation
        child.position.y = shape.position[1] + Math.sin(state.clock.elapsedTime + index) * 2
        
        // Mouse interaction - shapes tilt towards cursor
        const mouseInfluence = 0.1
        child.rotation.x = shape.rotation[0] + mouse.y * mouseInfluence
        child.rotation.y = shape.rotation[1] + mouse.x * mouseInfluence
        
        // Slow rotation
        child.rotation.z += delta * 0.2
        
        // Scale pulsing
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
        child.scale.setScalar(shape.scale * pulse)
      })
    }
  })

  return (
    <group ref={group}>
      {shapes.map((shape, index) => {
        const ShapeComponent = shape.type === 'box' ? Box : shape.type === 'sphere' ? Sphere : Torus
        
        return (
          <ShapeComponent
            key={index}
            position={shape.position as [number, number, number]}
            args={shape.type === 'torus' ? [1, 0.3, 8, 16] : [1]}
          >
            <meshStandardMaterial
              color={shape.color}
              transparent
              opacity={0.3}
              wireframe
              emissive={shape.color}
              emissiveIntensity={0.1}
            />
          </ShapeComponent>
        )
      })}
    </group>
  )
}

// Dynamic lighting that follows cursor
function InteractiveLighting() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { mouse } = useThree()
  
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 20
      lightRef.current.position.y = mouse.y * 20
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight
        ref={lightRef}
        position={[0, 0, 10]}
        intensity={1.5}
        color="#3b82f6"
        distance={50}
        decay={2}
      />
      <spotLight
        position={[-20, 20, 20]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#8b5cf6"
        castShadow
      />
      <directionalLight
        position={[20, -20, -20]}
        intensity={0.5}
        color="#06b6d4"
      />
    </>
  )
}

// Animated grid background
function AnimatedGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useFrame((state) => {
    if (gridRef.current) {
      // Parallax movement
      gridRef.current.position.z = scrollY * 0.01
      
      // Subtle rotation
      gridRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
      
      // Opacity fade based on scroll
      const material = gridRef.current.material
      if (Array.isArray(material)) {
        material.forEach(mat => {
          if (mat instanceof THREE.LineBasicMaterial) {
            mat.opacity = Math.max(0.1, 0.3 - scrollY * 0.0005)
          }
        })
      } else if (material instanceof THREE.LineBasicMaterial) {
        material.opacity = Math.max(0.1, 0.3 - scrollY * 0.0005)
      }
    }
  })
  
  return (
    <gridHelper 
      ref={gridRef}
      args={[100, 50, '#3b82f6', '#1e40af']} 
      position={[0, -15, 0]}
    />
  )
}

// Particle trails that follow cursor
function CursorTrails() {
  const trailRef = useRef<THREE.Points>(null)
  const [mouseHistory, setMouseHistory] = useState<Array<{x: number, y: number, z: number, time: number}>>([])
  const { mouse, viewport } = useThree()
  
  useFrame((state) => {
    const currentTime = state.clock.elapsedTime
    
    // Add current mouse position to history
    setMouseHistory(prev => {
      const newHistory = [...prev, {
        x: mouse.x * viewport.width / 2,
        y: mouse.y * viewport.height / 2,
        z: 0,
        time: currentTime
      }]
      
      // Remove old positions
      return newHistory.filter(pos => currentTime - pos.time < 2)
    })
    
    if (trailRef.current && mouseHistory.length > 0) {
      const positions = new Float32Array(mouseHistory.length * 3)
      const colors = new Float32Array(mouseHistory.length * 3)
      
      mouseHistory.forEach((pos, i) => {
        positions[i * 3] = pos.x
        positions[i * 3 + 1] = pos.y
        positions[i * 3 + 2] = pos.z
        
        const age = (currentTime - pos.time) / 2
        const alpha = 1 - age
        
        colors[i * 3] = 0.23 * alpha     // Blue
        colors[i * 3 + 1] = 0.51 * alpha // 
        colors[i * 3 + 2] = 0.96 * alpha // 
      })
      
      trailRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      trailRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }
  })

  return (
    <Points ref={trailRef} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={2}
        sizeAttenuation={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export function InteractiveThreeBackground({ section = "hero" }: { section?: string }) {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 30], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
      >
        <InteractiveLighting />
        <InteractiveParticleField />
        <FloatingGeometry />
        <AnimatedGrid />
        <CursorTrails />
      </Canvas>
    </motion.div>
  )
}
