"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  offset?: ["start end", "end start"] | ["start start", "end end"] | ["center center", "end start"]
}

export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  offset = ["start end", "end start"]
}: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
  })

  // Create smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform based on direction
  const getTransform = () => {
    const range = direction === 'up' || direction === 'down' ? 200 : 100
    const multiplier = speed * range
    
    switch (direction) {
      case 'up':
        return useTransform(smoothProgress, [0, 1], [0, -multiplier])
      case 'down':
        return useTransform(smoothProgress, [0, 1], [0, multiplier])
      case 'left':
        return useTransform(smoothProgress, [0, 1], [0, -multiplier])
      case 'right':
        return useTransform(smoothProgress, [0, 1], [0, multiplier])
      default:
        return useTransform(smoothProgress, [0, 1], [0, -multiplier])
    }
  }

  const transform = getTransform()

  const style = direction === 'left' || direction === 'right' 
    ? { x: transform }
    : { y: transform }

  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxLayerProps {
  children: React.ReactNode
  speed: number
  className?: string
  zIndex?: number
}

export function ParallaxLayer({ children, speed, className = '', zIndex = 0 }: ParallaxLayerProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, speed * 100])
  
  return (
    <motion.div
      style={{ y, zIndex }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  once = true
}: ScrollRevealProps) {
  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 60 }
      case 'down':
        return { opacity: 0, y: -60 }
      case 'left':
        return { opacity: 0, x: 60 }
      case 'right':
        return { opacity: 0, x: -60 }
      case 'scale':
        return { opacity: 0, scale: 0.8 }
      case 'fade':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: 60 }
    }
  }

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      case 'scale':
        return { opacity: 1, scale: 1 }
      case 'fade':
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={getAnimateState()}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  amplitude?: number
  frequency?: number
  delay?: number
  className?: string
}

export function FloatingElement({ 
  children, 
  amplitude = 20,
  frequency = 2,
  delay = 0,
  className = ''
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: frequency,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface MouseParallaxProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MouseParallax({ children, strength = 0.1, className = '' }: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    ref.current.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
