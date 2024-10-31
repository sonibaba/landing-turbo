import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value

  // Permitir acceso a la ruta raíz sin redirección
  if (path === '/') {
    return NextResponse.next()
  }

  // Solo verificar autenticación para /dashboard
  if (path.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Aquí deberías verificar el token
      // Por ejemplo, podrías hacer una petición a tu API para validar el token
      const response = await fetch('https://sandbox3.huastecanetwork.com/api/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        // Si el token no es válido, redirigimos al login
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Si el token es válido, permitimos que la solicitud continúe
      return NextResponse.next()
    } catch (error) {
      console.error('Error al validar el token:', error)
      // En caso de error, también redirigimos al login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Para todas las demás rutas, permitimos el acceso sin verificación
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de solicitud excepto las que comienzan con:
     * - api (rutas API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (icono del favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
