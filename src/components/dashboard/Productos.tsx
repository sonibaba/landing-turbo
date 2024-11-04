'use client'

import { getProductos } from '@/app/actions/productos'
import { Categoria, IProducto } from '@/model/productos'
import logo from '@public/logo.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import MoreData from './MoreData'

const fetchProductos = async () => await getProductos()

const Productos = ({ tab }: { tab: Categoria }) => {
  const [productos, setProductos] = useState<IProducto>({
    combos: [],
    complementos: [],
    pizzas: [],
  })

  useEffect(() => {
    fetchProductos().then(({ error, data }) => {
      if (error) {
        toast.error(error)
      }
      setProductos(data)
    })
  }, [])

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productos[tab].map(producto => (
            <div className="rounded-lg shadow-md overflow-hidden" key={producto.id}>
              <div className="relative h-40 sm:h-48">
                <Image
                  src={producto.imagenes.at(0) ?? logo}
                  alt={producto.nombre}
                  width={298}
                  height={48}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-90">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm sm:text-lg text-gray-900 font-semibold truncate">
                      {producto.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      Puntos a obtener: {producto.puntos}
                    </p>
                  </div>
                  <MoreData producto={producto} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Productos
