"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from 'react'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import dynamic from 'next/dynamic'

const EtherealEnergyBackground = dynamic(() => import("../three/enhanced-ethereal-background").then(mod => ({ default: mod.EtherealEnergyBackground })), { 
  ssr: false 
})

export function HolographicProjectsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const projects = [
    {
      title: "Neural Vision Studio",
      category: "AI/ML Platform",
      description: "Advanced computer vision platform with real-time neural network training, featuring interactive 3D model visualization and seamless deployment pipeline.",
      tech: ["Next.js", "TensorFlow.js", "Three.js", "WebGL", "Python"],
      status: "Live",
      year: "2024",
      link: "#",
      github: "#",
      featured: true
    },
    {
      title: "Ethereal Commerce",
      category: "E-Commerce Innovation", 
      description: "Next-generation shopping experience with AR product visualization, voice AI assistance, and immersive 3D product galleries.",
      tech: ["React", "WebXR", "Three.js", "Stripe", "Node.js"],
      status: "In Development",
      year: "2024",
      link: "#",
      github: "#",
      featured: true
    },
    {
      title: "Quantum Dashboard",
      category: "Data Visualization",
      description: "Real-time quantum computing simulation dashboard with interactive particle physics visualization and advanced analytics.",
      tech: ["Vue.js", "D3.js", "WebGL", "Python", "Quantum SDK"],
      status: "Live",
      year: "2023",
      link: "#",
      github: "#",
      featured: false
    },
    {
      title: "Blockchain Metropolis",
      category: "Web3 Platform",
      description: "Immersive blockchain explorer with 3D network visualization, smart contract interaction, and DeFi protocol integration.",
      tech: ["React", "Three.js", "Web3.js", "Solidity", "IPFS"],
      status: "Live", 
      year: "2023",
      link: "#",
      github: "#",
      featured: false
    }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0">
        <EtherealEnergyBackground section="projects" className="w-full h-full" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16"
        style={{ y }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-light text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A showcase of digital experiences crafted with precision, innovation, and attention to detail.
          </motion.p>
        </motion.div>

        {/* Project showcase */}
        <div className="max-w-6xl mx-auto space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 relative overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                {/* Status badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    project.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Project content */}
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl lg:text-3xl font-light text-white">
                        {project.title}
                      </h3>
                      <p className="text-blue-400 font-medium">{project.category}</p>
                    </div>
                    <span className="text-sm text-gray-400 mt-1">{project.year}</span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed max-w-4xl">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-2">
                    <motion.a
                      href={project.link}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="view"
                    >
                      View Live
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.a>
                    
                    <motion.a
                      href={project.github}
                      className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/30 rounded-full text-white font-medium hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="pointer"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all projects CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 rounded-full text-white font-medium hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
