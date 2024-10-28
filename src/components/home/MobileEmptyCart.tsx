'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function MobileEmptyCart() {
  return (
    <div className="absolute right-0 mt-1 w-max bg-white flex flex-col justify-center items-center p-6 rounded-lg border-2 border-primary before:absolute before:content-[''] before:w-0 before:h-0 before:border-l-[14px] before:border-l-transparent before:border-r-[14px] before:border-r-transparent before:border-b-[14px] before:border-primary before:right-3 before:-top-4">
      <div className="text-center max-w-xs">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Tu carrito está vacío</h2>
        <p className="text-sm text-gray-600 mb-6">Añade productos para comenzar tu pedido.</p>
        <Link
          href="/login"
          className="block w-full py-3 px-4 bg-primary text-white font-medium rounded-lg text-center transition duration-150 ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Explorar productos
        </Link>
        {/* <button className="mt-4 w-full py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg text-center transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
          Cerrar
        </button> */}
      </div>
    </div>
  )
}
