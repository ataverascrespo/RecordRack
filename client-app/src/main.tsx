import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'
import { StoreContext, store } from './app/stores/store.ts'
import { ParallaxProvider } from 'react-scroll-parallax';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ParallaxProvider>
      <StoreContext.Provider value={store}>
        {/* Provide the application with our routes */}
        <RouterProvider router={router} />
      </StoreContext.Provider>
    </ParallaxProvider>
  </React.StrictMode>,
)
