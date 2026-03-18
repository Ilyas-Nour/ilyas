import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/**
 * Global Console Filter
 * Silences persistent library deprecation warnings that are out of our direct control
 * (specifically THREE.Clock in current R3F/Three.js versions).
 */
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string') {
    if (args[0].includes('THREE.Clock: This module has been deprecated')) return;
    if (args[0].includes('Please ensure that the container has a non-static position')) return;
  }
  originalWarn(...args);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
