'use client'

import { Categoria, IProductos } from '@/model/productos'
import useCartStore from '@/store/useCartStore'
import { useState } from 'react'
import { useStore } from 'zustand'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { Textarea } from '../ui/textarea'

interface AlertDialogWithExtrasProps {
  producto: IProductos
}

const MoreData = (
  { producto }: AlertDialogWithExtrasProps = {
    producto: {
      categoria: Categoria.Pizzas,
      estatus: false,
      id: '',
      imagenes: [],
      nombre: '',
      precio: 0,
      puntos: 0,
      orilla: false,
    },
  }
) => {
  const addProducto = useStore(useCartStore, state => state.addProducto)

  const [additionalInfo, setAdditionalInfo] = useState('')
  const [filledCrust, setFilledCrust] = useState(false)

  const handleConfirm = () => {
    console.log('Información adicional:', additionalInfo)
    console.log('Orilla rellena:', filledCrust)
    console.log('Producto:', producto)
    addProducto({ ...producto, orilla: filledCrust, descripcion: additionalInfo })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full py-2 bg-primary hover:bg-secondary text-white rounded transition duration-300 ease-in-out flex justify-around items-center font-semibold text-xs sm:text-sm">
          Agregar
          <span>
            {Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN',
            }).format(producto.precio ?? 0)}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Información adicional</AlertDialogTitle>
          <AlertDialogDescription>
            Proporciona detalles adicionales para personalizar tu pedido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Ej: Sin cebolla, extra queso, cocción término medio..."
            value={additionalInfo}
            onChange={e => setAdditionalInfo(e.target.value)}
            className="min-h-[100px]"
          />
          {producto.orilla && (
            <div className="flex items-center space-x-2">
              <Switch id="filled-crust" checked={filledCrust} onCheckedChange={setFilledCrust} />
              <Label htmlFor="filled-crust">
                Orilla rellena <span className="text-sm text-muted-foreground">(+1 punto)</span>
              </Label>
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="hover:bg-secondary text-white">
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MoreData
