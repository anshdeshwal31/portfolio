"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorPosition {
  x: number
  y: number
}

interface InteractiveElement {
  type: 'button' | 'link' | 'interactive' | 'canvas'
  element: HTMLElement
  position: { x: number, y: number, width: number, height: number }
}

export function AdvancedCustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverType, setHoverType] = useState<string>('')
  const [cursorVariant, setCursorVariant] = useState('default')
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [interactiveElements, setInteractiveElements] = useState<InteractiveElement[]>([])
  
  const cursorSize = useMotionValue(16)
  const cursorOpacity = useMotionValue(0.6)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Smooth spring animations
  const springX = useSpring(cursorX, { stiffness: 400, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 400, damping: 30 })
  const springSize = useSpring(cursorSize, { stiffness: 300, damping: 25 })
  const springOpacity = useSpring(cursorOpacity, { stiffness: 200, damping: 20 })
  
  const lastPosition = useRef({ x: 0, y: 0 })
  const velocityTracker = useRef<number[]>([])

  // Track mouse movement and calculate velocity
  useEffect(() => {
    let animationFrame: number | undefined
    
    const updateCursor = (e: MouseEvent) => {
      const newX = e.clientX
      const newY = e.clientY
      
      // Calculate velocity
      const deltaX = newX - lastPosition.current.x
      const deltaY = newY - lastPosition.current.y
      const currentVelocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      // Track velocity history for smoothing
      velocityTracker.current.push(currentVelocity)
      if (velocityTracker.current.length > 5) {
        velocityTracker.current.shift()
      }
      
      const avgVelocity = velocityTracker.current.reduce((a, b) => a + b, 0) / velocityTracker.current.length
      setVelocity({ x: deltaX, y: deltaY })
      
      // Update cursor position
      cursorX.set(newX)
      cursorY.set(newY)
      
      // Dynamic size based on velocity
      const velocitySize = Math.min(40, 16 + avgVelocity * 0.5)
      cursorSize.set(velocitySize)
      
      lastPosition.current = { x: newX, y: newY }
      
      // Check for nearby interactive elements
      checkInteractiveElements(newX, newY)
    }
    
    const handleMouseEnter = () => {
      setIsVisible(true)
      cursorOpacity.set(0.8)
    }
    
    const handleMouseLeave = () => {
      setIsVisible(false)
      cursorOpacity.set(0)
    }
    
    // Find interactive elements
    const findInteractiveElements = () => {
      const elements = document.querySelectorAll(
        'a, button, [role="button"], [data-cursor], canvas, .cursor-interactive, input, textarea, select'
      )
      
      const interactive: InteractiveElement[] = Array.from(elements).map(el => {
        const rect = el.getBoundingClientRect()
        let type: InteractiveElement['type'] = 'interactive'
        
        if (el.tagName === 'A') type = 'link'
        else if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') type = 'button'
        else if (el.tagName === 'CANVAS') type = 'canvas'
        
        return {
          type,
          element: el as HTMLElement,
          position: { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
        }
      })
      
      setInteractiveElements(interactive)
    }
    
    // Check if cursor is near interactive elements
    const checkInteractiveElements = (x: number, y: number) => {
      let isNearInteractive = false
      let nearestType = ''
      
      interactiveElements.forEach(({ type, position }) => {
        const distance = Math.sqrt(
          Math.pow(x - (position.x + position.width / 2), 2) +
          Math.pow(y - (position.y + position.height / 2), 2)
        )
        
        const threshold = Math.max(position.width, position.height) / 2 + 20
        
        if (distance < threshold) {
          isNearInteractive = true
          nearestType = type
        }
      })
      
      setIsHovering(isNearInteractive)
      setHoverType(nearestType)
      
      // Update cursor variant based on interaction
      if (isNearInteractive) {
        setCursorVariant(nearestType)
        cursorSize.set(nearestType === 'canvas' ? 8 : 24)
        cursorOpacity.set(nearestType === 'canvas' ? 0.3 : 1)
      } else {
        setCursorVariant('default')
      }
    }
    
    // Initial setup
    findInteractiveElements()
    
    // Event listeners
    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Update interactive elements on resize
    window.addEventListener('resize', findInteractiveElements)
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', findInteractiveElements)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [cursorX, cursorY, cursorSize, cursorOpacity, interactiveElements])

  // Cursor variants with different styles
  const getCursorStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      pointerEvents: 'none' as const,
      zIndex: 9999,
      mixBlendMode: 'difference' as const,
    }
    
    switch (cursorVariant) {
      case 'button':
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.5)',
        }
      case 'link':
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, #06b6d4, #0ea5e9)',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.3)',
        }
      case 'canvas':
        return {
          ...baseStyles,
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.6), transparent)',
          borderRadius: '50%',
          border: '1px solid rgba(79, 70, 229, 0.8)',
        }
      default:
        return {
          ...baseStyles,
          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        style={{
          ...getCursorStyles(),
          x: springX,
          y: springY,
          width: springSize,
          height: springSize,
          opacity: springOpacity,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 }
        }}
      />
      
      {/* Trailing particles */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          x: springX,
          y: springY,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              background: `hsl(${240 + i * 30}, 70%, 60%)`,
              borderRadius: '50%',
              opacity: 0.6 - i * 0.2,
            }}
            animate={{
              x: -velocity.x * (i + 1) * 0.5,
              y: -velocity.y * (i + 1) * 0.5,
              scale: [1, 0.8, 1],
            }}
            transition={{
              x: { type: 'spring', stiffness: 100, damping: 10 },
              y: { type: 'spring', stiffness: 100, damping: 10 },
              scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        ))}
      </motion.div>
      
      {/* Interactive feedback ring */}
      {isHovering && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 9997,
            x: springX,
            y: springY,
            transform: 'translate(-50%, -50%)',
            width: 60,
            height: 60,
            border: '2px solid rgba(79, 70, 229, 0.4)',
            borderRadius: '50%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.4, 0.8],
            rotate: [0, 180, 360]
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' }
          }}
        />
      )}
    </>
  )
}
