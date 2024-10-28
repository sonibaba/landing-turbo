import { IProducto, IProductos } from '@/model/productos'
import fetchResponse from '../fetch'

const getProductos = async (): Promise<{
  error: boolean
  message?: string
  data: IProducto
}> => {
  const { error, data, message } = await fetchResponse('productos?estatus=true', 'GET')

  if (error) {
    return {
      error,
      message,
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
