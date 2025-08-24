import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiArrowRight, FiCode, FiVideo, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// 1. Import the profile picture
import profilePic from '../assets/profile.png'; // Make sure the path and filename are correct

const Home = () => {
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="hero min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <img
                // 2. Use the imported variable for the image
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-6 shadow-2xl ring-4 ring-primary/20"
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 text-base-content"
            >
              Hi, I'm <span className="text-primary">Prashant Verma</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-2xl md:text-4xl font-semibold mb-8 h-16 flex items-center justify-center"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'YouTuber',
                  2000,
                  'Tech Enthusiast',
                  2000,
                  'Problem Solver',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-secondary"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-base-content/80 leading-relaxed"
            >
              I create amazing web experiences using modern technologies like React, Node.js, and javaScript. 
              Passionate about building scalable applications and sharing knowledge through YouTube videos.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/projects" className="btn btn-primary btn-lg group">
                View My Work
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                // 3. Use an absolute path for the resume in the public folder
                href="/Prashant__RES.pdf" // Make sure the filename is correct
                download
                className="btn btn-outline btn-lg group"
              >
                <FiDownload className="mr-2 group-hover:scale-110 transition-transform" />
                Download Resume
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ... (rest of your component code) ... */}
      
    </div>
  );
};

export default Home;