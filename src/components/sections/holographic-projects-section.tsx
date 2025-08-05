"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from 'react'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useComponentLoader } from '@/hooks/use-component-loader'

const EtherealEnergyBackground = dynamic(() => import("../three/enhanced-ethereal-background").then(mod => ({ default: mod.EtherealEnergyBackground })), { 
  ssr: false 
})

export function HolographicProjectsSection() {
  useComponentLoader('projects-section')
  
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const projects = [
    {
      title: "Briefly",
      category: "AI-Powered PDF Summarization SaaS Platform",
      description: "Full-Stack Development: Built a responsive web application using Next.js 14, TypeScript, and Tailwind CSS with server-side rendering and modern React patterns. AI Integration: Implemented intelligent AI summarization using OpenAI GPT-4 and Google Gemini APIs with automatic fallback handling for rate limiting and error recovery.",
      tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "PostgreSQL", "LangChain", "OpenAI API", "Google Gemini API", "Clerk Auth", "UploadThing", "Neon Database"],
      status: "Live",
      year: "2025",
      link: "https://briefly-drab.vercel.app/",
      github: "https://github.com/anshdeshwal31/Briefly",
      image: "/briefly-preview.png",
      featured: true
    },
    {
      title: "Hospitrix",
      category: "Hospital Management System", 
      description: "A comprehensive healthcare management platform featuring role-based portals for patients, doctors, and administrators. Built with React.js and TypeScript, it includes secure JWT authentication, Razorpay payment integration for appointments, MongoDB database with Mongoose ODM, and real-time appointment booking with automated conflict prevention",
      tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "Tailwind CSS", "JWT", "Razorpay"],
      status: "Live",
      year: "2025",
      link: "https://hospitrix-frontend.onrender.com/",
      github: "https://github.com/anshdeshwal31/hospitrix",
      image: "/hospitrix-preview.png",
      featured: true
    }
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* EtherealEnergyBackground like skills section but without asteroid */}
      <EtherealEnergyBackground section="projects" />

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full gap-8 flex flex-col items-center"
        style={{ y }}
      >
        {/* Section header */}
        <motion.div
          className="text-center flex flex-col gap-8 mb-24 max-w-4xl mx-auto px-8 lg:px-16"
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
            className="text-lg text-gray-300 max-w-2xl mb-6 mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A showcase of digital experiences crafted with precision, innovation, and attention to detail.
          </motion.p>
        </motion.div>

        {/* Project showcase */}
        <div className="w-full flex flex-col gap-8 items-center space-y-20" 
          style={{ padding: '10px 32px',display:"flex"}}
          >
          {projects.map((project, index) => (
            <motion.div
            key={project.title}
            className="relative group  w-[60vw] max-w-5xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            // style={{ padding: '6px 18px' }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-300 space-y-3 flex flex-col gap-3"
              style={{ padding: '12px 24px'  , display: 'flex', 
              flexDirection: 'column', 
              gap: '80px',  // Same as space-y-20 in Tailwind
              alignItems: 'center' }}

              >
                {/* Status badge */}
                <div className="absolute top-6 right-6 m-2" style={{marginTop:"10px"}}>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    project.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  }`}
            style={{ padding: '6px 8px', marginTop:'16px' }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Project content */}
                <div className="space-y-6 pt-2 mb-3" style={{display:"flex", flexDirection:"column" , gap:"15px"}}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl lg:text-3xl font-light text-white">
                        {project.title}
                      </h3>
                      <p className="text-blue-400 font-medium">{project.category}</p>
                    </div>
                    <span className="text-sm text-gray-400 mt-1 mb-6" style={{marginBottom:"6px"}}>{project.year}</span>
                  </div>
                  
                  {/* Website Preview Image */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-8 group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/20 group-hover:border-white/40 transition-all duration-300">
                      <Image
                        src={project.image}
                        alt={`${project.title} website preview`}
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        priority={project.featured}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-sm"
                        style={{padding:"6px 6px"}}>
                          Vi ew Live Site
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                  
                  <p className="text-gray-300 leading-relaxed max-w-4xl mb-8">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-6 py-3 bg-white/20 border-2 border-white/40 rounded-full text-sm text-white font-medium"
                        style={{ padding: '6px 18px' }}
                        >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions - Only GitHub button now */}
                  <div className="flex justify-center pt-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 rounded-full text-white font-medium hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="pointer"
                      style={{ padding: '12px 24px' }}
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all projects CTA */}
        {/* <motion.div
          className="text-center mt-20 px-8 lg:px-16"
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
        </motion.div> */}
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
