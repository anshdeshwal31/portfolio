"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  hoverType: 'default' | 'button' | 'link' | 'text' | 'image'
  isClicking: boolean
}

export function EnhancedCustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    hoverType: 'default',
    isClicking: false
  })

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursor(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }))
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.closest('button')) {
        setCursor(prev => ({ ...prev, isHovering: true, hoverType: 'button' }))
      } else if (target.closest('a')) {
        setCursor(prev => ({ ...prev, isHovering: true, hoverType: 'link' }))
      } else if (target.closest('img, [data-cursor="image"]')) {
        setCursor(prev => ({ ...prev, isHovering: true, hoverType: 'image' }))
      } else if (target.closest('p, h1, h2, h3, h4, h5, h6, span, [data-cursor="text"]')) {
        setCursor(prev => ({ ...prev, isHovering: true, hoverType: 'text' }))
      } else if (target.closest('[data-cursor="pointer"]')) {
        setCursor(prev => ({ ...prev, isHovering: true, hoverType: 'button' }))
      } else {
        setCursor(prev => ({ ...prev, isHovering: false, hoverType: 'default' }))
      }
    }

    const handleMouseDown = () => {
      setCursor(prev => ({ ...prev, isClicking: true }))
    }

    const handleMouseUp = () => {
      setCursor(prev => ({ ...prev, isClicking: false }))
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const getCursorVariants = () => {
    const baseVariants = {
      x: cursor.x - 16,
      y: cursor.y - 16,
    }

    switch (cursor.hoverType) {
      case 'button':
        return {
          ...baseVariants,
          scale: cursor.isClicking ? 0.8 : 1.5,
          backgroundColor: cursor.isClicking ? '#3b82f6' : 'transparent',
          borderColor: '#3b82f6',
          borderWidth: 2,
        }
      case 'link':
        return {
          ...baseVariants,
          scale: cursor.isClicking ? 0.8 : 1.2,
          backgroundColor: 'transparent',
          borderColor: '#8b5cf6',
          borderWidth: 2,
        }
      case 'text':
        return {
          ...baseVariants,
          scale: 0.8,
          backgroundColor: 'transparent',
          borderColor: '#06b6d4',
          borderWidth: 1,
        }
      case 'image':
        return {
          ...baseVariants,
          scale: cursor.isClicking ? 1.5 : 2,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3b82f6',
          borderWidth: 2,
        }
      default:
        return {
          ...baseVariants,
          scale: cursor.isClicking ? 0.8 : 1,
          backgroundColor: 'transparent',
          borderColor: '#ffffff',
          borderWidth: 1,
        }
    }
  }

  const getInnerCursorVariants = () => {
    return {
      x: cursor.x - 4,
      y: cursor.y - 4,
      scale: cursor.isClicking ? 1.5 : cursor.isHovering ? 0.5 : 1,
      backgroundColor: cursor.isHovering ? '#3b82f6' : '#ffffff',
    }
  }

  const getDotVariants = () => {
    return {
      x: cursor.x - 2,
      y: cursor.y - 2,
      scale: cursor.isClicking ? 2 : 1,
      opacity: cursor.isHovering ? 0.8 : 1,
    }
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={getCursorVariants()}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          restDelta: 0.001,
        }}
        style={{
          borderStyle: 'solid',
        }}
      />

      {/* Inner cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={getDotVariants()}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          restDelta: 0.001,
        }}
        style={{
          backgroundColor: '#ffffff',
        }}
      />

      {/* Cursor trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-40"
        animate={{
          x: cursor.x - 12,
          y: cursor.y - 12,
          scale: cursor.isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          restDelta: 0.001,
        }}
        style={{
          background: cursor.isHovering 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Ripple effect on click */}
      {cursor.isClicking && (
        <motion.div
          className="fixed top-0 left-0 w-16 h-16 border border-blue-500 rounded-full pointer-events-none z-40"
          initial={{
            x: cursor.x - 32,
            y: cursor.y - 32,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: 2,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      )}
    </>
  )
}
