'use server'

import { cookies } from 'next/headers'

const TOKEN_NAME = 'token'

interface ArgsDynamic {
  [key: string]: unknown
}

interface ActionResult<T> {
  success: boolean
  data?: T
  error?: string
}

export async function serverAction(
  url: string,
  method: string,
  args?: ArgsDynamic,
  enableLogging = false
): Promise<ActionResult<ArgsDynamic>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(TOKEN_NAME)

    if (enableLogging) {
      console.log('Intentando obtener token:', TOKEN_NAME)
      console.log('Token encontrado:', token)
    }

    if (!token) {
      if (enableLogging) console.error('No se encontró el token de autenticación')
      return { success: false, error: 'No se encontró el token de autenticación' }
    }

    if (enableLogging) console.log('Realizando petición a:', url)
    const response = await fetch(`https://sandbox3.huastecanetwork.com/api/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(args),
    })

    if (!response.ok) {
      if (enableLogging) console.error('Error en la petición:', response.statusText)
      return { success: false, error: `Error en la petición: ${response.statusText}` }
    }

    const data = await response.json()
    if (enableLogging) console.log('Respuesta recibida:', data)
    return { success: true, data }
  } catch (error) {
    if (enableLogging) console.error('Error en serverAction:', error)
    return {
      success: false,
      error: `Error inesperado: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

export async function setCookie(
  access: string,
  enableLogging = false
): Promise<ActionResult<void>> {
  try {
    const cookieStore = await cookies()

    if (enableLogging) console.log('Configurando cookie:', TOKEN_NAME)
    cookieStore.set({
      name: TOKEN_NAME,
      value: access,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 hora en segundos
      sameSite: 'lax',
    })

    if (enableLogging) console.log('Cookie configurada exitosamente')

    // Verificar inmediatamente si la cookie se configuró correctamente
    const verifyToken = cookieStore.get(TOKEN_NAME)
    if (enableLogging) console.log('Verificación de cookie:', verifyToken)

    if (!verifyToken) {
      return { success: false, error: 'La cookie no se configuró correctamente' }
    }

    return { success: true }
  } catch (error) {
    if (enableLogging) console.error('Error al configurar la cookie:', error)
    return {
      success: false,
      error: `Error al configurar la cookie: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
}

export async function getAllCookies(): Promise<{ name: string; value: string }[]> {
  const cookieStore = await cookies()
  return cookieStore.getAll()
}
