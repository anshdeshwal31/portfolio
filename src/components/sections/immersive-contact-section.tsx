"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from 'react'
import { Mail, MessageCircle, Send, MapPin, Phone } from 'lucide-react'
import dynamic from 'next/dynamic'
import { sendContactEmail, validateContactForm, type ContactFormData } from '@/lib/email'
import { Toast, type ToastType } from '@/components/ui/toast'
import { useComponentLoader } from '@/hooks/use-component-loader'

const EtherealEnergyBackground = dynamic(() => import("../three/enhanced-ethereal-background").then(mod => ({ default: mod.EtherealEnergyBackground })), { 
  ssr: false 
})

export function ImmersiveContactSection() {
  useComponentLoader('contact-section')
  
  const sectionRef = useRef(null)
  const [, setMouse] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [toast, setToast] = useState<{
    isVisible: boolean
    type: ToastType
    message: string
  }>({
    isVisible: false,
    type: 'success',
    message: ''
  })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMouse({
      x: (event.clientX - rect.left) / rect.width * 2 - 1,
      y: -(event.clientY - rect.top) / rect.height * 2 + 1
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const showToast = (type: ToastType, message: string) => {
    setToast({
      isVisible: true,
      type,
      message
    })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateContactForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      showToast('error', validationErrors[0])
      return
    }

    setIsSubmitting(true)
    setErrors([])

    try {
      const result = await sendContactEmail(formData)
      
      if (result.success) {
        showToast('success', result.message)
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        showToast('error', result.message)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      showToast('error', 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "anshdeshwal1234@gmail.com", 
      action: "mailto:anshdeshwal1234@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9627660757",
      action: "tel:+919627660757", 
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Punjab,India",
      action: "#",
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-black py-32 overflow-hidden flex flex-col items-center  justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background like skills section - stars with white wireframe asteroid */}
      <div className="absolute inset-0">
        <motion.div 
          className="w-full h-full"
          style={{ y: y }}
        >
          <EtherealEnergyBackground section="contact" className="w-full h-full" />
        </motion.div>
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 flex flex-col gap-10 items-center"
        style={{ y }}
      >
        {/* Section header - centered and properly spaced */}
        <motion.div
          className="text-center mb-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl lg:text-6xl font-light text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let&apos;s Create{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Together
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to transform your vision into reality? Let&apos;s start a conversation 
            and explore the possibilities together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Contact form - improved spacing and alignment */}
          <motion.div
            className="order-2 lg:order-1 h-full flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl h-full flex flex-col justify-between" style={{padding:"32px 16px", margin:"0px 25px"}}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
                <h3 className="text-2xl text-center lg:text-3xl font-semibold text-white mb-2">Send a Message</h3>
                <div className="grid sm:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-white mb-3 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        errors.some(error => error.toLowerCase().includes('name'))
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-white/20 focus:border-blue-500'
                      }`}
                      placeholder="Your name"
                      data-cursor="text"
                      required
                      style={{padding:"3px 7px"}}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-white mb-3 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        errors.some(error => error.toLowerCase().includes('email'))
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-white/20 focus:border-blue-500'
                      }`}
                      placeholder="your.email@example.com"
                      data-cursor="text"
                      required
                      style={{padding:"3px 7px"}}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-white mb-3 font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      errors.some(error => error.toLowerCase().includes('subject'))
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-white/20 focus:border-blue-500'
                    }`}
                    placeholder="Project collaboration"
                    data-cursor="text"
                    required
                    style={{padding:"3px 7px"}}

                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-white mb-3 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none ${
                      errors.some(error => error.toLowerCase().includes('message'))
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-white/20 focus:border-blue-500'
                    }`}
                    placeholder="Tell me about your project..."
                    data-cursor="text"
                    required
                    style={{padding:"3px 7px"}}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold py-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:shadow-2xl hover:shadow-blue-500/25'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  data-cursor="pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact methods */}
          <motion.div
            className="order-1 mx-2 lg:order-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-10 flex flex-col gap-8 h-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            style={{padding:"26px 16px", margin:"0px 25px"}}
          >
            <div className="mb-10">
              <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-6">Get in Touch</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Choose your preferred way to connect. I&apos;m always excited to discuss 
                new opportunities and innovative projects.
              </p>
            </div>

            <div className="space-y-6 mb-10 flex flex-col gap-7">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.action}
                  className="group block p-6 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-current/25 transition-all duration-300`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{method.label}</h4>
                      <p className="text-gray-400">{method.value}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick message */}
            <motion.div
              className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              style={{padding:"4px 8px"}}
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <h4 className="text-white font-semibold">Quick Response</h4>
              </div>
              <p className="text-gray-300 text-sm">
                I typically respond within 24 hours. For urgent matters, 
                feel free to reach out directly via phone or LinkedIn.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Toast Notification */}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </section>
  )
}
