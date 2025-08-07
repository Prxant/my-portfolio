import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSave, 
  FiX, 
  FiEye,
  FiLogOut,
  FiFolder,
  FiUser
} from 'react-icons/fi';
import axios from 'axios';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    category: 'Frontend'
  });

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          // Redirect to login or show login form
          return;
        }

        const response = await axios.get('/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(response.data.user);
        fetchProjects();
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('adminToken');
      }
    };

    checkAuth();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'technologies') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(tech => tech.trim())
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingProject) {
        await axios.put(`/api/admin/projects/${editingProject._id}`, formData, config);
      } else {
        await axios.post('/api/admin/projects', formData, config);
      }

      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: project.technologies || []
    });
    setShowAddForm(true);
  };

  const handleDelete = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      category: 'Frontend'
    });
    setEditingProject(null);
    setShowAddForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
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
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-base-content/70">Manage your portfolio projects</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <FiUser className="w-4 h-4" />
              <span>Welcome, {user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-sm"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="stats stats-horizontal shadow-xl mb-8 w-full"
        >
          <div className="stat">
            <div className="stat-figure text-primary">
              <FiFolder className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Projects</div>
            <div className="stat-value text-primary">{projects.length}</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Frontend</div>
            <div className="stat-value text-secondary">
              {projects.filter(p => p.category === 'Frontend').length}
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Backend</div>
            <div className="stat-value text-accent">
              {projects.filter(p => p.category === 'Backend').length}
            </div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Full Stack</div>
            <div className="stat-value text-success">
              {projects.filter(p => p.category === 'Full Stack').length}
            </div>
          </div>
        </motion.div>

        {/* Add Project Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Add New Project
          </button>
        </motion.div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-base-100 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={resetForm}
                  className="btn btn-ghost btn-circle"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Category</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="select select-bordered"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Full Stack">Full Stack</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-24"
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Technologies (comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies.join(', ')}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">GitHub URL</span>
                    </label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Live URL</span>
                    </label>
                    <input
                      type="url"
                      name="liveUrl"
                      value={formData.liveUrl}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    <FiSave className="w-4 h-4 mr-2" />
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl"
            >
              <figure className="h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              
              <div className="card-body">
                <h3 className="card-title text-lg">{project.title}</h3>
                <p className="text-sm text-base-content/70 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="badge badge-primary badge-sm">
                  {project.category}
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <div key={i} className="badge badge-outline badge-xs">
                      {tech}
                    </div>
                  ))}
                  {project.technologies.length > 3 && (
                    <div className="badge badge-outline badge-xs">
                      +{project.technologies.length - 3}
                    </div>
                  )}
                </div>
                
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="btn btn-ghost btn-sm"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(project)}
                    className="btn btn-primary btn-sm"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="btn btn-error btn-sm"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FiFolder className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
            <p className="text-xl text-base-content/50">
              No projects yet. Add your first project to get started!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;