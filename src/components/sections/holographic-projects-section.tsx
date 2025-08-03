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
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl lg:text-6xl font-light text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Creations
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore my holographic project gallery. Each creation represents a fusion of 
            cutting-edge technology and creative vision, pushing the boundaries of what's possible.
          </motion.p>
        </motion.div>

        {/* Project showcase */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`relative group ${project.featured ? 'lg:col-span-2' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                {/* Status badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Project content */}
                <div className={`grid ${project.featured ? 'lg:grid-cols-2 gap-12' : ''} items-center`}>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl lg:text-3xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <span className="text-sm text-gray-400">{project.year}</span>
                    </div>
                    
                    <p className="text-cyan-400 font-medium mb-4">{project.category}</p>
                    
                    <p className="text-gray-300 leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <motion.a
                        href={project.link}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-cursor="view"
                      >
                        View Live
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.a>
                      
                      <motion.a
                        href={project.github}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white font-medium hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-cursor="pointer"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    </div>
                  </div>

                  {/* Project visual for featured */}
                  {project.featured && (
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-4 mx-auto animate-pulse" />
                            <p className="text-white/60 text-sm">Interactive Preview</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all projects CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-white font-medium hover:border-white/40 hover:bg-white/5 transition-all duration-300"
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
