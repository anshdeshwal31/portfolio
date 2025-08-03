"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A sophisticated MERN application featuring modern UI/UX design, secure authentication, and real-time features. Built with scalability and performance in mind.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "TailwindCSS"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative workspace with real-time updates and team collaboration features. Designed for modern productivity workflows.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "An elegant weather application with beautiful data visualization and location-based forecasting capabilities.",
    technologies: ["React", "JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio showcasing projects with smooth animations and immersive user experience.",
    technologies: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript", "Vercel"],
    image: "/api/placeholder/600/400",
    demoUrl: "#",
    githubUrl: "#",
    featured: false
  }
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      className="mb-32 last:mb-0"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid lg:grid-cols-12 gap-16 items-center max-w-7xl mx-auto">
        {/* Project Image */}
        <motion.div 
          className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
          style={index % 2 === 0 ? { y } : {}}
        >
          <motion.div
            className="relative group overflow-hidden rounded-3xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
              <div className="w-full h-full flex items-center justify-center">
                <motion.div 
                  className="text-6xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  �
                </motion.div>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Floating Badge */}
            {project.featured && (
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 bg-white text-black text-sm font-medium rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Featured
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Project Content */}
        <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <motion.span 
                className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/60 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Project #{String(project.id).padStart(2, '0')}
              </motion.span>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
                {project.title}
              </h3>
            </div>
            
            <p className="text-lg text-white/60 leading-relaxed font-light">
              {project.description}
            </p>
          </motion.div>

          {/* Technologies */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 font-medium backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + techIndex * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                viewport={{ once: true }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.a
              href={project.demoUrl}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-white/90 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <span>View Project</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.a>
            
            <motion.a
              href={project.githubUrl}
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full font-medium text-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <Github size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Code</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section id="projects" className="relative py-32 px-6 bg-gradient-to-b from-black via-neutral-950 to-black" ref={containerRef}>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 font-medium backdrop-blur-sm">
              Selected Work
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent font-extralight italic">
              Projects
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            A showcase of digital experiences crafted with precision, innovation, and attention to detail
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="group px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-lg hover:bg-white/8 hover:border-white/20 transition-all duration-500 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              Explore All Projects
              <motion.span
                className="group-hover:translate-x-1 transition-transform duration-300"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
