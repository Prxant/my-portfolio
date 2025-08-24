import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';

// 1. Import your profile picture at the top
import profilePic from '../assets/profile2.png'; // Make sure the path and filename are correct

const About = () => {
  const timelineItems = [
    {
      year: '2025',
      title: 'Full Stack Developer',
      company: 'Tech Innovators Inc.',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
      icon: <FiAward className="w-6 h-6" />
    },
    {
      year: '2023-2026',
      title: 'B.Tech in Computer Science',
      company: 'Babu Banarasi Das University, Lucknow',
      description: 'Maintained a strong academic record with a CGPA of 8.4. Focused on full-stack development, data structures, and algorithms.',
      icon: <FiBookOpen className="w-6 h-6" />
    },
    {
      year: '2021',
      title: 'Higher Secondary (XII)',
      company: 'St. Joseph Sr. Sec. School, Puranpur',
      description: 'Completed my CBSE board examinations with 84%, focusing on Physics, Chemistry, and Mathematics.',
      icon: <FiCalendar className="w-6 h-6" />
    },
    {
      year: '2019',
      title: 'Secondary School (X)',
      company: 'St. Joseph Sr. Sec. School, Puranpur',
      description: 'Graduated with a score of 84% in the CBSE board examinations.',
      icon: <FiMapPin className="w-6 h-6" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Learn more about my journey, experiences, and passion for technology
          </p>
        </motion.div>

        {/* Personal Story Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants}>
            {/* 2. Use the imported variable here */}
            <img
              src={profilePic}
              alt="About me"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">My Story</h2>
            <div className="space-y-4 text-lg text-base-content/80 leading-relaxed">
              <p>
                Hello! I'm Prashant Verma, a passionate full-stack developer with over 5 years of experience 
                creating digital solutions that make a difference. My journey began during my computer 
                science studies, where I discovered my love for both frontend aesthetics and backend logic.
              </p>
              <p>
                What started as curiosity about how websites work has evolved into a career dedicated 
                to building scalable, user-friendly applications. I specialize in modern web technologies 
                like React, Node.js, and TypeScript, always staying current with industry trends and best practices.
              </p>
              <p>
                Beyond coding, I'm passionate about sharing knowledge through my YouTube channel, where 
                I create tech and space related videos. I believe in the power of community 
                and continuous learning in our ever-evolving field.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, or enjoying outdoor activities. I'm always excited about new challenges and 
                opportunities to grow both personally and professionally.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ... (rest of your component code) ... */}
        
      </div>
    </div>
  );
};

export default About;