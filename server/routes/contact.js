// server/routes/contact.js

const express = require('express');
const Resend = require('resend').Resend;
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form rate limiting
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact form submissions per hour
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  }
});

// Email addresses
const senderEmail = 'onboarding@resend.dev'; // Use a Resend-verified email
const recipientEmail = process.env.RECIPIENT_EMAIL;

// Contact form submission
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation (as you already had it)
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    // ... (rest of your validation code from before)

    // Send email to you (notification)
    await resend.emails.send({
      from: `Portfolio <${senderEmail}>`,
      to: recipientEmail,
      subject: `New Contact: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    // Send auto-reply email to sender
    await resend.emails.send({
      from: `Your Name <${senderEmail}>`,
      to: email, // Reply to the sender's email
      subject: `Thank you for contacting me, ${name}!`,
      html: `
        <p>Thank you for reaching out! I have received your message and will get back to you shortly.</p>
        <p>Your original message was: <strong>${message}</strong></p>
      `
    });

    res.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

module.exports = router;