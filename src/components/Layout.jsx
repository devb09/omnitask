import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTaskStore } from '../stores/taskStore'
import { useThemeStore } from '../stores/themeStore'
import { SunIcon, MoonIcon, PlusIcon } from '@heroicons/react/24/outline'

const Layout = ({ children }) => {
  const { projects, addProject } = useTaskStore()
  const { darkMode, toggleDarkMode } = useThemeStore()
  const [newProjectName, setNewProjectName] = useState('')
  const [showNewProjectForm, setShowNewProjectForm] = useState(false)
  const navigate = useNavigate()

  const handleAddProject = (e) => {
    e.preventDefault()
    if (newProjectName.trim()) {
      const newProject = addProject(newProjectName.trim())
      setNewProjectName('')
      setShowNewProjectForm(false)
      navigate(`/project/${newProject.id}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            TaskMaster
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 hidden md:block">
          <nav className="space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Dashboard
            </Link>
            
            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Proyectos</h3>
                <button
                  onClick={() => setShowNewProjectForm(true)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                  aria-label="Añadir proyecto"
                >
                  <PlusIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              {showNewProjectForm && (
                <form onSubmit={handleAddProject} className="mb-2">
                  <div className="flex">
                    <input
                      type="text"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="Nombre del proyecto"
                      className="form-input text-sm py-1 flex-grow"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="ml-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Añadir
                    </button>
                  </div>
                </form>
              )}
              
              <ul className="space-y-1">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      to={`/project/${project.id}`}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          TaskMaster © {new Date().getFullYear()} - Aplicación de gestión de tareas
        </div>
      </footer>
    </div>
  )
}

export default Layout