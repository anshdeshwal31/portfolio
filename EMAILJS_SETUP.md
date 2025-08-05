# EmailJS Setup Guide for Portfolio Contact Form

This guide will help you set up EmailJS to enable the contact form functionality in your portfolio.

## Steps to Set Up EmailJS

### 1. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID** (you'll need this later)

### 3. Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New message from {{from_name}} - {{subject}}

Hi {{to_name}},

You have received a new message from your portfolio contact form:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply-to: {{reply_to}}
```

4. Save the template and note down the **Template ID**

### 4. Get Your Public Key

1. Go to "Account" > "General"
2. Find your **Public Key** in the API Keys section

### 5. Update Environment Variables

1. Open your `.env.local` file
2. Replace the placeholder values with your actual EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### 6. Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the test message

## Template Variables Used

The contact form sends these variables to your EmailJS template:

- `{{from_name}}` - The sender's name
- `{{from_email}}` - The sender's email address
- `{{subject}}` - The message subject
- `{{message}}` - The message content
- `{{to_name}}` - Your name (set to "Ansh Deshwal")
- `{{reply_to}}` - The sender's email (for easy replies)

## Rate Limits

EmailJS free plan includes:

- 200 emails per month
- EmailJS branding in emails

For higher volumes, consider upgrading to a paid plan.

## Troubleshooting

### Common Issues:

1. **"Email service not configured" error**

   - Check that all environment variables are set correctly
   - Ensure the service ID matches your EmailJS service

2. **"Network error" message**

   - Check your internet connection
   - Verify EmailJS service is active

3. **Emails not arriving**
   - Check spam/junk folders
   - Verify your EmailJS template is active
   - Test with different email addresses

### Additional Security

For production, consider:

1. Adding reCAPTCHA to prevent spam
2. Rate limiting form submissions
3. Server-side validation (if you add a backend)

## Alternative Email Services

If you prefer not to use EmailJS, you can also implement:

- Formspree
- Netlify Forms
- Your own backend API with Nodemailer
- SendGrid API

Just replace the `sendContactEmail` function in `src/lib/email.ts` with your preferred service's implementation.
