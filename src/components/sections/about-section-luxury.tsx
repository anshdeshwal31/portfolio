"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Sparkles, ArrowUpRight, Code, Palette, Brain, Zap } from "lucide-react"

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Mastery",
    description: "Expert in the complete MERN stack with deep understanding of scalable architecture, performance optimization, and modern development practices.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "Visual Excellence", 
    description: "Creating stunning user interfaces with attention to detail, modern design principles, and cutting-edge animation techniques.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Brain,
    title: "Problem Solving",
    description: "Analytical mindset combined with creative thinking to solve complex technical challenges and deliver innovative solutions.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Performance Focus",
    description: "Obsessed with optimization, speed, and delivering exceptional user experiences across all platforms and devices.",
    gradient: "from-orange-500 to-red-500"
  }
]

const skills = [
  "React & Next.js",
  "TypeScript", 
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Framer Motion",
  "TailwindCSS"
]

function HighlightCard({ highlight, index }: { highlight: typeof highlights[0], index: number }) {
  return (
    <motion.div
      className="group relative p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      viewport={{ once: true }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      <div className="relative">
        <div className={`inline-flex p-4 bg-gradient-to-r ${highlight.gradient} rounded-2xl text-white mb-6`}>
          <highlight.icon size={28} />
        </div>
        
        <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-white transition-colors duration-300">
          {highlight.title}
        </h3>
        
        <p className="text-white/70 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300">
          {highlight.description}
        </p>
      </div>
    </motion.div>
  )
}

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
      className="relative max-w-md mx-auto lg:max-w-none"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Main glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl scale-110 animate-pulse" />
      
      {/* Photo container */}
      <motion.div
        className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-3xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/5"
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src="/ansh.jpg"
          alt="Ansh Deshwal"
          fill
          className="object-cover object-center"
          priority
        />
        
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-60 blur-xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl opacity-40 blur-lg"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Tech orbit */}
      <motion.div
        className="absolute -inset-16 border border-white/5 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          R
        </div>
      </motion.div>
    </motion.div>
  )
}

export function LuxuryAboutSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/20 to-yellow-600/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/70">About Me</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Crafting Digital{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extralight italic">
              Experiences
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
            Passionate developer dedicated to creating meaningful digital experiences 
            with modern technologies and innovative solutions
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-32">
          {/* Photo */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-start order-1 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <AnshPhoto />
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-7 space-y-8 order-2 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <motion.p 
                className="text-xl lg:text-2xl text-white/80 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                With a passion for both technology and creativity, I specialize in building 
                full-stack applications that seamlessly blend functionality with stunning 
                visual experiences.
              </motion.p>
              
              <motion.p 
                className="text-lg lg:text-xl text-white/70 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                My journey spans from traditional web development to cutting-edge 
                3D graphics and modern animation techniques. I believe in the power 
                of clean code, intuitive design, and performance optimization.
              </motion.p>

              <motion.p 
                className="text-lg lg:text-xl text-white/70 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Whether it's architecting scalable backend systems, crafting immersive 
                frontend experiences, or optimizing for performance, I approach each 
                project with meticulous attention to detail and a drive for excellence.
              </motion.p>
            </div>

            {/* Skills tags */}
            <motion.div
              className="flex flex-wrap gap-3 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/80 font-medium backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Philosophy quote */}
            <motion.div
              className="relative mt-12 p-8 bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="relative">
                <p className="text-lg lg:text-xl text-white/90 italic font-light leading-relaxed">
                  "Great design is not just what it looks like — great design is how it works."
                </p>
                <p className="text-white/60 text-sm mt-4 font-medium">— Steve Jobs</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {highlights.map((highlight, index) => (
            <HighlightCard key={highlight.title} highlight={highlight} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-medium text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3">
              <span className="text-lg">Let's Work Together</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
