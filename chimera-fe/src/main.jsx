import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/animations.css'
import './App.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error('Root element not found. Check your index.html file.');
}
