"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRef } from 'react'
import { ParallaxSection, ScrollReveal, FloatingElement, MouseParallax } from '../ui/parallax-components'

// Dynamically import Igloo-inspired Three.js background to avoid SSR issues
const IglooInspiredBackground = dynamic(() => import("../three/igloo-inspired-background").then(mod => ({ default: mod.IglooInspiredBackground })), { 
  ssr: false 
})

export function LuxuryHeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills')
    skillsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <IglooInspiredBackground section="hero" />
      
      {/* Ambient glow effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-purple-900/10 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/20 to-yellow-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-screen py-32">
          {/* Left side - Content */}
          <motion.div
            className="space-y-12 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white/90">Available for new opportunities</span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-6">
              <motion.h1
                className="text-6xl lg:text-8xl xl:text-9xl font-extralight tracking-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <span className="block text-white font-light">Ansh</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extralight">
                  Deshwal
                </span>
              </motion.h1>

              <motion.div
                className="space-y-4 text-xl lg:text-2xl xl:text-3xl font-light text-white/80"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                <div className="relative">
                  <span className="relative z-10">Full-Stack Developer</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-sm -z-10" />
                </div>
                <div className="text-white/60">& Digital Experience Architect</div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              Crafting immersive digital experiences with cutting-edge technologies. 
              Transforming ideas into elegant, performant applications that push the boundaries of web development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              <motion.button
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-medium text-white overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <Download size={20} />
                  <span>Download Resume</span>
                </div>
              </motion.button>

              <motion.button
                onClick={scrollToNext}
                className="px-10 py-5 border border-white/20 rounded-2xl font-medium text-white/90 backdrop-blur-sm hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="pointer"
              >
                View My Work
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-6 justify-center lg:justify-start pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }}
            >
              {[
                { icon: Github, href: "https://github.com", color: "hover:text-white" },
                { icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-400" },
                { icon: Mail, href: "mailto:ansh@example.com", color: "hover:text-green-400" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`p-4 bg-white/5 border border-white/10 rounded-xl text-white/60 ${social.color} backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 + index * 0.1 }}
                  data-cursor="pointer"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Photo */}
          <motion.div
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="relative">
              {/* Glow effect behind photo */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl scale-110" />
              
              {/* Photo container */}
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-3xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/5"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/ansh.jpg"
                  alt="Ansh Deshwal"
                  fill
                  className="object-cover object-center"
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-80 blur-sm"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl opacity-60 blur-sm"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors duration-300 group"
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
        whileHover={{ y: -5 }}
        data-cursor="pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="group-hover:text-white transition-colors duration-300"
          >
            <ArrowDown size={20} />
          </motion.div>
        </div>
      </motion.button>
    </section>
  )
}
