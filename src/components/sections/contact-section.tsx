"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone, ArrowUpRight } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com",
    color: "hover:text-white"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "hover:text-blue-400"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "hover:text-blue-400"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:ansh.deshwal@example.com",
    color: "hover:text-white"
  }
]

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "India"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 XXXXX XXXXX"
  },
  {
    icon: Mail,
    label: "Email",
    value: "ansh.deshwal@example.com"
  }
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section id="contact" className="relative py-32 px-6 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 font-medium backdrop-blur-sm">
              Get In Touch
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            Let's{" "}
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent font-extralight italic">
              Connect
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            Ready to bring your ideas to life? Let's discuss how we can create something extraordinary together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl" />
              
              <div className="relative p-12 border border-white/10 rounded-3xl backdrop-blur-sm">
                <h3 className="text-3xl font-light text-white mb-8">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-white/70 mb-3">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Your name"
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-white/70 mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all duration-300 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-white/70 mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Project collaboration"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-white/70 mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all duration-300 resize-none backdrop-blur-sm"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full px-8 py-5 bg-white text-black rounded-2xl font-medium text-lg hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    data-cursor="pointer"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-5 space-y-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-light text-white">Get in Touch</h3>
              <p className="text-white/60 leading-relaxed text-lg font-light">
                I'm always open to discussing new opportunities, creative projects, 
                and potential collaborations. Let's create something amazing together.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="group flex items-center gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/70 group-hover:bg-white/8 group-hover:border-white/20 group-hover:text-white transition-all duration-300 backdrop-blur-sm">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{item.label}</p>
                    <p className="text-white font-medium text-lg">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 space-y-6">
              <h4 className="text-xl font-light text-white">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 ${social.color} transition-all duration-300 hover:bg-white/8 hover:border-white/20 backdrop-blur-sm`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    data-cursor="pointer"
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              className="mt-16 p-8 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-light text-white mb-6">Available for</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white/70 font-light">Freelance Projects</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white/70 font-light">Full-time Opportunities</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white/70 font-light">Technical Consulting</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
