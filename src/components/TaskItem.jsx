import { useState } from 'react'
import { format, isPast, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { useTaskStore } from '../stores/taskStore'
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'

const TaskItem = ({ task }) => {
  const { toggleTaskStatus, updateTask, deleteTask } = useTaskStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  const priorityClasses = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }

  const getDueDateStatus = () => {
    if (!task.dueDate) return ''
    const dueDate = new Date(task.dueDate)
    if (isPast(dueDate) && !isToday(dueDate) && task.status !== 'completed') {
      return 'text-red-600 dark:text-red-400 font-medium'
    }
    if (isToday(dueDate) && task.status !== 'completed') {
      return 'text-yellow-600 dark:text-yellow-400 font-medium'
    }
    return 'text-gray-600 dark:text-gray-400'
  }

  const handleToggleStatus = () => {
    toggleTaskStatus(task.id)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      deleteTask(task.id)
      
      // Mostrar notificación al eliminar una tarea según su prioridad
      if (task.priority === 'high') {
        toast.error(
          `Tarea importante eliminada: ${task.title}`,
          {
            icon: '🗑️',
            className: 'toast-high-priority'
          }
        )
      } else if (task.priority === 'medium') {
        toast.error(
          `Tarea eliminada: ${task.title}`,
          {
            icon: '🗑️',
            className: 'toast-medium-priority'
          }
        )
      } else {
        toast.error(
          `Tarea eliminada: ${task.title}`,
          {
            icon: '🗑️',
            className: 'toast-low-priority'
          }
        )
      }
    }
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    updateTask(task.id, editedTask)
    setIsEditing(false)
    
    // Mostrar notificación si se editó una tarea de alta prioridad
    if (editedTask.priority === 'high') {
      // Si la prioridad cambió a alta
      if (task.priority !== 'high') {
        toast.info(
          `Tarea actualizada a prioridad alta: ${editedTask.title}`,
          {
            icon: '🔔',
            className: 'toast-high-priority'
          }
        )
      } 
      // Si ya era alta prioridad pero se modificó
      else {
        toast.info(
          `Tarea importante actualizada: ${editedTask.title}`,
          {
            icon: '📝',
            className: 'toast-high-priority'
          }
        )
      }
    } else if (editedTask.priority === 'medium') {
      // Si la prioridad cambió a media
      if (task.priority !== 'medium') {
        toast.info(
          `Tarea actualizada a prioridad media: ${editedTask.title}`,
          {
            icon: '📌',
            className: 'toast-medium-priority'
          }
        )
      } 
      // Si ya era prioridad media pero se modificó
      else {
        toast.info(
          `Tarea actualizada: ${editedTask.title}`,
          {
            icon: '📝',
            className: 'toast-medium-priority'
          }
        )
      }
    } else {
      // Si la prioridad cambió a baja
      if (task.priority !== 'low') {
        toast.info(
          `Tarea actualizada a prioridad baja: ${editedTask.title}`,
          {
            icon: '📋',
            className: 'toast-low-priority'
          }
        )
      } 
      // Si ya era prioridad baja pero se modificó
      else {
        toast.info(
          `Tarea actualizada: ${editedTask.title}`,
          {
            icon: '📝',
            className: 'toast-low-priority'
          }
        )
      }
    }
  }

  const handleCancelEdit = () => {
    setEditedTask(task)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedTask({ ...editedTask, [name]: value })
  }

  if (isEditing) {
    return (
      <div className="card mb-3">
        <form onSubmit={handleSaveEdit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={editedTask.description || ''}
              onChange={handleChange}
              className="form-input"
              rows="2"
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
              value={editedTask.dueDate || ''}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className={`card mb-3 ${task.status === 'completed' ? 'opacity-75' : ''}`}>
      <div className="flex items-start">
        <button
          onClick={handleToggleStatus}
          className={`mt-1 p-1 rounded-full border ${task.status === 'completed' ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
          aria-label={task.status === 'completed' ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {task.status === 'completed' && (
            <CheckIcon className="h-4 w-4 text-white" />
          )}
          {task.status !== 'completed' && (
            <span className="h-4 w-4 block" />
          )}
        </button>
        
        <div className="ml-3 flex-grow">
          <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {task.description}
            </p>
          )}
          
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {task.dueDate && (
              <span className={`text-sm ${getDueDateStatus()}`}>
                {format(new Date(task.dueDate), 'PPP', { locale: es })}
              </span>
            )}
            
            <span className={`text-xs px-2 py-1 rounded-full ${priorityClasses[task.priority]}`}>
              {task.priority === 'low' && 'Baja'}
              {task.priority === 'medium' && 'Media'}
              {task.priority === 'high' && 'Alta'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            aria-label="Editar tarea"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            aria-label="Eliminar tarea"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem