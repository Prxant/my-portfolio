const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Import projects data
let { projects } = require('./projects');

// Demo admin user - replace with database user
const DEMO_ADMIN = {
  id: '1',
  email: 'admin@demo.com',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/RHKtMqHZgcl7S1jlK', // password123
  name: 'Demo Admin'
};

// JWT Secret - use environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // In a real application, fetch user from database
    if (email !== DEMO_ADMIN.email) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, DEMO_ADMIN.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: DEMO_ADMIN.id, 
        email: DEMO_ADMIN.email,
        name: DEMO_ADMIN.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: DEMO_ADMIN.id,
        email: DEMO_ADMIN.email,
        name: DEMO_ADMIN.name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ 
    valid: true, 
    user: req.user 
  });
});

// Get admin profile
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ 
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    }
  });
});

// Get all projects (admin view)
router.get('/projects', authenticateToken, (req, res) => {
  res.json(projects);
});

// Add new project
router.post('/projects', authenticateToken, (req, res) => {
  try {
    const { title, description, image, technologies, githubUrl, liveUrl, category } = req.body;

    // Validation
    if (!title || !description || !image || !technologies || !githubUrl || !liveUrl || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = {
      _id: (projects.length + 1).toString(),
      title,
      description,
      image,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()),
      githubUrl,
      liveUrl,
      category,
      featured: false,
      createdAt: new Date().toISOString()
    };

    projects.push(newProject);
    
    res.status(201).json({
      message: 'Project created successfully',
      project: newProject
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

// Update project
router.put('/projects/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, technologies, githubUrl, liveUrl, category, featured } = req.body;

    const projectIndex = projects.findIndex(p => p._id === id);
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project
    projects[projectIndex] = {
      ...projects[projectIndex],
      title: title || projects[projectIndex].title,
      description: description || projects[projectIndex].description,
      image: image || projects[projectIndex].image,
      technologies: technologies ? 
        (Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim())) 
        : projects[projectIndex].technologies,
      githubUrl: githubUrl || projects[projectIndex].githubUrl,
      liveUrl: liveUrl || projects[projectIndex].liveUrl,
      category: category || projects[projectIndex].category,
      featured: featured !== undefined ? featured : projects[projectIndex].featured,
      updatedAt: new Date().toISOString()
    };

    res.json({
      message: 'Project updated successfully',
      project: projects[projectIndex]
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
});

// Delete project
router.delete('/projects/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    
    const projectIndex = projects.findIndex(p => p._id === id);
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const deletedProject = projects.splice(projectIndex, 1)[0];
    
    res.json({
      message: 'Project deleted successfully',
      project: deletedProject
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

// Toggle project featured status
router.patch('/projects/:id/featured', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    
    const project = projects.find(p => p._id === id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.featured = !project.featured;
    project.updatedAt = new Date().toISOString();

    res.json({
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      project
    });

  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
});

// Admin dashboard stats
router.get('/stats', authenticateToken, (req, res) => {
  try {
    const stats = {
      totalProjects: projects.length,
      featuredProjects: projects.filter(p => p.featured).length,
      categories: projects.reduce((acc, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        return acc;
      }, {}),
      recentProjects: projects
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(p => ({ id: p._id, title: p.title, category: p.category, createdAt: p.createdAt }))
    };

    res.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

module.exports = router;