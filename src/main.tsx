import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0c0c12',
            color: '#f0f0f8',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: '"Cabinet Grotesk", sans-serif',
            fontSize: '0.875rem',
          },
          success: { iconTheme: { primary: '#b8ff3c', secondary: '#060608' } },
          error:   { iconTheme: { primary: '#ff4d6d', secondary: '#060608' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
