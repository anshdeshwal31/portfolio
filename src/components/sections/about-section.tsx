"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const highlights = [
  {
    icon: "⚡",
    title: "Full-Stack Expertise",
    description: "Proficient in the complete MERN stack with a focus on scalable, performant applications."
  },
  {
    icon: "🎨",
    title: "Visual Design",
    description: "Creating immersive experiences with modern design principles and cutting-edge technologies."
  },
  {
    icon: "🧠",
    title: "Problem Solving",
    description: "Deep analytical thinking combined with creative solutions for complex technical challenges."
  },
  {
    icon: "🚀",
    title: "Performance Focus",
    description: "Optimizing for speed, efficiency, and exceptional user experiences across all platforms."
  }
]

function AnshPhoto() {
  const photoRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  return (
    <motion.div
      ref={photoRef}
      style={{ y, rotate }}
      className="relative w-80 h-80 mx-auto lg:mx-0"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl blur-xl transform rotate-6" />
      <div className="absolute inset-4 bg-gradient-to-tr from-white/5 to-white/10 rounded-3xl" />
      
      {/* Photo Container */}
      <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 overflow-hidden backdrop-blur-sm">
        {/* Ansh's Photo */}
        <Image
          src="/ansh-photo.jpg"
          alt="Ansh Deshwal"
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 320px"
          priority
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div
        className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/5 rounded-full backdrop-blur-sm border border-white/10"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.3, 0.8, 0.3] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
      />
    </motion.div>
  )
}

function HighlightCard({ highlight, index }: { highlight: typeof highlights[0], index: number }) {
  return (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
    >
      <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl h-full group-hover:bg-white/8 group-hover:border-white/20 transition-all duration-500">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        <div className="relative z-10 space-y-4">
          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {highlight.icon}
          </div>
          <h3 className="text-xl font-medium text-white/90 group-hover:text-white transition-colors duration-300 mb-3">
            {highlight.title}
          </h3>
          <p className="text-white/60 leading-relaxed font-light">
            {highlight.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function AboutSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section id="about" className="relative py-32 px-6 bg-gradient-to-b from-black via-neutral-950 to-black" ref={containerRef}>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 font-medium backdrop-blur-sm">
              About Me
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Meet{" "}
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent font-extralight italic">
              Ansh
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            Passionate developer dedicated to creating meaningful digital experiences with modern technologies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-24">
          {/* Photo */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnshPhoto />
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <p className="text-lg text-white/70 leading-relaxed font-light">
                With a passion for both technology and creativity, I specialize in building 
                full-stack applications that seamlessly blend functionality with stunning 
                visual experiences. My journey spans from traditional web development to 
                cutting-edge modern frameworks and tools.
              </p>
              
              <p className="text-lg text-white/70 leading-relaxed font-light">
                I believe in the power of clean code, intuitive design, and performance 
                optimization. Whether it's architecting scalable backend systems, crafting 
                immersive frontend experiences, or solving complex technical challenges, 
                I approach each project with meticulous attention to detail.
              </p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm backdrop-blur-sm">
                🎯 Problem Solver
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm backdrop-blur-sm">
                🚀 Innovation Driven
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm backdrop-blur-sm">
                📚 Continuous Learner
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {highlights.map((highlight, index) => (
            <HighlightCard key={highlight.title} highlight={highlight} index={index} />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block p-12 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl backdrop-blur-sm max-w-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white/80 text-xl italic font-light leading-relaxed mb-4">
              "The best way to predict the future is to create it."
            </p>
            <p className="text-white/50 text-sm">— Alan Kay</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
