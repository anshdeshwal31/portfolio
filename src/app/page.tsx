"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { LoadingProvider, useLoading } from '@/contexts/loading-context'

// Dynamically import premium components
const PerformanceMonitor = dynamic(() => import("@/components/ui/performance-monitor").then(mod => ({ default: mod.PerformanceMonitor })), { ssr: false })
const LoadingScreen = dynamic(() => import("@/components/ui/loading-screen").then(mod => ({ default: mod.LoadingScreen })), { ssr: false })
const Navigation = dynamic(() => import("@/components/navigation").then(mod => ({ default: mod.Navigation })), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/ui/custom-cursor").then(mod => ({ default: mod.CustomCursor })), { ssr: false })
const FloatingActionButton = dynamic(() => import("@/components/ui/floating-action-button").then(mod => ({ default: mod.FloatingActionButton })), { ssr: false })

// New premium 3D interactive sections
const EtherealHeroSection = dynamic(() => import("@/components/sections/ethereal-hero-section").then(mod => ({ default: mod.EtherealHeroSection })), { ssr: false })
const InteractiveSkillsSection = dynamic(() => import("@/components/sections/interactive-skills-section").then(mod => ({ default: mod.InteractiveSkillsSection })), { ssr: false })
const HolographicProjectsSection = dynamic(() => import("@/components/sections/holographic-projects-section").then(mod => ({ default: mod.HolographicProjectsSection })), { ssr: false })
const ImmersiveContactSection = dynamic(() => import("@/components/sections/immersive-contact-section").then(mod => ({ default: mod.ImmersiveContactSection })), { ssr: false })

function PortfolioContent() {
  const { isLoading } = useLoading()

  return (
    <div className="relative overflow-hidden min-h-screen bg-black">
      <Suspense fallback={<div className="fixed inset-0 bg-black z-50" />}>
        <LoadingScreen />
        
        {/* Only show main content when not loading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: isLoading ? 0 : 0.5 }}
          style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
        >
          <CustomCursor />
          <Navigation />
          <FloatingActionButton />
          <PerformanceMonitor />
          
          {/* Premium 3D Interactive Sections */}
          <main className="relative">
            {/* Hero Section - Ethereal Energy Background */}
            <section id="hero" className="relative">
              <EtherealHeroSection />
            </section>
            
            {/* Skills Section - Orbital 3D Visualization */}
            <section id="skills" className="relative">
              <InteractiveSkillsSection />
            </section>
            
            {/* Projects Section - Holographic Project Cards */}
            <section id="projects" className="relative">
              <HolographicProjectsSection />
            </section>
            
            {/* About Section - Generative Morphing Forms */}
          {/* <section id="about" className="relative">
            <GenerativeAboutSection />
          </section> */}
          
          {/* Contact Section - Immersive Particle Environment */}
          <section id="contact" className="relative">
            <ImmersiveContactSection />
          </section>
        </main>
        
        {/* Premium Footer with subtle animations */}
        {/* <footer className="relative bg-gradient-to-b from-gray-950 to-black border-t border-white/10 py-16 px-8 lg:px-16 z-10">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-light text-white mb-2">
                  Ansh Deshwal
                </h3>
                <p className="text-white/60 font-light">
                  Digital Experience Architect
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="flex gap-8">
                  {['Skills', 'Projects', 'About', 'Contact'].map((link) => (
                    <motion.a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="text-white/60 hover:text-white transition-colors duration-300 font-medium"
                      whileHover={{ y: -2 }}
                      data-cursor="pointer"
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <p className="text-white/60 font-light">
                  © 2025 Ansh Deshwal
                </p>
                <p className="text-white/40 text-sm mt-1">
                  Crafted with passion and precision
                </p>
              </div>
            </div>
          </motion.div>
        </footer> */}
        </motion.div>
      </Suspense>
    </div>
  )
}

export default function Home() {
  return (
    <LoadingProvider>
      <PortfolioContent />
    </LoadingProvider>
  )
}
