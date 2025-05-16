import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Página no encontrada</p>
      <p className="text-gray-500 dark:text-gray-500 mb-8">La página que estás buscando no existe o ha sido movida.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound