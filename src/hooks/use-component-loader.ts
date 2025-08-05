"use client"

import { useEffect, useRef } from 'react'
import { useLoading } from '@/contexts/loading-context'

export function useComponentLoader(componentId: string, additionalDeps: any[] = []) {
  const { registerComponent, markComponentLoaded } = useLoading()
  const hasLoaded = useRef(false)

  useEffect(() => {
    // Register component on mount
    registerComponent(componentId)
  }, [componentId, registerComponent])

  useEffect(() => {
    // Mark as loaded when component and dependencies are ready
    if (!hasLoaded.current) {
      // Simplified loading delays - shorter to avoid getting stuck
      let loadingDelay = 500 // Default 0.5 seconds
      
      if (componentId.includes('hero')) {
        loadingDelay = 1500 // 1.5 seconds for hero section
      } else if (componentId.includes('skills')) {
        loadingDelay = 1200 // 1.2 seconds for skills section
      } else if (componentId.includes('projects')) {
        loadingDelay = 1000 // 1 second for projects section
      } else if (componentId.includes('contact')) {
        loadingDelay = 1000 // 1 second for contact section
      }

      const timer = setTimeout(() => {
        markComponentLoaded(componentId)
        hasLoaded.current = true
      }, loadingDelay)

      return () => clearTimeout(timer)
    }
  }, [componentId, markComponentLoaded, ...additionalDeps])

  return {
    markLoaded: () => {
      if (!hasLoaded.current) {
        markComponentLoaded(componentId)
        hasLoaded.current = true
      }
    }
  }
}
