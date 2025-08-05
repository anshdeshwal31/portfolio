"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Sparkles } from "lucide-react"
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { useComponentLoader } from '@/hooks/use-component-loader'

// Dynamically import the enhanced ethereal background
const EtherealEnergyBackground = dynamic(() => import("../three/enhanced-ethereal-background").then(mod => ({ default: mod.EtherealEnergyBackground })), { 
  ssr: false 
})

export function EtherealHeroSection() {
  useComponentLoader('hero-section')
  
  const containerRef = useRef(null)
  const [, setMouse] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMouse({
      x: (event.clientX - rect.left) / rect.width * 2 - 1,
      y: -(event.clientY - rect.top) / rect.height * 2 + 1
    })
  }

  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills')
    skillsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Ethereal 3D Background */}
      <EtherealEnergyBackground section="hero" />
      
      {/* Content */}
      <motion.div 
        className="flex relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 justify-between items-center"
        style={{ y, opacity }}
      >
          <motion.div className="">
            <motion.img initial={{opacity:0}} animate={{opacity:1}} transition={{duration:4,delay:1}} src="/ansh_photo_2.jpg" alt="ansh deshwal" className="w-[600px] " />
            <div className="w-[600px] h-[550px] absolute bg-gradient-to-b from-transparent via-black/100 to-black top-[290px] border-white  ">
            </div>
          </motion.div>
        <div className="flex flex-col items-center justify-center min-h-screen py-32 text-center">
          {/* Main heading with staggered animation */}
          <motion.div
            className="space-y-8 mb-18"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl lg:text-8xl xl:text-9xl font-light tracking-tight"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              <span className="block text-white">Ansh</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Deshwal
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              Full-stack web developer crafting web technologies where{' '}
              <span className="text-blue-400 font-medium">technology</span> meets{' '}
              <span className="text-purple-400 font-medium">artistry</span>
            </motion.p>
          </motion.div>

          {/* Interactive elements */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-16 mt-6"
            style={{marginTop:"15px", marginBottom:"15px"}}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.6 }}
          >
            <motion.button
              className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:cursor-pointer text-white font-medium transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // data-cursor="pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore My Work
                <Sparkles className="w-4 h-4" />
              </span>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
            </motion.button>
            
            {/* <motion.button
              className="group px-8 py-4 border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:border-white/40 hover:bg-white/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="download"
            >
              <span className="flex items-center gap-2">
                Download CV
                <Download className="w-4 h-4" />
              </span>
            </motion.button> */}
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-6 mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.0 }}
          >
            {[
              { icon: Github, href: "https://github.com/anshdeshwal31", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/ansh-deshwal-67ab992ab/", label: "LinkedIn" },
              // { icon: Mail, href: "#", label: "Email" }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="p-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                data-cursor="pointer"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.4 }}
          >
            <motion.button
              onClick={scrollToNext}
              className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              data-cursor="pointer"
            >
              <span className="text-sm font-light">Discover More</span>
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Atmospheric gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
