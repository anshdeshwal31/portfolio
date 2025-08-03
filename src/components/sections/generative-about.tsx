"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Brain, Code, Palette, Zap, Users, Award, Heart, Target } from 'lucide-react'
import * as THREE from 'three'

// Morphing mesh component
function MorphingForm() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { mouse, viewport } = useThree()
  
  // Create initial geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 4)
    const positions = geo.attributes.position.array as Float32Array
    const originalPositions = positions.slice()
    
    // Store original positions for morphing
    geo.userData = { originalPositions }
    return geo
  }, [])

  // Custom vertex shader for morphing
  const vertexShader = `
    uniform float time;
    uniform float morphStrength;
    uniform vec2 mouse;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    
    // Noise function
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0);
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 =   v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Multi-layer noise for complex morphing
      float noise1 = snoise(pos * 0.5 + time * 0.3);
      float noise2 = snoise(pos * 1.0 + time * 0.5);
      float noise3 = snoise(pos * 2.0 + time * 0.7);
      
      // Combine noise layers
      float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
      
      // Apply morphing based on mouse interaction
      float mouseInfluence = length(mouse) * 2.0;
      float finalMorph = morphStrength * (1.0 + mouseInfluence) * combinedNoise;
      
      // Displace vertices along normal
      pos += normal * finalMorph;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  // Fragment shader for iridescent effect
  const fragmentShader = `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    
    void main() {
      // Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = 1.0 - dot(viewDirection, vNormal);
      
      // Iridescent color mixing
      float colorMix1 = sin(vPosition.x * 2.0 + time) * 0.5 + 0.5;
      float colorMix2 = cos(vPosition.y * 3.0 + time * 1.5) * 0.5 + 0.5;
      
      vec3 baseColor = mix(color1, color2, colorMix1);
      baseColor = mix(baseColor, color3, colorMix2);
      
      // Apply fresnel and add glow
      vec3 finalColor = baseColor + fresnel * 0.3;
      float alpha = 0.8 + fresnel * 0.2;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.elapsedTime
      
      // Update shader uniforms
      materialRef.current.uniforms.time.value = time
      materialRef.current.uniforms.morphStrength.value = 0.3 + Math.sin(time * 0.5) * 0.2
      materialRef.current.uniforms.mouse.value.set(mouse.x, mouse.y)
      
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
      meshRef.current.rotation.y = time * 0.1
      meshRef.current.rotation.z = Math.cos(time * 0.15) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          morphStrength: { value: 0.3 },
          mouse: { value: new THREE.Vector2() },
          color1: { value: new THREE.Color("#4f46e5") },
          color2: { value: new THREE.Color("#8b5cf6") },
          color3: { value: new THREE.Color("#06b6d4") }
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Floating light orbs
function FloatingLights() {
  const lightsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (lightsRef.current) {
      const time = state.clock.elapsedTime
      lightsRef.current.rotation.y = time * 0.1
      
      lightsRef.current.children.forEach((light, index) => {
        const offset = index * (Math.PI * 2 / 3)
        light.position.x = Math.cos(time * 0.5 + offset) * 4
        light.position.y = Math.sin(time * 0.3 + offset) * 2
        light.position.z = Math.sin(time * 0.4 + offset) * 3
      })
    }
  })

  return (
    <group ref={lightsRef}>
      <pointLight position={[4, 2, 3]} intensity={0.8} color="#4f46e5" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[0, 4, -2]} intensity={0.7} color="#06b6d4" />
    </group>
  )
}

function AboutLighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#1a1a2e" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        color="#ffffff"
      />
    </>
  )
}

export function GenerativeAbout() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const highlights = [
    {
      icon: Brain,
      title: "Creative Problem Solver",
      description: "Approaching challenges with innovative thinking and systematic analysis to deliver unique solutions."
    },
    {
      icon: Code,
      title: "Technical Excellence",
      description: "Mastering cutting-edge technologies with a focus on clean, efficient, and scalable code architecture."
    },
    {
      icon: Palette,
      title: "Design-Driven Development",
      description: "Blending aesthetic sensibility with technical expertise to create visually stunning experiences."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Obsessed with speed and efficiency, ensuring every project delivers exceptional user experiences."
    }
  ]

  const values = [
    { icon: Users, label: "Collaboration", description: "Believing in the power of teamwork" },
    { icon: Award, label: "Excellence", description: "Striving for perfection in every detail" },
    { icon: Heart, label: "Passion", description: "Loving what I do and doing it with enthusiasm" },
    { icon: Target, label: "Focus", description: "Maintaining clear goals and dedication" }
  ]

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden min-h-screen"
    >
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
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
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-white/90">Digital Craftsman</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            About
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              The Creator
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
            Where art meets technology, and imagination becomes reality through code.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - 3D Morphing Form */}
          <motion.div
            className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Canvas
              camera={{ position: [0, 0, 6], fov: 75 }}
              style={{ background: 'transparent' }}
              dpr={[1, 2]}
            >
              <AboutLighting />
              <FloatingLights />
              <MorphingForm />
            </Canvas>
            
            {/* Overlay info */}
            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
              <p className="text-white/80 text-sm">
                🎨 Generative form morphs with your interaction
              </p>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Introduction */}
            <div className="space-y-6">
              <h3 className="text-3xl font-light text-white mb-6">
                Crafting Digital Experiences
              </h3>
              <p className="text-lg text-white/70 leading-relaxed">
                I'm Ansh Deshwal, a passionate full-stack developer who believes in the transformative 
                power of technology. With expertise spanning from elegant frontend interfaces to robust 
                backend architectures, I create digital experiences that captivate and inspire.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                My journey in development is driven by curiosity and the constant pursuit of innovation. 
                Every project is an opportunity to push boundaries and create something meaningful.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/8 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-white/70">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Values */}
            <div>
              <h4 className="text-2xl font-light text-white mb-6">Core Values</h4>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.label}
                    className="text-center p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/8 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <value.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h5 className="text-white font-medium mb-1">{value.label}</h5>
                    <p className="text-white/60 text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="pointer"
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Let's Create Something Amazing
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
