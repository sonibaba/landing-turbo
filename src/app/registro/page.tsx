'use client'

import { registerClient } from '@/app/actions/login'
import FormError from '@/components/shared/FormError'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, Loader2, Mail, MapPin, Phone, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [state, formAction, isPending] = useActionState(registerClient, undefined)
  const { toast } = useToast()
  const router = useRouter()

  const benefits = [
    'Pedidos más rápidos y fáciles',
    'Acceso a ofertas exclusivas',
    'Guarda tus direcciones favoritas',
    'Historial de pedidos',
    'Programa de recompensas',
  ]

  if (state?.success) {
    toast({
      title: 'Registro exitoso',
      description: state.message,
    })
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="lg:grid lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-3">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Crear una cuenta</h1>
            </div>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="names">Nombre(s)</Label>
                <div className="relative">
                  <Input id="names" name="names" required />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {state?.errors?.nombre && (
                  <FormError errors={state.errors.nombre} title="El nombre debe de contener:" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherLastName">Apellido Paterno</Label>
                <Input id="fatherLastName" name="fatherLastName" required />
                {state?.errors?.apePaterno && (
                  <FormError errors={state.errors.apePaterno} title="El apellido debe de tener:" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherLastName">Apellido Materno</Label>
                <div className="relative">
                  <Input id="motherLastName" name="motherLastName" required />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {state?.errors?.apeMaterno && (
                  <FormError
                    errors={state.errors.apeMaterno}
                    title="El apellido paterno debe de tener:"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Input id="email" name="email" type="email" required />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {state?.errors?.email && (
                  <p className="text-sm text-red-500">{state.errors.email[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono</Label>
                <div className="relative">
                  <Input id="phone" name="phone" type="tel" required />
                  <Phone className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {state?.errors?.telefono && (
                  <FormError errors={state.errors.telefono} title="El telefono debe de tener:" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <div className="relative">
                  <Textarea
                    id="address"
                    name="address"
                    className="min-h-[100px] resize-none"
                    required
                  />
                  <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
                {state?.errors?.direccion && (
                  <FormError errors={state.errors.direccion} title="La direccion debe de tener:" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-5 w-5 p-0 text-muted-foreground hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    <span className="sr-only">
                      {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    </span>
                  </Button>
                </div>
                {state?.errors?.password && (
                  <p className="text-sm text-red-500">{state.errors.password[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-5 w-5 p-0 text-muted-foreground hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    </span>
                  </Button>
                </div>
                {state?.errors?.confirmPassword && (
                  <p className="text-sm text-red-500">{state.errors.confirmPassword[0]}</p>
                )}
              </div>
              <Button type="submit" className="w-full bg-[#D84315] hover:bg-[#BF360C] text-white">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Registrarse
              </Button>
            </form>
            {state?.message && !state.success && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
            <div className="text-center">
              <Button
                variant="link"
                className="text-sm font-normal text-muted-foreground"
                onClick={() => router.push('/login')}
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:col-span-2 lg:mt-0">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">
              ¿Por qué crear una cuenta en Turbo Pizza?
            </h2>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D84315]" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
