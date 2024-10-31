import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const PlaceOrder = () => {
  return (
    <div className="w-full bg-white py-8 overflow-hidden relative">
      {/* <div className="absolute inset-0 opacity-5">
        {[...Array(100)].map((_, index) => (
          <div
            key={index}
            className="text-gray-400 absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {index % 2 === 0 ? '🍕' : '📦'}
          </div>
        ))}
      </div> */}
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            INICIA TU PEDIDO
          </h2>
          <Link
            href="/dashboard"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out flex items-center"
          >
            RECOGER
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
