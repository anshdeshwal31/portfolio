"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github, ArrowUpRight, Zap } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    subtitle: "Next-Gen Retail Experience", 
    description: "A sophisticated MERN application featuring modern UI/UX design, secure authentication, and real-time features. Built with scalability and performance in mind.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "TailwindCSS"],
    image: "/api/placeholder/800/600",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    gradient: "from-blue-600/20 to-purple-600/20"
  },
  {
    id: 2,
    title: "Task Management App",
    subtitle: "Collaborative Workspace",
    description: "A collaborative workspace with real-time updates and team collaboration features. Designed for modern productivity workflows with intuitive design.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
    image: "/api/placeholder/800/600",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    gradient: "from-green-600/20 to-emerald-600/20"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    subtitle: "Data Visualization",
    description: "An elegant weather application with beautiful data visualization and location-based forecasting capabilities with real-time updates.",
    technologies: ["React", "JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
    image: "/api/placeholder/800/600",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-orange-600/20 to-red-600/20"
  },
  {
    id: 4,
    title: "AI-Powered Assistant",
    subtitle: "Machine Learning Integration",
    description: "An intelligent virtual assistant powered by machine learning algorithms, featuring natural language processing and adaptive responses.",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "OpenAI"],
    image: "/api/placeholder/800/600",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-pink-600/20 to-purple-600/20"
  }
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      className="relative mb-32 last:mb-0"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-8 lg:px-16 ${
        isEven ? '' : 'lg:grid-flow-dense'
      }`}>
        
        {/* Project Image */}
        <motion.div
          className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
          style={{ y: isEven ? y : undefined }}
          initial={{ opacity: 0, x: isEven ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
            
            {/* Image container */}
            <motion.div
              className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm"
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder content */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="text-6xl opacity-20">🚀</div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Floating tech badges */}
                <div className="absolute bottom-6 left-6 flex gap-2 flex-wrap max-w-[60%]">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white/80 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white/60 font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Project Content */}
        <motion.div
          className={`lg:col-span-5 space-y-8 ${isEven ? 'lg:order-1' : 'lg:order-2'} ${
            isEven ? 'lg:text-right' : 'lg:text-left'
          } text-center lg:text-left`}
          initial={{ opacity: 0, x: isEven ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Project badge */}
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm ${
              isEven ? 'lg:ml-auto' : ''
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/70">
              {project.featured ? 'Featured Project' : 'Case Study'}
            </span>
          </motion.div>

          {/* Title and subtitle */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-2">
                {project.title}
              </h3>
              <p className="text-xl lg:text-2xl text-white/60 font-light">
                {project.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            className="text-lg lg:text-xl text-white/70 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {project.description}
          </motion.p>

          {/* Tech stack */}
          <motion.div
            className={`flex flex-wrap gap-3 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {project.technologies.map((tech, techIndex) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/80 font-medium backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className={`flex gap-6 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-center pt-4`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.a
              href={project.demoUrl}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-medium text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <ExternalLink size={18} />
              <span>View Live</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.a>

            <motion.a
              href={project.githubUrl}
              className="flex items-center gap-3 px-8 py-4 border border-white/20 rounded-2xl font-medium text-white/90 backdrop-blur-sm hover:bg-white/5 hover:border-white/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <Github size={18} />
              <span>Source</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function LuxuryProjectsSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5" />
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/10 to-yellow-600/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-32 px-8 lg:px-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 font-medium backdrop-blur-sm">
              Selected Works
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent font-extralight italic">
              Projects
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
            A curated collection of digital experiences that showcase innovation, 
            technical excellence, and attention to detail
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-32 px-8 lg:px-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="group relative px-12 py-6 bg-white/5 border border-white/10 rounded-2xl text-white/70 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-500 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center gap-4">
              <span className="text-lg font-medium">Explore All Projects</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
