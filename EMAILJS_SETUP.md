# EmailJS Setup for Contact Form

## Overview
The Help page contact form is configured to send emails to **Abdulatifsh90@gmail.com** using EmailJS service.

## Setup Instructions

### 1. EmailJS Account Setup
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

### 2. Create Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your email account
5. Note the **Service ID** (e.g., `service_uzchay_restaurant`)

### 3. Create Email Template
1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

Hello,

You have received a new message from your website contact form:

From: {{from_name}} ({{from_email}})
Message: {{message}}

Reply to: {{reply_to}}

Best regards,
uzchay Restaurant Website
```

4. Note the **Template ID** (e.g., `template_contact_form`)

### 4. Get Public Key
1. Go to **Account** in your EmailJS dashboard
2. Find your **Public Key** (e.g., `user_1234567890`)

### 5. Update Configuration
Edit `src/lib/emailConfig.ts` and replace:

```typescript
export const emailConfig = {
  SERVICE_ID: 'your_actual_service_id',     // From step 2
  TEMPLATE_ID: 'your_actual_template_id',   // From step 3  
  PUBLIC_KEY: 'your_actual_public_key',     // From step 4
  TO_EMAIL: 'Abdulatifsh90@gmail.com'       // Already set
};
```

## How It Works

1. User fills contact form on Help page
2. Form validates required fields
3. EmailJS sends email to Abdulatifsh90@gmail.com
4. Success alert shows confirmation
5. Form resets automatically

## Form Fields
- **Name**: User's name
- **Email**: User's email (for replies)
- **Message**: User's message content

## Email Content
The email will contain:
- Sender's name and email
- Message content
- Reply-to address for easy response

## Testing
1. Fill out the contact form
2. Check Abdulatifsh90@gmail.com inbox
3. Email should arrive within seconds

## Troubleshooting
- Check browser console for errors
- Verify EmailJS credentials are correct
- Ensure email service is connected
- Check EmailJS dashboard for failed sends