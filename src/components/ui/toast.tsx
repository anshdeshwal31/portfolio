"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import { useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'warning'

export interface ToastProps {
  type: ToastType
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ type, message, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default:
        return null
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10'
      case 'error':
        return 'border-red-500/30 bg-red-500/10'
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10'
      default:
        return 'border-white/30 bg-white/10'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50 max-w-md"
          initial={{ opacity: 0, y: -50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -50, x: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className={`backdrop-blur-xl border rounded-xl p-4 ${getStyles()}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm leading-relaxed">
                  {message}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Progress bar */}
            {duration > 0 && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-b-xl"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
