"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface LoadingContextType {
  loadingProgress: number
  isLoading: boolean
  registerComponent: (id: string) => void
  markComponentLoaded: (id: string) => void
  loadingStatus: string
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [componentStates, setComponentStates] = useState<Record<string, boolean>>({})
  const [registeredComponents, setRegisteredComponents] = useState<Set<string>>(new Set())
  const [loadingStatus, setLoadingStatus] = useState('Initializing portfolio...')
  const [minLoadingTime] = useState(2000) // Minimum 2 seconds loading time
  const [startTime] = useState(Date.now())

  const registerComponent = useCallback((id: string) => {
    setRegisteredComponents(prev => new Set(prev).add(id))
    setComponentStates(prev => ({ ...prev, [id]: false }))
    
    // Update status when registering
    const registerMessages: Record<string, string> = {
      'hero-section': 'Preparing ethereal energy background...',
      'skills-section': 'Setting up interactive skills visualization...',
      'projects-section': 'Initializing holographic project displays...',
      'contact-section': 'Building immersive contact environment...',
      'navigation': 'Configuring navigation system...',
      'cursor': 'Loading enhanced cursor...',
      'scroll-progress': 'Setting up scroll progress...',
      'floating-button': 'Preparing floating action button...',
      'performance-monitor': 'Initializing performance monitor...'
    }
    
    setLoadingStatus(registerMessages[id] || `Preparing ${id}...`)
  }, [])

  const markComponentLoaded = useCallback((id: string) => {
    setComponentStates(prev => ({ ...prev, [id]: true }))
    
    // Update loading status based on component
    const statusMessages: Record<string, string> = {
      'hero-section': 'Ethereal energy background loaded ✨',
      'skills-section': 'Interactive skills visualization ready 🚀',
      'projects-section': 'Holographic project displays online 💫',
      'contact-section': 'Immersive contact environment ready 📧',
      'navigation': 'Navigation system loaded 🧭',
      'cursor': 'Enhanced cursor activated 🎯',
      'scroll-progress': 'Scroll progress indicator ready 📊',
      'floating-button': 'Floating action button loaded 🔄',
      'performance-monitor': 'Performance monitor initialized ⚡'
    }
    
    setLoadingStatus(statusMessages[id] || `${id} loaded ✅`)
  }, [])

  const loadingProgress = React.useMemo(() => {
    const total = registeredComponents.size
    if (total === 0) return 0
    
    const loaded = Object.values(componentStates).filter(Boolean).length
    const componentProgress = Math.round((loaded / total) * 85) // Components account for 85%
    
    // Time-based progress for the remaining 15%
    const elapsedTime = Date.now() - startTime
    const timeProgress = Math.min(15, Math.round((elapsedTime / minLoadingTime) * 15))
    
    const totalProgress = componentProgress + timeProgress
    
    // Debug log to see what's happening
    console.log('Loading Debug:', {
      total,
      loaded,
      componentProgress,
      timeProgress,
      totalProgress,
      registeredComponents: Array.from(registeredComponents),
      componentStates
    })
    
    return Math.min(100, totalProgress)
  }, [componentStates, registeredComponents.size, startTime, minLoadingTime])

  const isLoading = React.useMemo(() => {
    if (registeredComponents.size === 0) return true
    
    const allComponentsLoaded = !Object.values(componentStates).some(loaded => !loaded)
    const minTimeElapsed = (Date.now() - startTime) >= minLoadingTime
    
    // Also check if we've been loading for too long (fail-safe)
    const maxLoadingTime = 10000 // 10 seconds max
    const maxTimeElapsed = (Date.now() - startTime) >= maxLoadingTime
    
    const shouldFinishLoading = (allComponentsLoaded && minTimeElapsed) || maxTimeElapsed
    
    console.log('Loading State:', {
      allComponentsLoaded,
      minTimeElapsed,
      maxTimeElapsed,
      shouldFinishLoading,
      registeredCount: registeredComponents.size,
      loadedCount: Object.values(componentStates).filter(Boolean).length
    })
    
    return !shouldFinishLoading
  }, [componentStates, registeredComponents.size, startTime, minLoadingTime])

  // Update status when fully loaded
  useEffect(() => {
    if (!isLoading && registeredComponents.size > 0) {
      setLoadingStatus('🎉 Portfolio ready! Welcome to the experience.')
    }
  }, [isLoading, registeredComponents.size])

  // Failsafe: Force completion after 8 seconds regardless
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      console.log('Failsafe activated: Forcing loading completion')
      setLoadingStatus('🎉 Portfolio ready! Welcome to the experience.')
      // Mark all registered components as loaded
      setComponentStates(prev => {
        const newStates = { ...prev }
        registeredComponents.forEach(id => {
          newStates[id] = true
        })
        return newStates
      })
    }, 8000) // 8 seconds failsafe

    return () => clearTimeout(failsafeTimer)
  }, [registeredComponents])

  return (
    <LoadingContext.Provider value={{
      loadingProgress,
      isLoading,
      registerComponent,
      markComponentLoaded,
      loadingStatus
    }}>
      {children}
    </LoadingContext.Provider>
  )
}
