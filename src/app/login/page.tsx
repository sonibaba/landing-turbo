'use client'

import { Eye, EyeOff, Loader2, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        if (result.code == 'credentials') {
          toast({
            title: 'Error',
            description: 'Usuario y/o contraseña incorrectas',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          })
        }
      } else {
        router.replace('/dashboard')
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'Se produjo un error inesperado',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Iniciar sesión en tu cuenta</h1>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative">
            <Input id="email" name="email" placeholder="" type="email" required />
            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder=""
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
        </div>
        <Button
          type="button"
          variant="link"
          className="px-0 text-sm font-normal text-muted-foreground"
        >
          ¿Olvidaste tu contraseña?
        </Button>
        <Button
          type="submit"
          className="w-full bg-[#D84315] hover:bg-[#BF360C] text-white"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Iniciar sesión
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O</span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={() => router.push('/registro')}>
        Crear cuenta
      </Button>
    </div>
  )
}
