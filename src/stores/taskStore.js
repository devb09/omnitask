import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { format } from 'date-fns'

// Definición de estados iniciales
const initialProjects = [
  { id: '1', name: 'Personal' },
  { id: '2', name: 'Trabajo' },
]

const initialTasks = [
  {
    id: '1',
    projectId: '1',
    title: 'Hacer compras',
    description: 'Comprar víveres para la semana',
    dueDate: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'), // Mañana
    status: 'pending',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    projectId: '2',
    title: 'Preparar presentación',
    description: 'Finalizar slides para la reunión del lunes',
    dueDate: format(new Date(Date.now() + 172800000), 'yyyy-MM-dd'), // Pasado mañana
    status: 'pending',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
]

export const useTaskStore = create(
  persist(
    (set, get) => ({
      projects: initialProjects,
      tasks: initialTasks,
      filters: {
        status: 'all', // 'all', 'pending', 'completed'
        priority: 'all', // 'all', 'low', 'medium', 'high'
        sortBy: 'dueDate', // 'dueDate', 'priority', 'title'
      },
      
      // Acciones para proyectos
      addProject: (name) => {
        const newProject = {
          id: Date.now().toString(),
          name,
        }
        set((state) => ({
          projects: [...state.projects, newProject],
        }))
        return newProject
      },
      
      updateProject: (id, name) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, name } : project
          ),
        }))
      },
      
      deleteProject: (id) => {
        // Eliminar el proyecto
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          // También eliminar todas las tareas asociadas al proyecto
          tasks: state.tasks.filter((task) => task.projectId !== id),
        }))
      },
      
      // Acciones para tareas
      addTask: (task) => {
        const newTask = {
          id: Date.now().toString(),
          status: 'pending',
          createdAt: new Date().toISOString(),
          ...task,
        }
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }))
        return newTask
      },
      
      updateTask: (id, updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        }))
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },
      
      toggleTaskStatus: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'pending' ? 'completed' : 'pending',
                }
              : task
          ),
        }))
      },
      
      // Acciones para filtros
      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }))
      },
      
      // Selectores
      getProjectById: (id) => {
        return get().projects.find((project) => project.id === id)
      },
      
      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id)
      },
      
      getTasksByProject: (projectId) => {
        const { tasks, filters } = get()
        return tasks
          .filter((task) => task.projectId === projectId)
          .filter((task) => {
            if (filters.status === 'all') return true
            return task.status === filters.status
          })
          .filter((task) => {
            if (filters.priority === 'all') return true
            return task.priority === filters.priority
          })
          .sort((a, b) => {
            if (filters.sortBy === 'dueDate') {
              if (!a.dueDate) return 1
              if (!b.dueDate) return -1
              return new Date(a.dueDate) - new Date(b.dueDate)
            }
            if (filters.sortBy === 'priority') {
              const priorityValues = { low: 1, medium: 2, high: 3 }
              return priorityValues[b.priority] - priorityValues[a.priority]
            }
            if (filters.sortBy === 'title') {
              return a.title.localeCompare(b.title)
            }
            return 0
          })
      },
      
      getAllTasks: () => {
        const { tasks, filters } = get()
        return tasks
          .filter((task) => {
            if (filters.status === 'all') return true
            return task.status === filters.status
          })
          .filter((task) => {
            if (filters.priority === 'all') return true
            return task.priority === filters.priority
          })
          .sort((a, b) => {
            if (filters.sortBy === 'dueDate') {
              if (!a.dueDate) return 1
              if (!b.dueDate) return -1
              return new Date(a.dueDate) - new Date(b.dueDate)
            }
            if (filters.sortBy === 'priority') {
              const priorityValues = { low: 1, medium: 2, high: 3 }
              return priorityValues[b.priority] - priorityValues[a.priority]
            }
            if (filters.sortBy === 'title') {
              return a.title.localeCompare(b.title)
            }
            return 0
          })
      },
    }),
    {
      name: 'task-storage',
    }
  )
)