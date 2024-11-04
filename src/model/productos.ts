export type IProductos = {
  id: string
  nombre: string
  precio: number
  puntos: number
  estatus: boolean
  categoria: Categoria
  imagenes: string[]
  orilla?: boolean
  descripcion?: string
}

export enum Categoria {
  Combos = 'combos',
  Complementos = 'complementos',
  Pizzas = 'pizzas',
}

export interface IProducto {
  [Categoria.Combos]: Array<IProductos>
  [Categoria.Complementos]: Array<IProductos>
  [Categoria.Pizzas]: Array<IProductos>
}
