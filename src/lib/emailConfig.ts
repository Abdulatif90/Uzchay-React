// EmailJS Configuration
// To use this, you need to:
// 1. Sign up at https://www.emailjs.com/
// 2. Create a service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your public key from EmailJS dashboard

export const emailConfig = {
  // Replace these with your actual EmailJS credentials
  SERVICE_ID: 'service_burak_restaurant', // Your EmailJS service ID
  TEMPLATE_ID: 'template_contact_form',   // Your EmailJS template ID  
  PUBLIC_KEY: 'your_emailjs_public_key', // Your EmailJS public key
  TO_EMAIL: 'Abdulatifsh90@gmail.com'    // Destination email address
};

// Example EmailJS template variables:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{message}} - Message content
// {{to_email}} - Destination email
// {{reply_to}} - Reply-to email

/*
Sample EmailJS Template:
Subject: New Contact Form Message from {{from_name}}

Hello,

You have received a new message from your website contact form:

From: {{from_name}} ({{from_email}})
Message: {{message}}

Reply to: {{reply_to}}

Best regards,
Burak Restaurant Website
*/