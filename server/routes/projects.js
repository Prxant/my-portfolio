const express = require('express');
const router = express.Router();

// Mock data - replace with database queries
let projects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and admin dashboard.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    category: 'Full Stack',
    featured: true,
    createdAt: '2024-12-15T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'React-based task management application with drag-and-drop functionality, real-time updates, and team collaboration features.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React DnD'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://task-manager-demo.vercel.app',
    category: 'Frontend',
    featured: true,
    createdAt: '2024-12-10T00:00:00.000Z'
  },
  {
    _id: '3',
    title: 'REST API Server',
    description: 'Scalable RESTful API server with authentication, authorization, data validation, and comprehensive documentation.',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger', 'Docker'],
    githubUrl: 'https://github.com/yourusername/rest-api-server',
    liveUrl: 'https://api-demo.herokuapp.com',
    category: 'Backend',
    featured: false,
    createdAt: '2024-12-05T00:00:00.000Z'
  },
  {
    _id: '4',
    title: 'Weather Dashboard',
    description: 'Real-time weather application with location-based forecasts, interactive charts, and responsive design.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['React', 'Chart.js', 'Weather API', 'Geolocation API', 'CSS Grid'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.vercel.app',
    category: 'Frontend',
    featured: false,
    createdAt: '2024-11-28T00:00:00.000Z'
  },
  {
    _id: '5',
    title: 'Social Media API',
    description: 'Backend API for social media platform with real-time messaging, post management, and user interactions.',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['Node.js', 'Socket.io', 'Redis', 'MongoDB', 'CloudinaryAPI', 'JWT'],
    githubUrl: 'https://github.com/yourusername/social-media-api',
    liveUrl: 'https://social-api-demo.herokuapp.com',
    category: 'Backend',
    featured: true,
    createdAt: '2024-11-20T00:00:00.000Z'
  },
  {
    _id: '6',
    title: 'Portfolio Website',
    description: 'Responsive portfolio website with modern design, animations, and admin panel for content management.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'Express'],
    githubUrl: 'https://github.com/yourusername/portfolio-website',
    liveUrl: 'https://johndoe-portfolio.vercel.app',
    category: 'Full Stack',
    featured: false,
    createdAt: '2024-11-15T00:00:00.000Z'
  }
];

// Get all projects
router.get('/', (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    
    let filteredProjects = [...projects];
    
    // Filter by category
    if (category && category !== 'All') {
      filteredProjects = filteredProjects.filter(
        project => project.category === category
      );
    }
    
    // Filter by featured
    if (featured === 'true') {
      filteredProjects = filteredProjects.filter(project => project.featured);
    }
    
    // Sort by creation date (newest first)
    filteredProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Limit results
    if (limit) {
      filteredProjects = filteredProjects.slice(0, parseInt(limit));
    }
    
    res.json(filteredProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ 
      message: 'Failed to fetch projects',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get project by ID
router.get('/:id', (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ 
      message: 'Failed to fetch project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get project categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = [...new Set(projects.map(project => project.category))];
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      message: 'Failed to fetch categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get project stats
router.get('/meta/stats', (req, res) => {
  try {
    const stats = {
      total: projects.length,
      categories: projects.reduce((acc, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        return acc;
      }, {}),
      featured: projects.filter(p => p.featured).length,
      technologies: [...new Set(projects.flatMap(p => p.technologies))].length
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      message: 'Failed to fetch stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
module.exports.projects = projects; // Export for admin routes