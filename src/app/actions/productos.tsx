'use server'

import { IProducto, IProductos } from '@/model/productos'
import { serverAction } from './cookie-handler'

const getProductos = async (): Promise<{
  error?: string
  data: IProducto
}> => {
  const { data, success, error } = await serverAction('productos?estatus=true', 'GET')

  if (!success) {
    return {
      error,
      data: { combos: [], complementos: [], pizzas: [] },
    }
  }

  const obj = (data as unknown as Array<IProductos>).reduce((acc, producto) => {
    if (acc[producto.categoria]) {
      acc[producto.categoria].push(producto)
    } else {
      acc[producto.categoria] = [producto]
    }
    return acc
  }, {} as IProducto)

  return {
    error,
    data: {
      combos: obj.combos ?? [],
      complementos: obj.complementos ?? [],
      pizzas: obj.pizzas ?? [],
    },
  }
}

export { getProductos }
