"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { MessageCircle, Github, Linkedin, Mail, X } from "lucide-react"
import { useComponentLoader } from '@/hooks/use-component-loader'

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com",
    color: "hover:bg-neutral-700"
  },
  {
    name: "LinkedIn", 
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "hover:bg-blue-600"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:alex@example.com", 
    color: "hover:bg-green-600"
  }
]

export function FloatingActionButton() {
  useComponentLoader('floating-button')
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-12 h-12 bg-neutral-800 border border-neutral-700 rounded-full text-white transition-all duration-200 ${link.color}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-cursor="pointer"
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        data-cursor="pointer"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  )
}
