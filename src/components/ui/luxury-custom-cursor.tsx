"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

export function LuxuryCustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Add event listeners for cursor elements
    const addCursorListeners = () => {
      // Hover elements
      const hoverElements = document.querySelectorAll('[data-cursor="pointer"]')
      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovered(true)
          setCursorVariant('hover')
          setCursorText('')
        })
        el.addEventListener('mouseleave', () => {
          setIsHovered(false)
          setCursorVariant('default')
          setCursorText('')
        })
      })

      // Text elements
      const textElements = document.querySelectorAll('[data-cursor="text"]')
      textElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setCursorVariant('text')
          setIsHovered(true)
        })
        el.addEventListener('mouseleave', () => {
          setCursorVariant('default')
          setIsHovered(false)
        })
      })

      // Magnetic elements
      const magneticElements = document.querySelectorAll('[data-cursor="magnetic"]')
      magneticElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setCursorVariant('magnetic')
          setIsHovered(true)
        })
        el.addEventListener('mouseleave', () => {
          setCursorVariant('default')
          setIsHovered(false)
        })
      })

      // View elements
      const viewElements = document.querySelectorAll('[data-cursor="view"]')
      viewElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setCursorVariant('view')
          setCursorText('View')
          setIsHovered(true)
        })
        el.addEventListener('mouseleave', () => {
          setCursorVariant('default')
          setCursorText('')
          setIsHovered(false)
        })
      })

      // Download elements
      const downloadElements = document.querySelectorAll('[data-cursor="download"]')
      downloadElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setCursorVariant('download')
          setCursorText('Download')
          setIsHovered(true)
        })
        el.addEventListener('mouseleave', () => {
          setCursorVariant('default')
          setCursorText('')
          setIsHovered(false)
        })
      })
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    // Add listeners after a short delay to ensure DOM is ready
    setTimeout(addCursorListeners, 100)
    
    // Re-add listeners when content changes
    const observer = new MutationObserver(addCursorListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  const cursorVariants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: 'rgba(79, 70, 229, 0.8)',
      border: '2px solid rgba(139, 92, 246, 0.6)',
      boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)',
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      border: '2px solid rgba(139, 92, 246, 0.8)',
      boxShadow: '0 0 30px rgba(79, 70, 229, 0.6)',
    },
    text: {
      width: 2,
      height: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: 'none',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
      borderRadius: '1px',
    },
    magnetic: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      border: '2px solid rgba(6, 182, 212, 0.6)',
      boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      border: '2px solid rgba(139, 92, 246, 0.6)',
      boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
    },
    download: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      border: '2px solid rgba(34, 197, 94, 0.6)',
      boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)',
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
            variants={cursorVariants}
            animate={cursorVariant}
            initial="default"
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 400,
              mass: 0.8,
            }}
          />

          {/* Cursor text */}
          <AnimatePresence>
            {cursorText && (
              <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] text-white text-sm font-medium"
                style={{
                  x: cursorXSpring,
                  y: cursorYSpring,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {cursorText}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trailing dots for enhanced effect */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] w-2 h-2 bg-blue-400 rounded-full opacity-60"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 200,
              mass: 0.6,
            }}
          />
          
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997] w-1 h-1 bg-purple-400 rounded-full opacity-40"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 150,
              mass: 0.8,
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
