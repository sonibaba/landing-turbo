'use client'

import useCartStore from '@/store/useCartStore'
import { faMotorcycle, faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

export default function DeliveryOptions() {
  const cobroTotal = useStore(
    useCartStore,
    useShallow(state => state.totalAmount)
  )

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  })

  const [deliveryOption, setDeliveryOption] = useState('domicilio')

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Elige la forma de entrega</h2>

      <div className="space-y-3">
        {/* Enviar a domicilio option */}
        <label className="relative flex items-start p-4 rounded-lg border cursor-pointer hover:bg-gray-50">
          <div className="flex items-center h-5">
            <input
              type="radio"
              name="delivery"
              value="domicilio"
              checked={deliveryOption === 'domicilio'}
              onChange={e => setDeliveryOption(e.target.value)}
              className="h-4 w-4 border-gray-300 text-primary accent-primary"
            />
          </div>
          <div className="ml-3 flex-grow">
            <span className="flex items-center text-sm font-medium text-gray-900">
              <FontAwesomeIcon icon={faMotorcycle} className="h-5 w-5 text-primary mr-2" />
              Enviar a domicilio
            </span>
            <span className="block text-sm text-gray-600 mt-1">
              Calle Principal 123, Colonia Centro, Ciudad...
            </span>
            <p className="text-xs text-gray-500 mt-1">
              El repartidor será de mandaditos y tendrá un costo extra en la tarifa.
            </p>
            <Link
              href="/cambiar-direccion"
              className="block text-sm text-primary hover:text-primary/80 mt-2"
            >
              Elegir una dirección diferente
            </Link>
          </div>
          <div className="ml-4">
            {/* <span className="text-sm font-medium text-gray-900">
              $ 115<sup className="text-xs">72</sup>
            </span> */}
            <span className="text-sm font-medium text-gray-900">
              {formatter.format(cobroTotal)}
            </span>
          </div>
        </label>

        {/* Recoger en tienda option */}
        <label className="relative flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50">
          <div className="flex items-center h-5">
            <input
              type="radio"
              name="delivery"
              value="recoger"
              checked={deliveryOption === 'recoger'}
              onChange={e => setDeliveryOption(e.target.value)}
              className="h-4 w-4 border-gray-300 text-primary accent-primary"
            />
          </div>
          <div className="ml-3 flex-grow">
            <span className="flex items-center text-sm font-medium text-gray-900">
              <FontAwesomeIcon icon={faStore} className="h-5 w-5 text-primary mr-2" />
              Recoger en tienda
            </span>
          </div>
          <div className="ml-4">
            {/* <span className="text-sm font-medium text-gray-900">
              $ 115<sup className="text-xs">72</sup>
            </span> */}
            <span className="text-sm font-medium text-gray-900">
              {formatter.format(cobroTotal)}
            </span>
          </div>
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
