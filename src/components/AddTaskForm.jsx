import { useState } from 'react'
import { useTaskStore } from '../stores/taskStore'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'

const AddTaskForm = ({ projectId, onClose }) => {
  const { addTask } = useTaskStore()
  const [task, setTask] = useState({
    projectId,
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask({ ...task, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.title.trim()) {
      addTask(task)
      
      // Mostrar notificaciones según la prioridad de la tarea
      if (task.priority === 'medium') {
        toast.info(
          `Nueva tarea creada: ${task.title}`,
          {
            icon: '📝',
            className: 'toast-medium-priority'
          }
        )
      } else if (task.priority === 'low') {
        toast.info(
          `Nueva tarea creada: ${task.title}`,
          {
            icon: '📋',
            className: 'toast-low-priority'
          }
        )
      }
      
      onClose()
    }
  }

  return (
    <div className="card mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Nueva Tarea</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Cerrar formulario"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Título de la tarea"
            required
            aria-required="true"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-input"
            placeholder="Descripción de la tarea (opcional)"
            rows="3"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Fecha de vencimiento
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="form-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="priority" className="form-label">
            Prioridad
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Guardar Tarea
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTaskForm