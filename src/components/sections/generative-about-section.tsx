"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from 'react'
import { User, Code, Lightbulb, Heart } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from "next/image"

const GenerativeMorphingForms = dynamic(() => import("../three/generative-morphing-forms").then(mod => ({ default: mod.GenerativeMorphingForms })), { 
  ssr: false 
})

export function GenerativeAboutSection() {
  const sectionRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMouse({
      x: (event.clientX - rect.left) / rect.width * 2 - 1,
      y: -(event.clientY - rect.top) / rect.height * 2 + 1
    })
  }

  const stats = [
    { number: "5+", label: "Years Experience", icon: Code },
    { number: "50+", label: "Projects Completed", icon: Lightbulb },
    { number: "15+", label: "Technologies Mastered", icon: User },
    { number: "∞", label: "Passion for Innovation", icon: Heart }
  ]

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-black py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <motion.div style={{ scale }}>
          <GenerativeMorphingForms mouse={mouse} className="w-full h-full" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-screen">
          {/* Left side - 3D space reserved for morphing forms */}
          <Image src='/ansh_photo_2.jpg' alt="ansh deshwal" width={600} height={500} className="relative left-10 bottom-16"/>
          <div className="w-[600px] h-[500px] absolute bg-gradient-to-b from-transparent to-black via-black left-10 top-[250px] ">
          </div>

          {/* Right side - Content */}
          <motion.div
            className="space-y-12 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            {/* Section header */}
            <div>
              <motion.h2 
                className="text-5xl lg:text-6xl font-light text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                The Mind Behind{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  The Magic
                </span>
              </motion.h2>
              
              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Where analytical thinking meets creative vision, and complex problems 
                become elegant solutions through code.
              </motion.p>
            </div>

            {/* Story content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a digital architect who believes that technology should be both 
                <span className="text-blue-400 font-medium"> powerful</span> and 
                <span className="text-purple-400 font-medium"> beautiful</span>. 
                My journey began with curiosity about how pixels become experiences, 
                and evolved into a passion for creating immersive digital worlds.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                From crafting neural networks that see the unseen to building 3D experiences 
                that blur the line between virtual and reality, I thrive at the intersection 
                of <span className="text-cyan-400 font-medium">innovation</span> and 
                <span className="text-pink-400 font-medium"> user delight</span>.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Every project is an opportunity to push boundaries, challenge conventions, 
                and create something that doesn't just work—but 
                <span className="text-yellow-400 font-medium"> inspires</span>.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  data-cursor="pointer"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Philosophy */}
            <motion.div
              className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">My Philosophy</h3>
              <p className="text-gray-300 leading-relaxed italic">
                "Technology is most powerful when it feels effortless. The best interfaces 
                disappear, leaving only pure human intent and digital possibility. 
                I build experiences that don't just serve users—they 
                <span className="text-blue-400 font-medium"> elevate them</span>."
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="pointer"
              >
                Let's Collaborate
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border border-white/20 rounded-full text-white font-medium hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="download"
              >
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
