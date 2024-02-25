import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Bootstrap 5.3
import 'bootstrap/dist/css/bootstrap.min.css';
// Icons
import 'material-dashboard/assets/css/nucleo-icons.css';
import 'material-dashboard/assets/css/nucleo-svg.css';
// Font Awesome Icons
import 'https://kit.fontawesome.com/42d5adcbca.js';
// CSS Files
import 'material-dashboard/assets/css/material-dashboard.css';
// import 'styles/style.css';

// Bootstrap 5.3
import 'bootstrap/dist/js/bootstrap.min.js';
// Core
import 'material-dashboard/assets/js/core/popper.min.js';
import 'material-dashboard/assets/js/core/bootstrap.min.js';
// Theme JS
import 'material-dashboard/assets/js/material-dashboard.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
