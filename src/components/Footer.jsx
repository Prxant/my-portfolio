import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={link.label}
          >
            <link.icon className="w-6 h-6" />
          </motion.a>
        ))}
      </nav>
      
      <aside className="flex items-center gap-2">
        <p>© 2025 Portfolio. Made with</p>
        <FiHeart className="w-4 h-4 text-red-500" />
        <p>using React & Tailwind CSS</p>
      </aside>
    </motion.footer>
  );
};

export default Footer;