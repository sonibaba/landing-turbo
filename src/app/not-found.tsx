import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faGhost, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

config.autoAddCss = false

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-page text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <div className="text-6xl font-medium mb-4">
          <FontAwesomeIcon icon={faGhost} className="text-secondary mr-2 animate-float" />
          Página no encontrada
        </div>
        <p className="text-xl text-accent mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link href="/" passHref>
          <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  )
}
