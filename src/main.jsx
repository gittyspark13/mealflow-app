import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

if (window.location.pathname.startsWith('/app')) {
  document.getElementById('root').style.display = 'block'
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
