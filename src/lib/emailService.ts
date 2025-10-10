// Email Service for Contact Form
// This file provides email functionality for the contact form

import emailjs from '@emailjs/browser';
import { emailConfig } from './emailConfig';

export const sendContactEmail = async (formData: {
  memberNick: string;
  memberEmail: string;
  memberMsg: string;
}) => {
  try {
    // Check if EmailJS is configured
    if (!emailConfig.SERVICE_ID || emailConfig.SERVICE_ID === 'service_uzchay_restaurant' ||
        !emailConfig.TEMPLATE_ID || emailConfig.TEMPLATE_ID === 'template_contact_form' ||
        !emailConfig.PUBLIC_KEY || emailConfig.PUBLIC_KEY === 'your_emailjs_public_key') {
      
      // EmailJS not configured yet, just log the data
      console.log('EmailJS not configured. Contact form data:', formData);
      console.log('Email would be sent to:', emailConfig.TO_EMAIL);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Message logged (EmailJS not configured)' };
    }

    // EmailJS is configured, send real email
    const templateParams = {
      from_name: formData.memberNick,
      from_email: formData.memberEmail,
      message: formData.memberMsg,
      to_email: emailConfig.TO_EMAIL,
      reply_to: formData.memberEmail,
    };

    await emailjs.send(
      emailConfig.SERVICE_ID,
      emailConfig.TEMPLATE_ID,
      templateParams,
      emailConfig.PUBLIC_KEY
    );

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};