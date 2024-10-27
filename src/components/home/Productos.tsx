const Productos = () => {
  const categories = [
    {
      name: 'Pizzas',
      icon: ['fas', 'pizza-slice'],
      iconColor: 'text-primary',
      imagen: '/src/assets/productos/pizzas.jpg',
      description: 'Descubre nuestras deliciosas variedades de pizzas',
    },
    {
      name: 'Complementos',
      icon: ['fas', 'utensils'],
      iconColor: 'text-secondary',
      imagen: '/src/assets/productos/complementos.jpg',
      description: 'Acompaña tu pizza con nuestros sabrosos complementos',
    },
    {
      name: 'Combos',
      icon: ['fas', 'layer-group'],
      iconColor: 'text-accent',
      imagen: '/src/assets/productos/combos.jpg',
      description: 'Aprovecha nuestros combos para una experiencia completa',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {categories.map((category, key) => {
        return (
          <div className="relative rounded-lg shadow-md overflow-hidden h-64" key={key}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${category.imagen})` }}
              aria-hidden="true"
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative h-full flex flex-col items-center justify-center p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Productos
