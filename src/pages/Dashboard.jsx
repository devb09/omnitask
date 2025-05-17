import { useState, useEffect } from 'react'
import { useTaskStore } from '../stores/taskStore'
import TaskFilters from '../components/TaskFilters'
import TaskItem from '../components/TaskItem'
import AddTaskForm from '../components/AddTaskForm'
import { PlusIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  const { projects, getAllTasks, checkDueTasks } = useTaskStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '')
  
  const tasks = getAllTasks()
  
  // Verificar tareas próximas a vencer al cargar el componente
  useEffect(() => {
    checkDueTasks()
  }, [checkDueTasks])
  
  const handleAddTask = () => {
    setShowAddForm(true)
  }
  
  const handleProjectChange = (e) => {
    setSelectedProjectId(e.target.value)
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1>Dashboard</h1>
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
        <div className="mb-4">
          <div className="mb-3">
            <label htmlFor="projectSelect" className="form-label">
              Proyecto
            </label>
            <select
              id="projectSelect"
              value={selectedProjectId}
              onChange={handleProjectChange}
              className="form-select"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <AddTaskForm 
            projectId={selectedProjectId} 
            onClose={() => setShowAddForm(false)} 
          />
        </div>
      )}
      
      <TaskFilters />
      
      <div className="mb-6">
        <h2 className="mb-3">Todas las tareas</h2>
        {tasks.length === 0 ? (
          <div className="card p-6 text-center text-gray-500 dark:text-gray-400">
            No hay tareas disponibles. ¡Crea una nueva tarea para comenzar!
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

export default Dashboard