"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useLoading } from "@/contexts/loading-context"

export function LoadingScreen() {
  const { loadingProgress, isLoading, loadingStatus } = useLoading()
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  useEffect(() => {
    if (!isLoading && loadingProgress === 100) {
      // Add a small delay after everything is loaded for smooth transition
      const timer = setTimeout(() => {
        setShowLoadingScreen(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoading, loadingProgress])

  return (
    <AnimatePresence>
      {showLoadingScreen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-md mx-auto px-8">
            {/* Animated spinner */}
            <motion.div
              className="relative w-20 h-20 mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="absolute inset-0 border-4 border-neutral-700 rounded-full"
              />
              <motion.div
                className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 border-2 border-transparent border-t-cyan-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            {/* Portfolio title */}
            <motion.h1
              className="text-4xl lg:text-5xl font-light bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Ansh Deshwal
            </motion.h1>
            
            {/* Progress bar */}
            <motion.div
              className="w-full bg-neutral-800 rounded-full h-2 mb-4 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>
            
            {/* Progress percentage */}
            <motion.div
              className="text-2xl font-medium text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {loadingProgress}%
            </motion.div>
            
            {/* Loading status */}
            <motion.p
              className="text-neutral-400 text-sm min-h-[20px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              key={loadingStatus}
            >
              {loadingStatus}
            </motion.p>
            
            {/* Loading dots animation */}
            <motion.div
              className="flex justify-center gap-1 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
