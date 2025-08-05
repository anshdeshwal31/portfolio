import emailjs from '@emailjs/browser'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
}

// Initialize EmailJS
const initEmailJS = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  if (publicKey) {
    emailjs.init(publicKey)
  }
}

// Send email using EmailJS
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    // Initialize EmailJS if not already done
    initEmailJS()

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

    if (!serviceId || !templateId) {
      throw new Error('EmailJS configuration is missing. Please check your environment variables.')
    }

    // Template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Ansh Deshwal',
      reply_to: formData.email,
    }

    const response = await emailjs.send(serviceId, templateId, templateParams)

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
      }
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Email sending error:', error)
    
    let errorMessage = 'Sorry, there was an error sending your message. Please try again or contact me directly.'
    
    if (error instanceof Error) {
      if (error.message.includes('configuration')) {
        errorMessage = 'Email service is not configured. Please contact me directly via email or social media.'
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.'
      }
    }

    return {
      success: false,
      message: errorMessage
    }
  }
}

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate form data
export const validateContactForm = (formData: ContactFormData): string[] => {
  const errors: string[] = []

  if (!formData.name.trim()) {
    errors.push('Name is required')
  }

  if (!formData.email.trim()) {
    errors.push('Email is required')
  } else if (!validateEmail(formData.email)) {
    errors.push('Please enter a valid email address')
  }

  if (!formData.subject.trim()) {
    errors.push('Subject is required')
  }

  if (!formData.message.trim()) {
    errors.push('Message is required')
  } else if (formData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  return errors
}
