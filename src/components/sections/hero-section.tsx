"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { ThreeBackground } from "../three/three-background"

export function HeroSection() {
  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills')
    skillsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground section="hero" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Alex Vinci
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl text-neutral-300 mb-8 font-light tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <span className="text-blue-400">Full-Stack Developer</span>
            <span className="text-neutral-500 mx-4">•</span>
            <span className="text-purple-400">3D Experience Designer</span>
            <span className="text-neutral-500 mx-4">•</span>
            <span className="text-green-400">AI Enthusiast</span>
          </motion.div>
          
          <motion.p
            className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Crafting immersive digital experiences with modern web technologies, 
            interactive 3D environments, and cutting-edge AI solutions.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              Explore My Work
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border border-neutral-600 text-neutral-200 rounded-full font-medium hover:border-neutral-400 hover:text-white transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-400 hover:text-white transition-colors duration-300"
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        whileHover={{ y: -5 }}
        data-cursor="pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  )
}
