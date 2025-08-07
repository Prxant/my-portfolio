import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await axios.get('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.valid) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/admin/login', loginForm);
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card w-full max-w-md bg-base-100 shadow-2xl"
        >
          <div className="card-body">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Admin Access</h2>
              <p className="text-base-content/70">Please sign in to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="input input-bordered w-full pr-12 focus:input-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="alert alert-error text-sm"
                >
                  <span>{error}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm text-base-content/60">
                Demo credentials: admin@demo.com / password123
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Return protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;