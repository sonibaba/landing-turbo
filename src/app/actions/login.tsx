'use server'

import fetchResponse from '@/app/actions/fetch'
import {
  SigninFormState,
  SignupFormSchema,
  SignupFormState,
  SinginFormSchema,
} from '@/lib/definitions'
import { redirect } from 'next/navigation'
import { setCookie } from './cookie-handler'

const login = async (
  prevState: SignupFormState | undefined,
  formData: FormData
): Promise<SignupFormState> => {
  const validatedFields = SignupFormSchema.safeParse({
    usuario: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const response = await fetchResponse('auth', 'POST', {
    usuario: formData.get('email'),
    flag: 'cliente',
    password: formData.get('password'),
  })

  console.log(response)

  if (!response) {
    return {
      errors: {
        response: 'Error de conexión',
      },
      success: false,
    }
  }

  const { error, message, data } = response

  if (error) {
    return {
      errors: {
        response: message,
      },
      success: false,
    }
  }

  const access = data?.access_token as string
  console.log(access)
  if (!access) {
    return {
      errors: {
        response: 'Token de acceso no encontrado',
      },
      success: false,
    }
  }

  await setCookie(access)

  redirect('/dashboard')
}

const registerClient = async (
  state: SigninFormState | undefined,
  { get }: FormData
): Promise<{
  errors?: {
    nombre?: string[]
    apePaterno?: string[]
    apeMaterno?: string[]
    email?: string[]
    telefono?: string[]
    direccion?: string[]
    password?: string[]
    response?: string
  }
  success?: boolean
}> => {
  const validatedFields = SinginFormSchema.safeParse({
    usuario: get('email'),
    nombre: get('nombre'),
    apePaterno: get('apePaterno'),
    apeMaterno: get('apeMaterno'),
    direccion: get('direccion'),
    email: get('email'),
    telefono: get('telefono'),
    password: get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const response = await fetchResponse('clientes', 'POST', {
    usuario: get('email'),
    password: get('password'),
  })
  if (!response) {
    return {
      errors: {
        response: 'Ocurrio un error al crear el cliente',
      },
    }
  }
  return {
    success: true,
  }
}

export { login, registerClient }
