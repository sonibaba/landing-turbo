'use client'

import { getProductos } from '@/lib/productos/actions'
import { Categoria, IProducto, IProductos } from '@/model/productos'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Productos = ({ tab }: { tab: Categoria }) => {
  const [productos, setProductos] = useState<IProducto>({
    combos: [],
    complementos: [],
    pizzas: [],
  })

  useEffect(() => {
    getProductos().then(products => setProductos(products))
  }, [])

  const agregarProducto = (producto: IProductos) => {
    console.log(producto)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {productos[tab].map((producto, index) => (
        <div className="rounded-lg shadow-md overflow-hidden" key={index}>
          <div key={index} className="relative rounded-lg shadow-md overflow-hidden h-72">
            <Image
              src={producto.imagenes.at(0) ?? 'logo.svg'}
              width={298}
              height={192}
              className="w-full h-48 object-cover"
              alt={producto.nombre}
            />
            <div className="p-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg text-gray-900 font-semibold">{producto.nombre}</h3>
              </div>
              <button
                onClick={() => agregarProducto(producto)}
                className="w-full py-2 bg-primary hover:bg-secondary text-white rounded transition duration-300 ease-in-out flex justify-around font-semibold "
              >
                <span>Agregar</span>
                {Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }).format(producto.precio)}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Productos
