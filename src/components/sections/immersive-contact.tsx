"use client"

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, ExternalLink, Sparkles } from 'lucide-react'
import * as THREE from 'three'

// Interactive particle field that responds to form interaction
function InteractiveParticleField({ formActive }: { formActive: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const { mouse, viewport } = useThree()
  
  const particleCount = 300
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])
  
  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      if (i % 3 === 0) {
        col[i * 3] = 0.3     // Blue
        col[i * 3 + 1] = 0.6
        col[i * 3 + 2] = 1.0
      } else if (i % 3 === 1) {
        col[i * 3] = 0.8     // Purple
        col[i * 3 + 1] = 0.4
        col[i * 3 + 2] = 1.0
      } else {
        col[i * 3] = 0.2     // Cyan
        col[i * 3 + 1] = 1.0
        col[i * 3 + 2] = 0.8
      }
    }
    return col
  }, [])
  
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime
      
      // Rotate particles
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      
      // Mouse interaction - attract particles
      if (formActive) {
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          const mouseForce = 0.002
          positions[i3] += (mouse.x * viewport.width * 0.1 - positions[i3]) * mouseForce
          positions[i3 + 1] += (mouse.y * viewport.height * 0.1 - positions[i3 + 1]) * mouseForce
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true
      }
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={formActive ? 0.03 : 0.02}
        vertexColors
        transparent
        opacity={formActive ? 0.8 : 0.5}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// Flowing energy waves
function EnergyWaves() {
  const waveRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const vertexShader = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      pos.z += sin(pos.x * 2.0 + time) * 0.3;
      pos.z += cos(pos.y * 3.0 + time * 1.5) * 0.2;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `
  
  const fragmentShader = `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      float wave = sin(vUv.x * 10.0 - time * 2.0) * cos(vUv.y * 8.0 - time * 1.5);
      vec3 color = mix(color1, color2, wave * 0.5 + 0.5);
      
      float alpha = 0.3 + wave * 0.2;
      gl_FragColor = vec4(color, alpha);
    }
  `
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
    
    if (waveRef.current) {
      waveRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <mesh ref={waveRef} position={[0, 0, -8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color("#4f46e5") },
          color2: { value: new THREE.Color("#8b5cf6") }
        }}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function ContactLighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#1a1a2e" />
      <pointLight position={[5, 5, 10]} intensity={1} color="#4f46e5" />
      <pointLight position={[-5, -5, -10]} intensity={0.8} color="#8b5cf6" />
      <spotLight
        position={[0, 10, 5]}
        angle={0.4}
        penumbra={1}
        intensity={0.6}
        color="#06b6d4"
      />
    </>
  )
}

export function ImmersiveContact() {
  const containerRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formActive, setFormActive] = useState(false)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setFormActive(false)
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: '#', color: 'hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-sky-400' },
    { name: 'Email', icon: Mail, url: 'mailto:ansh.deshwal@example.com', color: 'hover:text-green-400' }
  ]

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'ansh.deshwal@example.com' },
    { icon: Phone, label: 'Phone', value: '+91 XXXXX XXXXX' },
    { icon: MapPin, label: 'Location', value: 'India' }
  ]

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden min-h-screen"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
        >
          <ContactLighting />
          <InteractiveParticleField formActive={formActive} />
          <EnergyWaves />
        </Canvas>
      </div>

      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">Let's Connect</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Start a
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Conversation
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
            Ready to bring your vision to life? Let's discuss how we can create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12">
              <h3 className="text-3xl font-light text-white mb-8">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="text-white/80 text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFormActive(true)}
                      onBlur={() => setFormActive(false)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label className="text-white/80 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFormActive(true)}
                      onBlur={() => setFormActive(false)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  className="space-y-2"
                  whileFocus={{ scale: 1.02 }}
                >
                  <label className="text-white/80 text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFormActive(true)}
                    onBlur={() => setFormActive(false)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                    placeholder="Project collaboration"
                    required
                  />
                </motion.div>
                
                <motion.div
                  className="space-y-2"
                  whileFocus={{ scale: 1.02 }}
                >
                  <label className="text-white/80 text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFormActive(true)}
                    onBlur={() => setFormActive(false)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your project idea..."
                    required
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-light text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-light text-white mb-6">Follow Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={`flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl text-white/70 ${social.color} transition-colors duration-300`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    data-cursor="pointer"
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="font-medium">{social.name}</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <h3 className="text-xl font-medium text-white">Available for Work</h3>
              </div>
              <p className="text-white/70">
                I'm currently accepting new projects and collaborations. 
                Let's create something amazing together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
