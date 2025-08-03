"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  offset?: number
}

export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  offset = 0
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Create smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Calculate transform values based on direction
  const getTransform = () => {
    const baseValue = speed * 100
    switch (direction) {
      case 'up':
        return useTransform(smoothProgress, [0, 1], [offset, -baseValue + offset])
      case 'down':
        return useTransform(smoothProgress, [0, 1], [offset, baseValue + offset])
      case 'left':
        return useTransform(smoothProgress, [0, 1], [offset, -baseValue + offset])
      case 'right':
        return useTransform(smoothProgress, [0, 1], [offset, baseValue + offset])
      default:
        return useTransform(smoothProgress, [0, 1], [offset, -baseValue + offset])
    }
  }

  const transform = getTransform()

  const style = direction === 'left' || direction === 'right' 
    ? { x: transform }
    : { y: transform }

  return (
    <div ref={ref} className={className}>
      <motion.div style={style}>
        {children}
      </motion.div>
    </div>
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
  amplitude = 10, 
  frequency = 2,
  delay = 0,
  className = ''
}: FloatingElementProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, amplitude, 0],
        x: [0, amplitude * 0.5, 0],
        rotate: [0, 5, 0]
      }}
      transition={{
        duration: frequency,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      style={{
        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
      }}
    >
      {children}
    </motion.div>
  )
}

interface ScrollTriggeredElementProps {
  children: React.ReactNode
  threshold?: number
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'
  delay?: number
  duration?: number
}

export function ScrollTriggeredElement({
  children,
  threshold = 0.1,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 1
}: ScrollTriggeredElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  const getAnimationVariants = () => {
    switch (animation) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        }
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        }
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        }
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -10, scale: 0.9 },
          visible: { opacity: 1, rotate: 0, scale: 1 }
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        transition={{ 
          duration, 
          delay,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface InteractiveBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function InteractiveBackground({ children, className = '' }: InteractiveBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const backgroundX = useTransform(scrollY, [0, 1000], [0, -100])
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -50])

  return (
    <motion.div 
      className={`relative ${className}`}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)`,
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          x: backgroundX,
          y: backgroundY,
          background: 'linear-gradient(45deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)'
        }}
      />
      {children}
    </motion.div>
  )
}
