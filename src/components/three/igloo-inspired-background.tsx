"use client"

import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Points, PointMaterial, Sphere, Box, Torus, Icosahedron, Octahedron, Text3D, Float, Trail } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Enhanced particle system with multiple layers and complex behaviors
function AdvancedParticleSystem() {
  const primaryRef = useRef<THREE.Points>(null)
  const secondaryRef = useRef<THREE.Points>(null)
  const tertiaryRef = useRef<THREE.Points>(null)
  const { mouse, size, viewport, camera } = useThree()
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      const newX = (e.clientX / window.innerWidth) * 2 - 1
      const newY = -(e.clientY / window.innerHeight) * 2 + 1
      
      setMouseVelocity({
        x: newX - lastMousePos.current.x,
        y: newY - lastMousePos.current.y
      })
      
      setMousePos({ x: newX, y: newY })
      lastMousePos.current = { x: newX, y: newY }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Generate three layers of particles with different behaviors
  const [primaryData, secondaryData, tertiaryData] = useMemo(() => {
    // Primary layer - Main interactive particles
    const primaryCount = 1500
    const primaryPositions = new Float32Array(primaryCount * 3)
    const primaryColors = new Float32Array(primaryCount * 3)
    const primarySizes = new Float32Array(primaryCount)
    const primaryVelocities = new Float32Array(primaryCount * 3)
    
    // Secondary layer - Ambient floating particles
    const secondaryCount = 800
    const secondaryPositions = new Float32Array(secondaryCount * 3)
    const secondaryColors = new Float32Array(secondaryCount * 3)
    const secondarySizes = new Float32Array(secondaryCount)
    
    // Tertiary layer - Deep background particles
    const tertiaryCount = 400
    const tertiaryPositions = new Float32Array(tertiaryCount * 3)
    const tertiaryColors = new Float32Array(tertiaryCount * 3)
    const tertiarySizes = new Float32Array(tertiaryCount)
    
    // Enhanced color palette with more sophisticated gradients
    const primaryColors_ = [
      new THREE.Color(0x4f46e5), // Indigo
      new THREE.Color(0x7c3aed), // Violet
      new THREE.Color(0x0ea5e9), // Sky
      new THREE.Color(0x059669), // Emerald
      new THREE.Color(0xd97706), // Amber
      new THREE.Color(0xdc2626), // Red
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x8b5cf6), // Purple
    ]
    
    const secondaryColors_ = [
      new THREE.Color(0x1e40af), // Blue-800
      new THREE.Color(0x5b21b6), // Violet-800
      new THREE.Color(0x0c4a6e), // Sky-900
      new THREE.Color(0x065f46), // Emerald-800
    ]
    
    const tertiaryColors_ = [
      new THREE.Color(0x1e1b4b), // Indigo-900
      new THREE.Color(0x312e81), // Indigo-800
      new THREE.Color(0x1e3a8a), // Blue-800
      new THREE.Color(0x164e63), // Cyan-800
    ]
    
    // Initialize primary particles
    for (let i = 0; i < primaryCount; i++) {
      primaryPositions[i * 3] = (Math.random() - 0.5) * 120
      primaryPositions[i * 3 + 1] = (Math.random() - 0.5) * 80
      primaryPositions[i * 3 + 2] = (Math.random() - 0.5) * 60
      
      // Initial velocities
      primaryVelocities[i * 3] = (Math.random() - 0.5) * 0.02
      primaryVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      primaryVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
      
      const color = primaryColors_[Math.floor(Math.random() * primaryColors_.length)]
      primaryColors[i * 3] = color.r
      primaryColors[i * 3 + 1] = color.g
      primaryColors[i * 3 + 2] = color.b
      
      primarySizes[i] = Math.random() * 3 + 1
    }
    
    // Initialize secondary particles
    for (let i = 0; i < secondaryCount; i++) {
      secondaryPositions[i * 3] = (Math.random() - 0.5) * 150
      secondaryPositions[i * 3 + 1] = (Math.random() - 0.5) * 100
      secondaryPositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20
      
      const color = secondaryColors_[Math.floor(Math.random() * secondaryColors_.length)]
      secondaryColors[i * 3] = color.r
      secondaryColors[i * 3 + 1] = color.g
      secondaryColors[i * 3 + 2] = color.b
      
      secondarySizes[i] = Math.random() * 2 + 0.5
    }
    
    // Initialize tertiary particles
    for (let i = 0; i < tertiaryCount; i++) {
      tertiaryPositions[i * 3] = (Math.random() - 0.5) * 200
      tertiaryPositions[i * 3 + 1] = (Math.random() - 0.5) * 120
      tertiaryPositions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50
      
      const color = tertiaryColors_[Math.floor(Math.random() * tertiaryColors_.length)]
      tertiaryColors[i * 3] = color.r
      tertiaryColors[i * 3 + 1] = color.g
      tertiaryColors[i * 3 + 2] = color.b
      
      tertiarySizes[i] = Math.random() * 1.5 + 0.3
    }
    
    return [
      { positions: primaryPositions, colors: primaryColors, sizes: primarySizes, velocities: primaryVelocities },
      { positions: secondaryPositions, colors: secondaryColors, sizes: secondarySizes },
      { positions: tertiaryPositions, colors: tertiaryColors, sizes: tertiarySizes }
    ]
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    const scrollSpeed = scrollY * 0.001
    
    // Enhanced primary particle animations
    if (primaryRef.current) {
      const { geometry } = primaryRef.current
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const idx = i / 3
        
        // Complex mouse interaction with magnetic and repelling forces
        const distance = Math.sqrt(
          Math.pow(positions[i] - mousePos.x * 60, 2) + 
          Math.pow(positions[i + 1] - mousePos.y * 40, 2)
        )
        
        // Dynamic force based on distance and mouse velocity
        const velocityMagnitude = Math.sqrt(mouseVelocity.x ** 2 + mouseVelocity.y ** 2)
        const dynamicForce = Math.max(0, 15 - distance) * (0.03 + velocityMagnitude * 2)
        
        if (distance < 25) {
          const angle = Math.atan2(
            positions[i + 1] - mousePos.y * 40,
            positions[i] - mousePos.x * 60
          )
          
          // Repelling force with swirl effect
          const repelX = Math.cos(angle) * dynamicForce
          const repelY = Math.sin(angle) * dynamicForce
          const swirlX = Math.cos(angle + Math.PI / 2) * velocityMagnitude * 5
          const swirlY = Math.sin(angle + Math.PI / 2) * velocityMagnitude * 5
          
          positions[i] += repelX + swirlX
          positions[i + 1] += repelY + swirlY
        }
        
        // Organic floating motion with varying frequencies
        const frequency = 0.5 + (idx % 100) / 200
        positions[i] += Math.sin(time * frequency + idx * 0.01) * 0.02
        positions[i + 1] += Math.cos(time * frequency * 1.2 + idx * 0.015) * 0.015
        positions[i + 2] += Math.sin(time * frequency * 0.8 + idx * 0.008) * 0.01
        
        // Multi-layer parallax with depth-based speed variation
        const depth = (positions[i + 2] + 30) / 60
        const parallaxSpeed = scrollSpeed * (1 + depth * 2)
        positions[i + 1] -= parallaxSpeed
        
        // Boundary wrapping with smooth transitions
        if (positions[i + 1] < -60) positions[i + 1] = 60
        if (positions[i + 1] > 60) positions[i + 1] = -60
        if (Math.abs(positions[i]) > 80) {
          positions[i] = (Math.random() - 0.5) * 120
        }
      }
      
      geometry.attributes.position.needsUpdate = true
      
      // Dynamic rotation based on mouse movement and scroll
      primaryRef.current.rotation.y = Math.sin(time * 0.1) * 0.05 + mousePos.x * 0.02
      primaryRef.current.rotation.x = Math.cos(time * 0.15) * 0.03 + mousePos.y * 0.01
    }
    
    // Secondary particle layer with smoother, ambient movement
    if (secondaryRef.current) {
      const { geometry } = secondaryRef.current
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const idx = i / 3
        
        // Gentle floating with phase-shifted sine waves
        positions[i] += Math.sin(time * 0.3 + idx * 0.02) * 0.01
        positions[i + 1] += Math.cos(time * 0.25 + idx * 0.018) * 0.008
        positions[i + 2] += Math.sin(time * 0.2 + idx * 0.012) * 0.005
        
        // Subtle parallax
        positions[i + 1] -= scrollSpeed * 0.5
        
        // Boundary reset
        if (positions[i + 1] < -80) positions[i + 1] = 80
      }
      
      geometry.attributes.position.needsUpdate = true
      secondaryRef.current.rotation.y = time * 0.02
    }
    
    // Tertiary layer - Deep background movement
    if (tertiaryRef.current) {
      const { geometry } = tertiaryRef.current
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const idx = i / 3
        
        // Very slow, deep movement
        positions[i] += Math.sin(time * 0.1 + idx * 0.005) * 0.005
        positions[i + 1] += Math.cos(time * 0.08 + idx * 0.004) * 0.003
        
        // Minimal parallax for depth
        positions[i + 1] -= scrollSpeed * 0.2
        
        if (positions[i + 1] < -100) positions[i + 1] = 100
      }
      
      geometry.attributes.position.needsUpdate = true
      tertiaryRef.current.rotation.y = time * 0.005
    }
  })

  return (
    <>
      {/* Tertiary layer - Deep background */}
      <Points ref={tertiaryRef} positions={tertiaryData.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.4}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Secondary layer - Ambient */}
      <Points ref={secondaryRef} positions={secondaryData.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.6}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Primary layer - Interactive */}
      <Points ref={primaryRef} positions={primaryData.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={1.2}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  )
}

