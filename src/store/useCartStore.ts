import { IProductos } from '@/model/productos'
import { create } from 'zustand'

type State = {
  productos: Array<IProductos>
}

type Actions = {
  addProducto: (producto: IProductos) => void
}

const useCartStore = create<State & Actions>(set => ({
  productos: [],
  addProducto(producto) {
    set(state => ({
      productos: [...state.productos, producto],
    }))
  },
}))

export default useCartStore
