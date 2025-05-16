import { useTaskStore } from '../stores/taskStore'
import { FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'

const TaskFilters = () => {
  const { filters, setFilters } = useTaskStore()

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ [name]: value })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 mb-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center">
          <FunnelIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            Estado:
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="form-select text-sm py-1"
            aria-label="Filtrar por estado"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            Prioridad:
          </label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="form-select text-sm py-1"
            aria-label="Filtrar por prioridad"
          >
            <option value="all">Todas</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div className="flex items-center ml-auto">
          <ArrowsUpDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <label htmlFor="sortBy" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            Ordenar por:
          </label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="form-select text-sm py-1"
            aria-label="Ordenar por"
          >
            <option value="dueDate">Fecha de vencimiento</option>
            <option value="priority">Prioridad</option>
            <option value="title">Título</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default TaskFilters