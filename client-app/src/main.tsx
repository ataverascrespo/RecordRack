import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provide the application with our routes */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
