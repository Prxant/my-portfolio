import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';
import profilePic from '../assets/profile.png';

const About = () => {
  // ... (timelineItems and variants remain the same) ...
  const timelineItems = [
    { year: '2025', title: 'Full Stack Developer', company: 'Tech Innovators Inc.', description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.', icon: <FiAward className="w-6 h-6" /> },
    { year: '2023-2026', title: 'B.Tech in Computer Science', company: 'Babu Banarasi Das University, Lucknow', description: 'Maintained a strong academic record with a CGPA of 8.4. Focused on full-stack development, data structures, and algorithms.', icon: <FiBookOpen className="w-6 h-6" /> },
    { year: '2021', title: 'Higher Secondary (XII)', company: 'St. Joseph Sr. Sec. School, Puranpur', description: 'Completed my CBSE board examinations with 84%, focusing on Physics, Chemistry, and Mathematics.', icon: <FiCalendar className="w-6 h-6" /> },
    { year: '2019', title: 'Secondary School (X)', company: 'St. Joseph Sr. Sec. School, Puranpur', description: 'Graduated with a score of 84% in the CBSE board examinations.', icon: <FiMapPin className="w-6 h-6" /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

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
          {/* Smaller text for mobile */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto">
            Learn more about my journey, experiences, and passion for technology
          </p>
        </motion.div>

        {/* Personal Story Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // Stack on mobile (grid-cols-1), two columns on large screens (lg:grid-cols-2)
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <img
              src={profilePic}
              alt="About me"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">My Story</h2>
            <div className="space-y-4 text-lg text-base-content/80 leading-relaxed">
              <p>Hello! I'm Prashant Verma, a passionate full-stack developer...</p>
              {/* ... (rest of your story paragraphs) ... */}
            </div>
          </motion.div>
        </motion.div>

        {/* Goals & Values */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Goals & Values</h2>
          {/* Stack on mobile (grid-cols-1), three columns on medium screens (md:grid-cols-3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ... (your three value cards) ... */}
          </div>
        </motion.section>

        {/* ... (rest of your About page) ... */}
      </div>
    </div>
  );
};

export default About;