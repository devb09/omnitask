import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ProjectPage from './pages/ProjectPage'
import NotFound from './pages/NotFound'
import { useThemeStore } from './stores/themeStore'

function App() {
  const { darkMode, setDarkMode } = useThemeStore()
  
  // Aplicar el tema oscuro al cargar la aplicación
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App