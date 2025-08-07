import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    type: 'idle',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      // Replace with your actual backend URL
      const response = await axios.post('/api/contact', formData);
      
      if (response.data.success) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact me directly.'
      });
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email',
      value: 'pbxshant2004@gmail.com',
      link: 'mailto:pbxshant2004@gmail.com'
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      value: '7906843716',
      link: 'tel:+15551234567'
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Lucknow, India',
      link: 'http://google.com/maps/place/Babu+Banarasi+Das+University/@26.8887317,81.0564255,739m/data=!3m2!1e3!4b1!4m6!3m5!1s0x399be209f58895a1:0x8328acaa3eddd4f!8m2!3d26.8887269!4d81.0590004!16s%2Fm%2F03crm8n?entry=ttu&g_ep=EgoyMDI1MDcyOC4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Have a project in mind or just want to chat about technology? 
            I'd love to hear from you. Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-base-content/70 mb-8">
                I'm always open to discussing new opportunities, interesting projects, 
                or potential collaborations. Whether you're a startup looking for a developer 
                or an established company needing technical expertise, let's talk!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">{info.title}</h3>
                    <p className="text-base-content/70">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl"
            >
              <h3 className="text-xl font-bold mb-2">Current Availability</h3>
              <p className="text-base-content/70">
                I'm currently <span className="text-success font-semibold">available</span> for new projects 
                and consulting opportunities. Typical response time is within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="input input-bordered w-full focus:input-primary"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="input input-bordered w-full focus:input-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Subject</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="input input-bordered w-full focus:input-primary"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Message</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or question..."
                      className="textarea textarea-bordered h-32 w-full focus:textarea-primary resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Status Message */}
                  {status.type !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`alert ${
                        status.type === 'success' ? 'alert-success' : 
                        status.type === 'error' ? 'alert-error' : 'alert-info'
                      }`}
                    >
                      {status.type === 'success' && <FiCheck className="w-5 h-5" />}
                      {status.type === 'error' && <FiAlertCircle className="w-5 h-5" />}
                      <span>{status.message}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status.type === 'loading'}
                    className="btn btn-primary w-full"
                  >
                    {status.type === 'loading' ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;