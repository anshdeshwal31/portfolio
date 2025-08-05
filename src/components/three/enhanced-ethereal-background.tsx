"use client"

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial,  Environment, Float} from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface EtherealParticlesProps {
  count?: number
  mouse: { x: number; y: number }
}

function EtherealParticles({ count = 5000, mouse }: EtherealParticlesProps) {
  const meshRef = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    
    return positions
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Enhanced rotation with mouse influence
      const mouseInfluence = mouse ? (mouse.x * 0.1 + mouse.y * 0.1) : 0
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.3 + mouseInfluence * 0.15
      meshRef.current.rotation.y = Math.cos(time * 0.15) * 0.4 + mouseInfluence * 0.25
      meshRef.current.rotation.z = Math.sin(time * 0.08) * 0.2
      
      // Dynamic breathing effect
      const breathScale = 1 + Math.sin(time * 0.5) * 0.15
      const pulseScale = 1 + Math.sin(time * 2) * 0.05
      meshRef.current.scale.setScalar(breathScale * pulseScale)
    }
  })

  return (
    <Points ref={meshRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// function CentralEnergyOrb() {
//   const meshRef = useRef<THREE.Mesh>(null!)

//   useFrame((state) => {
//     if (meshRef.current) {
//       const time = state.clock.getElapsedTime()
//       // Only Y-axis rotation for asteroid-like movement
//       meshRef.current.rotation.y = time * 0.15
//     }
//   })

//   return (
//     <>
//       {/* Asteroid-like purple sphere with Y-axis rotation only - highly visible */}
//       <mesh ref={meshRef}>
//         <sphereGeometry args={[5.5, 8, 6]} />
//         <meshStandardMaterial
//           color="#8b5cf6"
//           emissive="#7c3aed"
//           emissiveIntensity={0.6}
//           transparent
//           opacity={0.95}
//           roughness={0.9}
//           metalness={0.2}
//         />
//       </mesh>
//     </>
//   )
// }

function BackgroundAsteroid({hasAsteroid}:{hasAsteroid:boolean}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const radiationRef = useRef<THREE.Points>(null!)

  // Create radiation particles
  const radiationParticles = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create radiating pattern from center
      const radius = 5 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      // Rotate asteroid on Y-axis
      meshRef.current.rotation.y = time * 0.12
    }
    
    if (radiationRef.current) {
      const time = state.clock.getElapsedTime()
      // Animate radiation particles
      radiationRef.current.rotation.y = time * 0.05
      radiationRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    }
  })

  return (
    <group position={[0, 0, -5]}>
      {/* Background asteroid - white wireframe outline */}
      {hasAsteroid&&<mesh ref={meshRef}>
        <sphereGeometry args={[6, 8, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>}
      
      {/* White radiation particles */}
      <Points ref={radiationRef} positions={radiationParticles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}

// Asteroid Belt Effects - smaller floating asteroids around the main one
function AsteroidBelt() {
  const asteroids = useMemo(() => {
    const count = 8
    const asteroidData = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 8 + Math.random() * 4
      const size = 0.3 + Math.random() * 0.5
      asteroidData.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 6,
          Math.sin(angle) * radius - 5
        ],
        size,
        rotationSpeed: 0.01 + Math.random() * 0.02,
        orbitSpeed: 0.005 + Math.random() * 0.01
      })
    }
    return asteroidData
  }, [])

  return (
    <group>
      {asteroids.map((asteroid, index) => (
        <Float
          key={index}
          speed={0.5 + index * 0.1}
          rotationIntensity={0.1}
          floatIntensity={0.1}
        >
          <mesh position={asteroid.position as [number, number, number]}>
            <sphereGeometry args={[asteroid.size, 4, 3]} />
            <meshStandardMaterial
              color="#2a2a2a"
              emissive="#1a1a1a"
              emissiveIntensity={0.2}
              transparent
              opacity={0.7}
              roughness={0.95}
              metalness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Constellation Patterns - subtle star patterns
function ConstellationPatterns() {
  const constellations = useMemo(() => {
    const patterns = []
    
    // Create 3 constellation patterns
    for (let c = 0; c < 3; c++) {
      const constellation = []
      const centerX = (Math.random() - 0.5) * 30
      const centerY = (Math.random() - 0.5) * 20
      const centerZ = -15 - Math.random() * 10
      
      // Each constellation has 5-7 stars
      const starCount = 5 + Math.floor(Math.random() * 3)
      for (let s = 0; s < starCount; s++) {
        constellation.push({
          position: [
            centerX + (Math.random() - 0.5) * 8,
            centerY + (Math.random() - 0.5) * 6,
            centerZ + (Math.random() - 0.5) * 4
          ],
          brightness: 0.6 + Math.random() * 0.4
        })
      }
      patterns.push(constellation)
    }
    return patterns
  }, [])

  return (
    <group>
      {constellations.map((constellation, cIndex) =>
        constellation.map((star, sIndex) => (
          <mesh key={`${cIndex}-${sIndex}`} position={star.position as [number, number, number]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={star.brightness}
            />
          </mesh>
        ))
      )}
    </group>
  )
}

// Cosmic Particle Trails - shooting star effects
function CosmicParticleTrails() {
  const trailsRef = useRef<THREE.Group>(null!)
  const [trails, setTrails] = useState<Array<{
    start: [number, number, number]
    end: [number, number, number]
    progress: number
    life: number
  }>>([])

  useFrame((state, delta) => {
    // Randomly spawn new shooting stars
    if (Math.random() < 0.02) {
      const newTrail = {
        start: [
          (Math.random() - 0.5) * 40,
          Math.random() * 20 + 10,
          Math.random() * 10 - 20
        ] as [number, number, number],
        end: [
          (Math.random() - 0.5) * 40,
          Math.random() * 20 - 30,
          Math.random() * 10 + 5
        ] as [number, number, number],
        progress: 0,
        life: 1
      }
      setTrails(prev => [...prev.slice(-4), newTrail]) // Keep only 5 trails max
    }

    // Update existing trails
    setTrails(prev =>
      prev
        .map(trail => ({
          ...trail,
          progress: trail.progress + delta * 2,
          life: trail.life - delta * 0.5
        }))
        .filter(trail => trail.life > 0 && trail.progress < 1)
    )
  })

  return (
    <group ref={trailsRef}>
      {trails.map((trail, index) => {
        const currentPos = [
          trail.start[0] + (trail.end[0] - trail.start[0]) * trail.progress,
          trail.start[1] + (trail.end[1] - trail.start[1]) * trail.progress,
          trail.start[2] + (trail.end[2] - trail.start[2]) * trail.progress
        ] as [number, number, number]

        return (
          <mesh key={index} position={currentPos}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={trail.life * 0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Solar Wind Effects - particle streams from asteroid
function SolarWindEffects() {
  const windRef = useRef<THREE.Points>(null!)
  
  const windParticles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Start near the asteroid and flow outward
      const angle = (i / count) * Math.PI * 2
      const radius = 5 + Math.random() * 3
      
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = Math.sin(angle) * radius - 5
    }
    return positions
  }, [])

  useFrame((state) => {
    if (windRef.current) {
      const time = state.clock.getElapsedTime()
      const positions = windRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < windParticles.length; i += 3) {
        // Flow particles outward from asteroid
        const distance = Math.sqrt(
          positions[i] * positions[i] + 
          positions[i + 2] * positions[i + 2]
        )
        
        positions[i] *= 1.02
        positions[i + 2] *= 1.02
        
        // Reset particles that flow too far
        if (distance > 25) {
          const angle = Math.random() * Math.PI * 2
          const radius = 5 + Math.random() * 3
          positions[i] = Math.cos(angle) * radius
          positions[i + 1] = (Math.random() - 0.5) * 2
          positions[i + 2] = Math.sin(angle) * radius - 5
        }
      }
      
      windRef.current.geometry.attributes.position.needsUpdate = true
      windRef.current.rotation.y = time * 0.02
    }
  })

  return (
    <Points ref={windRef} positions={windParticles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  )
}

// Deep Space Parallax - multiple star layers
function DeepSpaceParallax() {
  const layers = useMemo(() => {
    const layerData = []
    
    // Create 3 layers at different depths
    for (let layer = 0; layer < 3; layer++) {
      const count = 300 - layer * 50
      const positions = new Float32Array(count * 3)
      const depth = -30 - layer * 20
      
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60
        positions[i * 3 + 2] = depth + (Math.random() - 0.5) * 10
      }
      
      layerData.push({
        positions,
        size: 0.02 + layer * 0.01,
        opacity: 0.8 - layer * 0.2,
        speed: 0.01 + layer * 0.005
      })
    }
    
    return layerData
  }, [])

  return (
    <group>
      {layers.map((layer, index) => (
        <Points
          key={index}
          positions={layer.positions}
          stride={3}
          frustumCulled={false}
        >
          <PointMaterial
            transparent
            color="#ffffff"
            size={layer.size}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={layer.opacity}
          />
        </Points>
      ))}
    </group>
  )
}

// function FloatingOrbs() {
//   const orbs = useMemo(() => [
//     { position: [8, 3, -5], color: "#06b6d4", size: 0.6, speed: 1.2 },
//     { position: [-6, -2, 4], color: "#8b5cf6", size: 0.8, speed: 0.8 },
//     { position: [5, -4, 8], color: "#4f46e5", size: 0.4, speed: 1.5 },
//     { position: [-8, 5, -3], color: "#06b6d4", size: 0.5, speed: 1.0 },
//     { position: [3, 7, -8], color: "#a855f7", size: 0.7, speed: 0.9 },
//     { position: [-4, -6, 6], color: "#0ea5e9", size: 0.3, speed: 1.8 },
//     { position: [10, -1, 2], color: "#7c3aed", size: 0.9, speed: 0.7 },
//     { position: [-3, 8, -6], color: "#0891b2", size: 0.4, speed: 1.3 }
//   ], [])

//   return (
//     <>
//       {orbs.map((orb, index) => (
//         <Float
//           key={index}
//           speed={orb.speed}
//           rotationIntensity={0.4 + index * 0.1}
//           floatIntensity={0.3 + index * 0.05}
//           position={orb.position as [number, number, number]}
//         >
//           <mesh>
//             <sphereGeometry args={[orb.size, 16, 16]} />
//             <meshStandardMaterial
//               color={orb.color}
//               emissive={orb.color}
//               emissiveIntensity={0.4}
//               transparent
//               opacity={0.7}
//               metalness={0.3}
//               roughness={0.4}
//             />
//           </mesh>
//         </Float>
//       ))}
//     </>
//   )
// }

// function GeometricRings() {
//   const ringGroupRef = useRef<THREE.Group>(null!)

//   useFrame((state) => {
//     if (ringGroupRef.current) {
//       const time = state.clock.getElapsedTime()
//       ringGroupRef.current.rotation.x = time * 0.1
//       ringGroupRef.current.rotation.y = time * 0.15
//       ringGroupRef.current.rotation.z = time * 0.05
//     }
//   })

//   return (
//     <group ref={ringGroupRef}>
//       {/* Outer ring */}
//       <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
//         <ringGeometry args={[12, 12.4, 64]} />
//         <meshBasicMaterial
//           color="#8b5cf6"
//           transparent
//           opacity={0.15}
//           side={THREE.DoubleSide}
//         />
//       </mesh>
      
//       {/* Middle ring */}
//       <mesh rotation={[Math.PI / 4, -Math.PI / 6, Math.PI / 3]}>
//         <ringGeometry args={[8, 8.3, 48]} />
//         <meshBasicMaterial
//           color="#4f46e5"
//           transparent
//           opacity={0.2}
//           side={THREE.DoubleSide}
//         />
//       </mesh>
      
//       {/* Inner ring */}
//       <mesh rotation={[Math.PI / 6, -Math.PI / 3, Math.PI / 4]}>
//         <ringGeometry args={[5, 5.2, 32]} />
//         <meshBasicMaterial
//           color="#06b6d4"
//           transparent
//           opacity={0.25}
//           side={THREE.DoubleSide}
//         />
//       </mesh>
//     </group>
//   )
// }

// function EnergyBeams() {
//   const beamGroupRef = useRef<THREE.Group>(null!)

//   useFrame((state) => {
//     if (beamGroupRef.current) {
//       const time = state.clock.getElapsedTime()
//       beamGroupRef.current.rotation.y = time * 0.2
//     }
//   })

//   return (
//     <group ref={beamGroupRef}>
//       {Array.from({ length: 6 }, (_, i) => {
//         const angle = (i / 6) * Math.PI * 2
//         const radius = 15
//         return (
//           <mesh
//             key={i}
//             position={[
//               Math.cos(angle) * radius,
//               0,
//               Math.sin(angle) * radius
//             ]}
//             rotation={[0, angle, 0]}
//           >
//             <cylinderGeometry args={[0.02, 0.02, 30, 8]} />
//             <meshStandardMaterial
//               color="#4f46e5"
//               emissive="#4f46e5"
//               emissiveIntensity={0.3}
//               transparent
//               opacity={0.4}
//             />
//           </mesh>
//         )
//       })}
//     </group>
//   )
// }

function CameraController({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree()
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 3, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 3, 0.02)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

interface EtherealEnergyBackgroundProps {
  section?: string
  className?: string
}

export function EtherealEnergyBackground({ section, className = "" }: EtherealEnergyBackgroundProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMouse({
      x: (event.clientX - rect.left) / rect.width * 2 - 1,
      y: -(event.clientY - rect.top) / rect.height * 2 + 1
    })
  }

  return (
    <motion.div 
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 15], 
          fov: 75,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.4} color="#4f46e5" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#a855f7"
        />
        
        <Environment preset="night" />
        
        {/* All background elements */}
        <EtherealParticles mouse={mouse} />
        {/* {section === "hero" && <CentralEnergyOrb />} */}
        {section === "skills"? <BackgroundAsteroid hasAsteroid={true}/>:<BackgroundAsteroid hasAsteroid={false}/>}
        
        {/* New cosmos effects */}
        <AsteroidBelt />
        <ConstellationPatterns />
        <CosmicParticleTrails />
        <SolarWindEffects />
        <DeepSpaceParallax />
        
        <CameraController mouse={mouse} />
      </Canvas>
      
      {/* Enhanced overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-purple-900/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
    </motion.div>
  )
}
