import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Import the ThemeProvider from your context file
import { ThemeProvider } from './contexts/ThemeContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    {/* 2. Wrap your entire <App /> component with the <ThemeProvider> */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
