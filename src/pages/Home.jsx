import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiArrowRight, FiCode, FiVideo, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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
                src="src/pages/Screenshot 2025-07-30 222038.png"
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
                href="src/pages/Prashant__RES.pdf"
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

      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-base-200"
      >
        <div className="container mx-auto px-4">
          <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <FiCode className="w-8 h-8" />
              </div>
              <div className="stat-title">Projects Completed</div>
              <div className="stat-value text-primary">2</div>
              <div className="stat-desc">Full-stack applications</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FiVideo className="w-8 h-8" />
              </div>
              <div className="stat-title">YouTube Subscribers</div>
              <div className="stat-value text-secondary">132</div>
              <div className="stat-desc">Tech Enthusiasts</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <FiHeart className="w-8 h-8" />
              </div>
              <div className="stat-title">Experience</div>
              <div className="stat-value text-accent">Learning</div>
              <div className="stat-desc">Professional development</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Projects Preview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Here are some of my  projects in progress that showcase my skills in full-stack development go to view all project to see other projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1].map((index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <figure>
                  <img
                    src={`https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt="Project"
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Project {index}</h3>
                  <p>This Project is in progress and will be updated soon</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-primary">React</div>
                    <div className="badge badge-secondary">Node.js</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/projects" className="btn btn-primary btn-lg">
              View All Projects
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home; 