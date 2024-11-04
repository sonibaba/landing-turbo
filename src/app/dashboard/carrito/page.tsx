'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Categoria } from '@/model/productos'
import useCartStore from '@/store/useCartStore'
import { ArrowRight, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useStore } from 'zustand'

export default function Carrito() {
  const productos = useStore(useCartStore, state => state.productos)
  const removeItem = useStore(useCartStore, state => state.removeProducto)
  const removeAll = useStore(useCartStore, state => state.removeAll)
  const totalAmount = useStore(useCartStore, state => state.totalAmount)
  const totalPoints = useStore(useCartStore, state => state.totalPuntos)

  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  })

  return (
    <div className="min-h-screen bg-white p-4">
      <Card className="max-w-2xl mx-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Carrito</h1>
            </div>
            <Button variant="destructive" onClick={removeAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar todos
            </Button>
          </div>

          <div className="space-y-4">
            {productos!.map((item, key) => (
              <div key={key} className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.nombre}</h3>
                    <Badge variant="secondary">
                      +{item.puntos + (item.categoria == Categoria.Pizzas && item.orilla ? 1 : 0)}{' '}
                      TP
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                  <p className="text-sm font-medium mt-1">
                    {item.orilla
                      ? 'Con orilla de queso '
                      : item.categoria === Categoria.Pizzas && 'Sin orilla de queso '}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{formatter.format(item.precio)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem!(key)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">{formatter.format(totalAmount ?? 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Puntos totales:</span>
                <span className="font-bold">{totalPoints ?? 0} TP</span>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Seguir comprando</Link>
              </Button>
              <Button asChild className="text-white hover:bg-secondary">
                <Link href="/dashboard/delivery-options">
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
