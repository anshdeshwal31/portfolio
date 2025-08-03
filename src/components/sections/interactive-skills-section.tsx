"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from 'react'
import dynamic from 'next/dynamic'

const EtherealEnergyBackground = dynamic(() => import("../three/enhanced-ethereal-background").then(mod => ({ default: mod.EtherealEnergyBackground })), { 
  ssr: false 
})

export function InteractiveSkillsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const skills = [
    "React", "Next.js", "TypeScript", "Framer Motion",
    "Node.js", "Python", "PostgreSQL",  "REST APIs",
    "AWS","JavaScript", "Tailwind CSS", "Material-UI", "Figma",
    "Git", "MongoDB", "Firebase", "Cloudflare"
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* Dynamic 3D background like hero section */}
      <div className="absolute inset-0">
        <motion.div 
          className="w-full h-full"
          style={{ scale, opacity }}
        >
          <EtherealEnergyBackground section="skills" className="w-full h-full" />
        </motion.div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-20 w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl lg:text-6xl font-light text-white mb-6 w-full text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Expertise in{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Motion
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 leading-relaxed w-full text-center max-w-4xl mx-auto px-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Watch my skills orbit in real-time. Each sphere represents years of dedication, 
            countless projects, and a passion for pushing technological boundaries.
          </motion.p>
        </motion.div>

        {/* Simple skills grid - centered and properly spaced */}
        <motion.div
          className="flex justify-center w-full px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8 justify-items-center place-items-center">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="group relative bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-xl p-4 lg:p-6 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/5 w-full max-w-[140px] flex items-center justify-center min-h-[80px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  style={{ cursor: 'default' }}
                >
                  <span className="text-white font-medium text-sm lg:text-base group-hover:text-blue-300 transition-colors duration-300 text-center leading-tight">
                    {skill}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/10 to-cyan-600/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20 w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6 w-full text-center">
            Interested in working together? Let's create something extraordinary.
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: 'pointer' }}
          >
            Start a Conversation
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
