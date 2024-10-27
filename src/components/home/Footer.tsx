import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Síguenos en redes sociales</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors duration-300"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors duration-300"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors duration-300"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors duration-300"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <a href="#" className="hover:text-secondary transition-colors duration-300">
                Política de privacidad
              </a>
              <a href="#" className="hover:text-secondary transition-colors duration-300">
                Términos de servicio
              </a>
            </div>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto md:mx-0">
              ©2003-2024 Turbo Pizza Enterprises, Inc. Reservados todos los derechos. El nombre, los
              logotipos y las marcas relacionadas con Turbo Pizza son marcas comerciales registradas
              de Turbo Pizza Enterprises, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
