import { Categoria, IProductos } from '@/model/productos'
import { create } from 'zustand'
import { createComputed } from 'zustand-computed'
import { persist } from 'zustand/middleware'

type Store = {
  productos: Array<IProductos>
  addProducto: (producto: IProductos) => void
  removeProducto: (index: number) => void
  removeAll: () => void
}

type ComputedStore = {
  totalAmount: number
  totalPuntos: number
}

const computed = createComputed(
  (state: Store): ComputedStore => ({
    totalAmount: state.productos.reduce((sum, item) => sum + item.precio, 0),
    totalPuntos: state.productos.reduce((sum, item) => {
      sum = sum + item.puntos
      if (item.orilla && item.categoria == Categoria.Pizzas) {
        sum = sum + 1
      }
      return sum
    }, 0),
  })
)

const useCartStore = create<Store>()(
  computed(
    persist(
      (set, get) => ({
        productos: [],
        addProducto(producto) {
          set(() => ({
            productos: [...get().productos, producto],
          }))
        },
        removeProducto(index: number) {
          set(() => ({
            productos: get().productos.splice(index, 1),
          }))
        },
        removeAll() {
          set(() => ({
            productos: get().productos.splice(0, get().productos.length),
          }))
        },
      }),
      {
        name: 'productos-storage',
      }
    )
  )
)

export default useCartStore
