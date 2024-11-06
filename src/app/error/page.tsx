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
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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

export default function ErrorPage() {
  const router = useRouter()
  const { error = 'Default', callbackUrl } = router.query

  useEffect(() => {
    // Log the error for debugging purposes
    console.error('Authentication error:', error)
  }, [error])

  const errorInfo = errorTypes[error as ErrorType] || errorTypes.Default

  const handleBackToHome = () => {
    router.push((callbackUrl as string) || '/')
  }

  return (
    <>
      <Head>
        <title>Error - Turbo Pizza</title>
        <meta name="description" content="Página de error de Turbo Pizza" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
      </div>
    </>
  )
}
