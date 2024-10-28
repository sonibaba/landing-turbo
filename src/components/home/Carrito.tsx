import { faArrowRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const Carrito = () => {
  return (
    <div className="bg-white origin-top-right right-1 mt-1 absolute rounded-lg shadow-md p-6 max-w-md mx-auto z-10 border-2 border-primary before:absolute before:content-[''] before:w-0 before:h-0 before:border-l-[14px] before:border-l-transparent before:border-r-[14px] before:border-r-transparent before:border-b-[14px] before:border-primary before:right-11 before:-top-4">
      <div className="text-center">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <FontAwesomeIcon icon={faShoppingCart} className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6">
          Parece que aún no has añadido nada a tu carrito. ¡Descubre nuestros deliciosos productos!
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
        >
          Empezar a comprar
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 -mr-1 h-5 w-5" />
        </Link>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total</span>
          <span>$0.00</span>
        </div>
        {/* <p className="text-xs text-gray-500 mt-1">Antes del impuesto y ofertas elegibles</p> */}
        <Link href="/login">
          <button className="w-full mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out">
            Efectuar compra
          </button>
        </Link>
        <button className="w-full mt-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none transition duration-150 ease-in-out">
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default Carrito
