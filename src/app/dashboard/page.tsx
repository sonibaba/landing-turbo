'use client'

import Productos from '@/components/dashboard/Productos'
import ProductListSkeleton from '@/components/skeleton/ProductListSkeleton'
import { Categoria } from '@/model/productos'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faBurger, faPizzaSlice, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Suspense, useState } from 'react'

const Dashboard = () => {
  const [tabs] = useState<Array<{ value: Categoria; label: string; icon: IconDefinition }>>([
    { value: Categoria.Pizzas, label: 'Pizzas', icon: faPizzaSlice },
    { value: Categoria.Combos, label: 'Combos', icon: faBurger },
    { value: Categoria.Complementos, label: 'Complementos', icon: faUtensils },
  ])

  const [activeTab, setActiveTab] = useState(Categoria.Pizzas)

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="w-full ">
          <div className="flex bg-secondary mb-4 rounded ">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 py-2 px-4 text-white ${
                  activeTab === tab.value ? 'bg-primary rounded' : 'hover:bg-secondary'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
          <Suspense fallback={<ProductListSkeleton />}>
            <Productos tab={activeTab} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Dashboard
