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

  const obj = Object.groupBy(
    data as unknown as Array<IProductos>,
    (producto: IProductos) => producto.categoria
  )

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
