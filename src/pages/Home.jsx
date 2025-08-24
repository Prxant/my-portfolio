import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiArrowRight, FiCode, FiVideo, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import profilePic from '../assets/profile.png';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="hero min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Use px-4 for mobile padding, and more on larger screens */}
        <div className="hero-content text-center px-4 md:px-6">
          <div className="max-w-4xl">
            <motion.div variants={itemVariants} className="mb-8">
              <img
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-6 shadow-2xl ring-4 ring-primary/20"
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              // Smaller text on mobile (text-4xl), larger on medium screens and up (md:text-6xl)
              className="text-4xl md:text-6xl font-bold mb-6 text-base-content"
            >
              Hi, I'm <span className="text-primary">Prashant Verma</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              // Smaller text on mobile (text-2xl), larger on medium screens (md:text-4xl)
              className="text-2xl md:text-4xl font-semibold mb-8 h-16 flex items-center justify-center"
            >
              <TypeAnimation
                sequence={[ 'Full Stack Developer', 2000, 'YouTuber', 2000, 'Tech Enthusiast', 2000, 'Problem Solver', 2000 ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-secondary"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              // Smaller text on mobile (text-lg), larger on medium screens (md:text-xl)
              className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-base-content/80 leading-relaxed"
            >
              I create amazing web experiences using modern technologies like React, Node.js, and javaScript. 
              Passionate about building scalable applications and sharing knowledge through YouTube videos.
            </motion.p>

            <motion.div
              variants={itemVariants}
              // Stack buttons vertically on mobile (flex-col), side-by-side on small screens up (sm:flex-row)
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/projects" className="btn btn-primary btn-lg group">
                View My Work <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="/Prashant__RES.pdf" download className="btn btn-outline btn-lg group">
                <FiDownload className="mr-2 group-hover:scale-110 transition-transform" /> Download Resume
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-base-200"
      >
        <div className="container mx-auto px-4">
          {/* Default to vertical stats, switch to horizontal on large screens */}
          <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full">
            <div className="stat">
              <div className="stat-figure text-primary"><FiCode className="w-8 h-8" /></div>
              <div className="stat-title">Projects Completed</div>
              <div className="stat-value text-primary">2</div>
              <div className="stat-desc">Full-stack applications</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary"><FiVideo className="w-8 h-8" /></div>
              <div className="stat-title">YouTube Subscribers</div>
              <div className="stat-value text-secondary">132</div>
              <div className="stat-desc">Tech Enthusiasts</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-accent"><FiHeart className="w-8 h-8" /></div>
              <div className="stat-title">Experience</div>
              <div className="stat-value text-accent">Learning</div>
              <div className="stat-desc">Professional development</div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* ... (rest of your home page) ... */}
    </div>
  );
};

export default Home;