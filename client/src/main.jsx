import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global styles, e.g., Tailwind CSS
import App from './App'; // Import your main App component

// Use ReactDOM.createRoot to render your App component into the 'root' div
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
