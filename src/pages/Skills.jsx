import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, 
  FiDatabase, 
  FiServer, 
  FiSmartphone, 
  FiTool, 
  FiCloud,
  FiGitBranch,
  FiMonitor
} from 'react-icons/fi';

const Skills = () => {
  const skills = [
    {
      name: 'React',
      icon: <FiCode className="w-8 h-8" />,
      level: 95,
      description: 'Building modern, interactive user interfaces',
      category: 'Frontend'
    },
    {
      name: 'Node.js',
      icon: <FiServer className="w-8 h-8" />,
      level: 90,
      description: 'Server-side JavaScript development',
      category: 'Backend'
    },
    {
      name: 'javaScript',
      icon: <FiCode className="w-8 h-8" />,
      level: 88,
      description: 'JavaScript development',
      category: 'Frontend'
    },
    {
      name: 'MongoDB',
      icon: <FiDatabase className="w-8 h-8" />,
      level: 85,
      description: 'NoSQL database design and optimization',
      category: 'Database'
    },
    {
      name: 'MySQL',
      icon: <FiDatabase className="w-8 h-8" />,
      level: 82,
      description: 'Relational database management',
      category: 'Database'
    },
    {
      name: 'Express.js',
      icon: <FiServer className="w-8 h-8" />,
      level: 90,
      description: 'RESTful API development',
      category: 'Backend'
    },
   
  
    
    {
      name: 'Git',
      icon: <FiGitBranch className="w-8 h-8" />,
      level: 92,
      description: 'Version control and collaboration',
      category: 'Tools'
    },
    {
      name: 'HTML/CSS',
      icon: <FiMonitor className="w-8 h-8" />,
      level: 95,
      description: 'Web design and layout',
      category: 'Frontend'
    }
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels 
            across various technologies and frameworks.
          </p>
        </motion.div>

        {/* Skills by Category */}
        {categories.map((category, categoryIndex) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-primary">
              {category}
            </h2>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skills
                .filter(skill => skill.category === category)
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="card-body items-center text-center">
                      <div className="text-primary mb-4">
                        {skill.icon}
                      </div>
                      
                      <h3 className="card-title text-lg font-bold mb-2">
                        {skill.name}
                      </h3>
                      
                      <p className="text-base-content/70 text-sm mb-4">
                        {skill.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Proficiency</span>
                          <span className="text-sm font-bold text-primary">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-base-300 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.section>
        ))}

        {/* Additional Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-8">Other Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Vite', 'Tailwind CSS',
              'Material-UI', 'Framer Motion',
              'Git', 'GitHub',
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="badge badge-lg badge-outline badge-primary p-4"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Skills;