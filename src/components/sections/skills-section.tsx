"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const skills = [
  {
    category: "Frontend Development",
    technologies: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "📘" },
      { name: "TailwindCSS", icon: "🎨" },
    ]
  },
  {
    category: "Backend Development",
    technologies: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express", icon: "⚡" },
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
    ]
  },
  {
    category: "Tools & Technologies",
    technologies: [
      { name: "Git", icon: "📋" },
      { name: "Docker", icon: "🐳" },
      { name: "AWS", icon: "☁️" },
      { name: "Vercel", icon: "🔺" },
    ]
  },
  {
    category: "Programming Languages",
    technologies: [
      { name: "JavaScript", icon: "💛" },
      { name: "Python", icon: "🐍" },
      { name: "C++", icon: "⚙️" },
      { name: "Java", icon: "☕" },
    ]
  }
]

function SkillCard({ skill, index }: { skill: typeof skills[0]['technologies'][0], index: number }) {
  return (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      data-cursor="pointer"
    >
      <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl h-full group-hover:bg-white/8 group-hover:border-white/20 transition-all duration-500">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        <div className="relative z-10 text-center space-y-4">
          <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {skill.icon}
          </div>
          <h3 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors duration-300">
            {skill.name}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="skills" className=" flex justify-center items-center relative py-32 px-6 bg-gradient-to-b from-black via-neutral-950 to-black section-daria-bg" ref={ref}>
      {/* Daria-inspired decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-24 organic-blob daria-gradient-1 opacity-10"></div>
        <div className="absolute bottom-40 right-32 w-24 h-32 organic-blob daria-gradient-2 opacity-15"></div>
        <div className="absolute top-60 right-20 w-20 h-20 organic-blob daria-gradient-3 opacity-12"></div>
        <div className="absolute bottom-20 left-40 w-28 h-20 organic-blob daria-gradient-4 opacity-8"></div>
        
        {/* Floating geometric shapes */}
        {/* <div className="absolute top-32 left-1/3 w-4 h-4 bg-yellow-400 opacity-40 float-gentle" style={{ borderRadius: '50% 20% 80% 30%' }}></div>
        <div className="absolute bottom-60 right-1/4 w-6 h-6 bg-pink-400 opacity-30 pulse-soft" style={{ borderRadius: '30% 70% 40% 60%' }}></div>
        <div className="absolute top-80 left-60 w-3 h-3 bg-green-400 opacity-50 float-gentle"></div> */}
      </div>
      
      <div className="max-w-7xl flex justify-center items-center mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center flex justify-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 font-medium backdrop-blur-sm">
              Technical Expertise
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Skills &{" "}
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent font-extralight italic">
              Capabilities
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            A curated collection of modern technologies and tools that power exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-20">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="space-y-12"
            >
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-light text-white/90 mb-4">
                  {category.category}
                </h3>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {category.technologies.map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    index={index} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div 
            className="inline-flex items-center px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white/70 backdrop-blur-sm group hover:bg-white/8 hover:border-white/20 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium mr-3">
              Always evolving, always learning
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/50 group-hover:text-white/70 transition-colors duration-300"
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
