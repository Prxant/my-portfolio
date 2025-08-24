import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter } from 'react-icons/fi';

// 1. Import your local project image
import careersnImage from '../assets/careersn-project.png'; // Make sure the path and filename are correct

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        title: 'Careersn',
        description: 'A full-stack application designed to streamline the job search process by...',
        image: careersnImage, // 2. Use the imported image variable here
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        githubUrl: 'https://github.com/Prxant/Careersn',
        liveUrl: 'https://careersn.vercel.app',
        category: 'Full Stack'
      },
      {
        id: 2,
        title: 'Task Management App',
        description: 'React-based task management application with drag-and-drop functionality',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
        technologies: ['React', 'JavaScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'Frontend'
      },
      {
        id: 3,
        title: 'REST API Server',
        description: 'RESTful API server with authentication and data validation',
        image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
        technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'Backend'
      },
      // ... (rest of your projects)
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

  const filterProjects = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto">
            A collection of projects that showcase my skills in full-stack development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-12"
        >
          <FiFilter className="w-6 h-6 my-auto text-primary" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterProjects(category)}
              // 3. Smaller buttons on mobile (btn-sm), larger on medium screens (md:btn-md)
              className={`btn btn-sm md:btn-md ${selectedCategory === category
                  ? 'btn-primary'
                  : 'btn-outline btn-primary'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          // 4. Responsive Grid: 1 column on mobile, 2 on medium, 3 on large screens
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <figure className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm bg-white/20 hover:bg-white/30 border-none">
                        <FiGithub className="w-4 h-4" />
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm bg-white/20 hover:bg-white/30 border-none">
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </figure>

              <div className="card-body">
                <h3 className="card-title text-lg font-bold">{project.title}</h3>
                <p className="text-base-content/70 mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="badge badge-primary badge-outline">
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="card-actions justify-between items-center">
                  <div className="badge badge-secondary">{project.category}</div>
                  <div className="flex gap-2">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost">
                      <FiGithub className="w-4 h-4" />
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-base-content/50">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;