// Complex geometric shapes with advanced interactions
function AdvancedGeometricShapes() {
  const group = useRef<THREE.Group>(null)
  const { mouse, viewport } = useThree()
  const [scrollY, setScrollY] = useState(0)
  const [mouseHistory, setMouseHistory] = useState<Array<{x: number, y: number, time: number}>>([])
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      
      setMouseHistory(prev => {
        const newHistory = [...prev, { x, y, time: Date.now() }]
        return newHistory.slice(-20) // Keep last 20 positions
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Advanced shape configurations
  const shapes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30 - 15
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      type: ['icosahedron', 'octahedron', 'box', 'sphere', 'torus'][Math.floor(Math.random() * 5)],
      scale: 0.3 + Math.random() * 2,
      color: [
        '#4f46e5', '#7c3aed', '#0ea5e9', '#059669', 
        '#d97706', '#dc2626', '#06b6d4', '#8b5cf6'
      ][Math.floor(Math.random() * 8)],
      speed: 0.1 + Math.random() * 0.3,
      amplitude: 1 + Math.random() * 3
    }))
  }, [])

  useFrame((state, delta) => {
    if (group.current) {
      const time = state.clock.elapsedTime
      
      // Calculate average mouse velocity from history
      const velocitySum = mouseHistory.reduce((acc, curr, index) => {
        if (index === 0) return acc
        const prev = mouseHistory[index - 1]
        const timeDiff = (curr.time - prev.time) / 1000
        return acc + Math.sqrt((curr.x - prev.x) ** 2 + (curr.y - prev.y) ** 2) / timeDiff
      }, 0)
      const avgVelocity = velocitySum / Math.max(1, mouseHistory.length - 1)
      
      // Enhanced parallax with multi-layer depth
      group.current.position.y = scrollY * 0.003
      group.current.position.x = scrollY * 0.001 * Math.sin(time * 0.1)
      
      // Individual shape animations with advanced behaviors
      group.current.children.forEach((child, index) => {
        const shape = shapes[index]
        const phaseOffset = index * 0.5
        
        // Complex floating motion with multiple harmonics
        const baseFloat = Math.sin(time * shape.speed + phaseOffset) * shape.amplitude
        const harmonicFloat = Math.sin(time * shape.speed * 2.3 + phaseOffset) * (shape.amplitude * 0.3)
        const microFloat = Math.sin(time * shape.speed * 4.7 + phaseOffset) * (shape.amplitude * 0.1)
        
        child.position.y = shape.position[1] + baseFloat + harmonicFloat + microFloat
        child.position.x = shape.position[0] + Math.cos(time * shape.speed * 0.7 + phaseOffset) * 0.5
        
        // Advanced mouse interaction with elastic response
        const distance = Math.sqrt(
          (child.position.x - mouse.x * 30) ** 2 + 
          (child.position.y - mouse.y * 20) ** 2
        )
        
        if (distance < 15) {
          const force = (15 - distance) / 15
          const angle = Math.atan2(
            child.position.y - mouse.y * 20,
            child.position.x - mouse.x * 30
          )
          
          // Elastic displacement with velocity influence
          const displacement = force * (2 + avgVelocity * 10)
          child.position.x += Math.cos(angle) * displacement * delta * 2
          child.position.y += Math.sin(angle) * displacement * delta * 2
        }
        
        // Dynamic rotation with mouse influence and velocity response
        const mouseInfluence = 0.1 + avgVelocity * 0.5
        child.rotation.x = shape.rotation[0] + mouse.y * mouseInfluence + time * 0.2
        child.rotation.y = shape.rotation[1] + mouse.x * mouseInfluence + time * 0.15
        child.rotation.z += delta * (0.1 + avgVelocity)
        
        // Dynamic scaling with breathing effect
        const breathe = 1 + Math.sin(time * 2 + index) * 0.1
        const velocityScale = 1 + avgVelocity * 0.5
        child.scale.setScalar(shape.scale * breathe * velocityScale)
        
        // Color intensity based on interaction
        if ('material' in child && child.material) {
          const material = child.material as THREE.MeshStandardMaterial
          const interactionForce = distance < 15 ? (15 - distance) / 15 : 0
          material.emissiveIntensity = 0.1 + interactionForce * 0.3 + avgVelocity * 0.2
        }
      })
    }
  })

  return (
    <group ref={group}>
      {shapes.map((shape, index) => {
        let ShapeComponent: any
        let args: any = [1]
        
        switch (shape.type) {
          case 'icosahedron':
            ShapeComponent = Icosahedron
            args = [1, 0]
            break
          case 'octahedron':
            ShapeComponent = Octahedron
            break
          case 'box':
            ShapeComponent = Box
            break
          case 'sphere':
            ShapeComponent = Sphere
            args = [1, 16, 16]
            break
          case 'torus':
            ShapeComponent = Torus
            args = [1, 0.3, 8, 16]
            break
          default:
            ShapeComponent = Sphere
        }
        
        return (
          <Float
            key={index}
            speed={1 + Math.random()}
            rotationIntensity={0.5}
            floatIntensity={0.3}
          >
            <ShapeComponent
              position={shape.position as [number, number, number]}
              args={args}
            >
              <meshStandardMaterial
                color={shape.color}
                transparent
                opacity={0.6}
                wireframe={Math.random() > 0.5}
                emissive={shape.color}
                emissiveIntensity={0.1}
                roughness={0.4}
                metalness={0.6}
              />
            </ShapeComponent>
          </Float>
        )
      })}
    </group>
  )
}

