'use server'

import { IProducto, IProductos } from '@/model/productos'
import { prisma } from '@/prisma'

const getProductos = async (): Promise<{
  error?: string
  data: IProducto
}> => {
  const productos = await prisma.productos.findMany()

  // console.log(productos)

  // const { data, success, error } = await serverAction('productos?estatus=true', 'GET')

  // if (!success) {
  //   return {
  //     error,
  //     data: { combos: [], complementos: [], pizzas: [] },
  //   }
  // }

  const obj = (productos as Array<IProductos>).reduce((acc, producto) => {
    if (acc[producto.categoria]) {
      acc[producto.categoria].push(producto)
    } else {
      acc[producto.categoria] = [producto]
    }
    return acc
  }, {} as IProducto)

  return {
    data: {
      combos: obj?.combos ?? [],
      complementos: obj?.complementos ?? [],
      pizzas: obj?.pizzas ?? [],
    },
  }
}

export { getProductos }
