import { IProducto, IProductos } from '@/model/productos'
import fetchResponse from '../fetch'

const getProductos = async (): Promise<IProducto> => {
  const response = await fetchResponse('productos?estatus=true', 'GET')
  if (!response) {
    return {
      combos: [],
      complementos: [],
      pizzas: [],
    }
  }
  const obj = Object.groupBy(response, (producto: IProductos) => producto.categoria)

  console.log(obj)

  return {
    combos: obj.combos ?? [],
    complementos: obj.complementos ?? [],
    pizzas: obj.pizzas ?? [],
  }
}

export { getProductos }