// Advanced lighting system with dynamic responses
function AdvancedLightingSystem() {
  const pointLightRef = useRef<THREE.PointLight>(null)
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)
  const { mouse } = useThree()
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Main point light follows cursor with smooth interpolation
    if (pointLightRef.current) {
      pointLightRef.current.position.x = THREE.MathUtils.lerp(
        pointLightRef.current.position.x, 
        mouse.x * 25, 
        0.1
      )
      pointLightRef.current.position.y = THREE.MathUtils.lerp(
        pointLightRef.current.position.y, 
        mouse.y * 15, 
        0.1
      )
      
      // Dynamic intensity based on scroll and time
      pointLightRef.current.intensity = 1.5 + Math.sin(time * 0.5) * 0.3 + (scrollY * 0.001)
    }
    
    // Spot light with orbital movement
    if (spotLightRef.current) {
      const radius = 30
      spotLightRef.current.position.x = Math.cos(time * 0.3) * radius
      spotLightRef.current.position.z = Math.sin(time * 0.3) * radius
      spotLightRef.current.position.y = 20 + Math.sin(time * 0.2) * 5
      
      // Look at mouse position
      spotLightRef.current.target.position.set(mouse.x * 20, mouse.y * 10, 0)
    }
    
    // Directional light with slow movement
    if (directionalLightRef.current) {
      directionalLightRef.current.position.x = 20 + Math.sin(time * 0.1) * 10
      directionalLightRef.current.position.y = -20 + Math.cos(time * 0.15) * 5
      directionalLightRef.current.intensity = 0.5 + Math.sin(time * 0.2) * 0.2
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} color="#1e1b4b" />
      
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 15]}
        intensity={1.5}
        color="#4f46e5"
        distance={60}
        decay={2}
      />
      
      <spotLight
        ref={spotLightRef}
        position={[-30, 20, 20]}
        angle={0.4}
        penumbra={1}
        intensity={1.2}
        color="#7c3aed"
        castShadow
        distance={80}
        decay={2}
      />
      
      <directionalLight
        ref={directionalLightRef}
        position={[20, -20, -20]}
        intensity={0.5}
        color="#0ea5e9"
      />
      
      {/* Additional accent lights */}
      <pointLight
        position={[-15, -15, 10]}
        intensity={0.8}
        color="#059669"
        distance={40}
        decay={2}
      />
      
      <pointLight
        position={[25, 10, -10]}
        intensity={0.6}
        color="#d97706"
        distance={35}
        decay={2}
      />
    </>
  )
}

