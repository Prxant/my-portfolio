import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Prxant', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/prashant-verma-3b27b428b/', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:pbxshant2004@gmail.com', label: 'Email' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="footer footer-center p-10 bg-base-200 text-base-content rounded-t-xl"
    >
      <nav className="grid grid-flow-col gap-4">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={link.label}
          >
            <link.icon className="w-6 h-6" />
          </motion.a>
        ))}
      </nav>
      
      {/* Responsive aside: stacks vertically on mobile, horizontal on small screens up */}
      <aside className="flex flex-col sm:flex-row items-center gap-2 text-center">
        <p>© 2025 Portfolio. Made with</p>
        <FiHeart className="w-4 h-4 text-red-500" />
        <p>using React & Tailwind CSS</p>
      </aside>
    </motion.footer>
  );
};

export default Footer;