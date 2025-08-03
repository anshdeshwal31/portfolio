"use client"

import { motion } from "framer-motion"

// Decorative SVG components inspired by Daria's playful style
export function FloatingEye({ className = "", delay = 0 }: { className?: string, delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-blue-400">
        <ellipse cx="20" cy="20" rx="18" ry="12" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
        <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.8"/>
        <circle cx="22" cy="18" r="2" fill="white"/>
      </svg>
    </motion.div>
  )
}

export function PlayfulFlower({ className = "", color = "text-pink-400", delay = 0 }: { className?: string, color?: string, delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className} ${color}`}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ 
        opacity: [0.4, 0.8, 0.4],
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" opacity="0.6">
        <path d="M16 8c-2 0-4 2-4 4 0-2-2-4-4-4s-4 2-4 4c0 2 2 4 4 4-2 0-4 2-4 4s2 4 4 4c2 0 4-2 4-4 0 2 2 4 4 4s4-2 4-4c0-2-2-4-4-4 2 0 4-2 4-4s-2-4-4-4z"/>
        <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.8"/>
      </svg>
    </motion.div>
  )
}

export function ColorfulDot({ className = "", color = "bg-yellow-400", delay = 0 }: { className?: string, color?: string, delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className} ${color} w-3 h-3 rounded-full opacity-60`}
      animate={{ 
        y: [0, -15, 0],
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.3, 1]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    />
  )
}

export function OrganicBlob({ className = "", gradient = "from-purple-400/20 to-pink-400/20", delay = 0 }: { className?: string, gradient?: string, delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className} bg-gradient-to-r ${gradient} rounded-full blur-sm`}
      animate={{ 
        scale: [1, 1.4, 1.2, 1],
        opacity: [0.3, 0.7, 0.5, 0.3],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: 15, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    />
  )
}

export function WavyLine({ className = "", color = "text-green-400", delay = 0 }: { className?: string, color?: string, delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className} ${color}`}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: [0, 1, 0],
        opacity: [0, 0.6, 0],
        rotate: [0, 360]
      }}
      transition={{ 
        duration: 10, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
        <path 
          d="M5 10 Q15 5 25 10 T45 10 T55 10" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
          opacity="0.5"
        />
      </svg>
    </motion.div>
  )
}

export function GeometricShape({ className = "", delay = 0 }: { className?: string, delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear",
        delay 
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
        <polygon 
          points="12,2 22,7 22,17 12,22 2,17 2,7" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
          opacity="0.4"
        />
      </svg>
    </motion.div>
  )
}