// Dynamic cursor trail effect
function AdvancedCursorTrail() {
  const trailRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.Line>(null)
  const [mouseHistory, setMouseHistory] = useState<Array<{x: number, y: number, z: number, time: number}>>([])
  const { mouse, viewport } = useThree()
  
  useFrame((state) => {
    const currentTime = state.clock.elapsedTime
    
    // Add current mouse position to history
    setMouseHistory(prev => {
      const newHistory = [...prev, {
        x: mouse.x * viewport.width / 2,
        y: mouse.y * viewport.height / 2,
        z: Math.sin(currentTime * 2) * 2,
        time: currentTime
      }]
      
      // Keep only recent positions
      return newHistory.filter(pos => currentTime - pos.time < 3)
    })
    
    // Update trail points
    if (trailRef.current && mouseHistory.length > 1) {
      const positions = new Float32Array(mouseHistory.length * 3)
      const colors = new Float32Array(mouseHistory.length * 3)
      const sizes = new Float32Array(mouseHistory.length)
      
      mouseHistory.forEach((pos, i) => {
        positions[i * 3] = pos.x
        positions[i * 3 + 1] = pos.y
        positions[i * 3 + 2] = pos.z
        
        const age = (currentTime - pos.time) / 3
        const alpha = Math.pow(1 - age, 2)
        
        // Color gradient from blue to purple
        const blueIntensity = alpha * (1 - age)
        const purpleIntensity = alpha * age
        
        colors[i * 3] = 0.31 * blueIntensity + 0.49 * purpleIntensity     // R
        colors[i * 3 + 1] = 0.27 * blueIntensity + 0.18 * purpleIntensity // G
        colors[i * 3 + 2] = 0.90 * blueIntensity + 0.93 * purpleIntensity // B
        
        sizes[i] = alpha * 3
      })
      
      trailRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      trailRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      trailRef.current.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    }
    
    // Update connecting lines
    if (lineRef.current && mouseHistory.length > 1) {
      const positions = new Float32Array(mouseHistory.length * 3)
      
      mouseHistory.forEach((pos, i) => {
        positions[i * 3] = pos.x
        positions[i * 3 + 1] = pos.y
        positions[i * 3 + 2] = pos.z
      })
      
      lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
  })

  return (
    <>
      <Points ref={trailRef} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          sizeAttenuation={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      <primitive ref={lineRef} object={new THREE.Line()}>
        <bufferGeometry />
        <lineBasicMaterial
          transparent
          opacity={0.3}
          color="#4f46e5"
          blending={THREE.AdditiveBlending}
        />
      </primitive>
    </>
  )
}

// Main component
export function IglooInspiredBackground({ section = "hero" }: { section?: string }) {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 35], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          precision: "mediump",
          stencil: false,
          depth: true
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2
        }}
      >
        <AdvancedLightingSystem />
        <AdvancedParticleSystem />
        <AdvancedGeometricShapes />
        <AdvancedCursorTrail />
        
        {/* Performance optimizations */}
        <React.Suspense fallback={null}>
          {/* Additional effects can be added here */}
        </React.Suspense>
      </Canvas>
    </motion.div>
  )
}
