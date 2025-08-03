"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage?: number
  isHighPerformance: boolean
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    isHighPerformance: true
  })
  const [showMetrics, setShowMetrics] = useState(false)
  const frameTimeRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef(performance.now())
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const measurePerformance = () => {
      const currentTime = performance.now()
      const frameTime = currentTime - lastFrameTimeRef.current
      lastFrameTimeRef.current = currentTime

      // Track frame times
      frameTimeRef.current.push(frameTime)
      if (frameTimeRef.current.length > 60) {
        frameTimeRef.current.shift()
      }

      frameCount++

      // Calculate FPS every second
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length
        
        // Get memory usage if available
        let memoryUsage: number | undefined
        if ('memory' in performance) {
          const memory = (performance as any).memory
          memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024)
        }

        setMetrics({
          fps,
          frameTime: Math.round(avgFrameTime * 100) / 100,
          memoryUsage,
          isHighPerformance: fps > 50 && avgFrameTime < 20
        })

        frameCount = 0
        lastTime = currentTime
      }

      animationFrameRef.current = requestAnimationFrame(measurePerformance)
    }

    animationFrameRef.current = requestAnimationFrame(measurePerformance)

    // Show metrics in development mode
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev) {
      const toggleMetrics = (e: KeyboardEvent) => {
        if (e.key === 'p' && e.ctrlKey) {
          e.preventDefault()
          setShowMetrics(prev => !prev)
        }
      }
      
      window.addEventListener('keydown', toggleMetrics)
      
      return () => {
        window.removeEventListener('keydown', toggleMetrics)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Auto-adjust Three.js quality based on performance
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas && metrics.fps < 30) {
      // Reduce particle count or complexity
      canvas.style.setProperty('--performance-mode', 'low')
      console.warn('Performance degraded, consider reducing visual complexity')
    } else if (canvas) {
      canvas.style.setProperty('--performance-mode', 'high')
    }
  }, [metrics.fps])

  if (!showMetrics) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-full p-2 text-white/60 hover:text-white transition-colors"
          onClick={() => setShowMetrics(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Show Performance Metrics (Ctrl+P)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 18V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4 text-white font-mono text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white/90">Performance</h3>
          <button
            onClick={() => setShowMetrics(false)}
            className="text-white/60 hover:text-white transition-colors"
            title="Hide Metrics"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/70">FPS:</span>
            <span className={`font-bold ${metrics.fps > 50 ? 'text-green-400' : metrics.fps > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
              {metrics.fps}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/70">Frame Time:</span>
            <span className={`font-bold ${metrics.frameTime < 20 ? 'text-green-400' : metrics.frameTime < 33 ? 'text-yellow-400' : 'text-red-400'}`}>
              {metrics.frameTime}ms
            </span>
          </div>
          
          {metrics.memoryUsage !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-white/70">Memory:</span>
              <span className={`font-bold ${metrics.memoryUsage < 100 ? 'text-green-400' : metrics.memoryUsage < 200 ? 'text-yellow-400' : 'text-red-400'}`}>
                {metrics.memoryUsage}MB
              </span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-white/70">Quality:</span>
            <span className={`font-bold ${metrics.isHighPerformance ? 'text-green-400' : 'text-yellow-400'}`}>
              {metrics.isHighPerformance ? 'High' : 'Reduced'}
            </span>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t border-white/20">
          <div className="text-xs text-white/50">
            Press Ctrl+P to toggle
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
