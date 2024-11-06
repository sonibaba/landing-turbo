'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ErrorType = 'Configuration' | 'AccessDenied' | 'Verification' | 'Default'

const errorTypes: Record<ErrorType, { title: string; description: string }> = {
  Configuration: {
    title: 'Error de Configuración',
    description:
      'Hay un problema con la configuración del servidor. Por favor, contacta al soporte técnico.',
  },
  AccessDenied: {
    title: 'Acceso Denegado',
    description:
      'No tienes permiso para acceder a esta página. Por favor, inicia sesión con una cuenta autorizada.',
  },
  Verification: {
    title: 'Error de Verificación',
    description:
      'No se pudo verificar tu cuenta. Por favor, intenta el proceso de verificación nuevamente.',
  },
  Default: {
    title: 'Error Inesperado',
    description: 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente más tarde.',
  },
}

function ErrorContent() {
  const router = useRouter()
  const [errorType, setErrorType] = useState<ErrorType>('Default')
  const [callbackUrl, setCallbackUrl] = useState('/')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setErrorType((searchParams.get('error') as ErrorType) || 'Default')
    setCallbackUrl(searchParams.get('callbackUrl') || '/')
  }, [])

  const errorInfo = errorTypes[errorType]

  const handleBackToHome = () => {
    router.push(callbackUrl)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-red-100 p-2 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <CardTitle className="text-center text-2xl font-bold">{errorInfo.title}</CardTitle>
        <CardDescription className="text-center mt-2">{errorInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-gray-500">
          Si el problema persiste, por favor contacta a nuestro equipo de soporte.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleBackToHome} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ErrorContent />
    </div>
  )
}
