import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';

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
    icon: <FiBookOpen className="w-6 h-6" /> // Icon for education
  },
  {
    year: '2021',
    title: 'Higher Secondary (XII)',
    company: 'St. Joseph Sr. Sec. School, Puranpur',
    description: 'Completed my CBSE board examinations with 84%, focusing on Physics, Chemistry, and Mathematics.',
    icon: <FiCalendar className="w-6 h-6" /> // Icon for milestones
  },
  {
    year: '2019',
    title: 'Secondary School (X)',
    company: 'St. Joseph Sr. Sec. School, Puranpur',
    description: 'Graduated with a score of 84% in the CBSE board examinations.',
    icon: <FiMapPin className="w-6 h-6" /> // Icon for location/origin
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
            <img
              src="src/pages/Screenshot 2025-07-31 072415.png"
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

        {/* Goals & Values */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Goals & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl"
            >
              <div className="card-body text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <FiAward className="w-8 h-8 text-primary-content" />
                </div>
                <h3 className="card-title justify-center">Excellence</h3>
                <p>
                  Committed to delivering high-quality code and exceptional user experiences 
                  in every project I work on.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-xl"
            >
              <div className="card-body text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                  <FiBookOpen className="w-8 h-8 text-secondary-content" />
                </div>
                <h3 className="card-title justify-center">Learning</h3>
                <p>
                  Continuously expanding my knowledge and staying updated with the latest 
                  technologies and industry best practices.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card bg-gradient-to-br from-accent/10 to-accent/5 shadow-xl"
            >
              <div className="card-body text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <FiCalendar className="w-8 h-8 text-accent-content" />
                </div>
                <h3 className="card-title justify-center">Innovation</h3>
                <p>
                  Always looking for creative solutions and new ways to solve problems 
                  using cutting-edge technologies.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary/30"></div>
            
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-base-100 z-10"></div>
                
                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="card-body">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-primary">
                          {item.icon}
                        </div>
                        <div className="badge badge-primary">{item.year}</div>
                      </div>
                      <h3 className="card-title text-lg">{item.title}</h3>
                      <p className="text-primary font-semibold">{item.company}</p>
                      <p className="text-base-content/70">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;