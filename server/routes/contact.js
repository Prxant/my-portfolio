const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Contact form rate limiting
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact form submissions per hour
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  }
});

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Contact form submission
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters'
      });
    }

    if (subject.length < 5 || subject.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Subject must be between 5 and 200 characters'
      });
    }

    if (message.length < 10 || message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 10 and 2000 characters'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email to you (notification)
    const notificationEmail = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #0066cc;">
              Reply directly to this email to respond to ${name} at ${email}
            </p>
          </div>
        </div>
      `
    };

    // Auto-reply email to sender
    const autoReplyEmail = {
      from: `"John Doe - Portfolio" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting me, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting me through my portfolio website. I've received your message about "<strong>${subject}</strong>" and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>I typically respond within 24-48 hours. In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/projects">recent projects</a></li>
            <li>Follow me on <a href="https://github.com/yourusername">GitHub</a></li>
            <li>Connect with me on <a href="https://linkedin.com/in/yourprofile">LinkedIn</a></li>
          </ul>
          
          <p>Best regards,<br>John Doe</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e7f3ff; border-radius: 8px; font-size: 14px;">
            <p style="margin: 0;">This is an automated response. Please don't reply to this email.</p>
          </div>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(notificationEmail);
    await transporter.sendMail(autoReplyEmail);

    res.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Test email configuration
router.get('/test', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ message: 'Not found' });
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();
    
    res.json({
      success: true,
      message: 'Email configuration is working correctly'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Email configuration error',
      error: error.message
    });
  }
});

module.exports = router;