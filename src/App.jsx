import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import context and persistent components directly
// FIX: Added the .jsx extension to the file path to ensure it's resolved correctly.
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Lazy load the page components for better performance.
// The code for these pages will only be downloaded when the user navigates to them.
const Home = lazy(() => import('./pages/Home.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Skills = lazy(() => import('./pages/Skills.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const YouTube = lazy(() => import('./pages/YouTube.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));

// A simple component to show while lazy-loaded pages are loading
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  // useLocation is needed by AnimatePresence to track route changes
  const location = useLocation();

  return (
    <ThemeProvider>
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-sans">
          <Navbar />

          {/* The main content area where pages will be rendered */}
          <main className="flex-grow container mx-auto px-4 py-8">
            {/* AnimatePresence enables animations when components are added or removed from the React tree. */}
            {/* 'mode="wait"' ensures the outgoing page finishes its exit animation before the new page enters. */}
            <AnimatePresence mode="wait">
              {/* Suspense shows a fallback UI (like a spinner) while the lazy-loaded components are being fetched. */}
              <Suspense fallback={<LoadingSpinner />}>
                {/* The key={location.pathname} is crucial. It tells AnimatePresence that the Routes component is new on every URL change, triggering the animation. */}
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/youtube" element={<YouTube />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                  {/* Optional: Add a 404 Not Found route */}
                  <Route path="*" element={
                    <div className="text-center py-20">
                      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                      <p className="mt-4">The page you are looking for does not exist.</p>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
    </ThemeProvider>
  );
}

// You need to wrap the main App component in Router for useLocation to work
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
