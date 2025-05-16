import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useTaskStore } from '../stores/taskStore'
import TaskFilters from '../components/TaskFilters'
import TaskItem from '../components/TaskItem'
import AddTaskForm from '../components/AddTaskForm'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const ProjectPage = () => {
  const { projectId } = useParams()
  const { 
    getProjectById, 
    getTasksByProject, 
    updateProject, 
    deleteProject 
  } = useTaskStore()
  
  const project = getProjectById(projectId)
  const tasks = getTasksByProject(projectId)
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [projectName, setProjectName] = useState(project?.name || '')
  
  // Si el proyecto no existe, redirigir al dashboard
  if (!project) {
    return <Navigate to="/" replace />
  }
  
  const handleAddTask = () => {
    setShowAddForm(true)
  }
  
  const handleEditProject = () => {
    setIsEditing(true)
    setProjectName(project.name)
  }
  
  const handleSaveProject = (e) => {
    e.preventDefault()
    if (projectName.trim()) {
      updateProject(projectId, projectName.trim())
      setIsEditing(false)
    }
  }
  
  const handleDeleteProject = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el proyecto "${project.name}" y todas sus tareas?`)) {
      deleteProject(projectId)
      return <Navigate to="/" replace />
    }
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        {isEditing ? (
          <form onSubmit={handleSaveProject} className="flex items-center">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="form-input mr-2"
              autoFocus
              aria-label="Nombre del proyecto"
            />
            <button
              type="submit"
              className="btn btn-primary"
            >
              Guardar
            </button>
          </form>
        ) : (
          <div className="flex items-center">
            <h1>{project.name}</h1>
            <button
              onClick={handleEditProject}
              className="ml-2 p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="Editar nombre del proyecto"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleDeleteProject}
              className="ml-1 p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              aria-label="Eliminar proyecto"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <button
          onClick={handleAddTask}
          className="btn btn-primary flex items-center mt-2 sm:mt-0"
          aria-label="Añadir nueva tarea"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Nueva Tarea
        </button>
      </div>
      
      {showAddForm && (
        <AddTaskForm 
          projectId={projectId} 
          onClose={() => setShowAddForm(false)} 
        />
      )}
      
      <TaskFilters />
      
      <div>
        {tasks.length === 0 ? (
          <div className="card p-6 text-center text-gray-500 dark:text-gray-400">
            No hay tareas en este proyecto. ¡Crea una nueva tarea para comenzar!
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectPage