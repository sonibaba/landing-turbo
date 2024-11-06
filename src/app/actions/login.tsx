'use server'

import fetchResponse from '@/app/actions/fetch'
import {
  SigninFormState,
  SignupFormSchema,
  SignupFormState,
  SinginFormSchema,
} from '@/lib/definitions'
import { prisma } from '@/prisma'
import { genSaltSync, hashSync } from 'bcryptjs'
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

const registerClient = async (state: SigninFormState | undefined, form: FormData) => {
  console.log(form)

  const validatedFields = SinginFormSchema.safeParse({
    usuario: form.get('email'),
    nombre: form.get('names'),
    apePaterno: form.get('fatherLastName'),
    apeMaterno: form.get('motherLastName'),
    direccion: form.get('address'),
    email: form.get('email'),
    telefono: form.get('phone'),
    password: form.get('password'),
    confirmPassword: form.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Falló la validación del formulario.',
    }
  }

  const saltRound = await genSaltSync()

  const hashedPassword = await hashSync(validatedFields.data.password, saltRound)

  try {
    const usuario = await prisma.clientes.create({
      data: {
        email: validatedFields.data.email,
        nombre: validatedFields.data.nombre,
        apePaterno: validatedFields.data.apePaterno,
        apeMaterno: validatedFields.data.apeMaterno,
        telefono: form.get('phone')?.toString() ?? '',
        password: hashedPassword,
        direcciones: {
          create: {
            direccion: validatedFields.data.direccion,
          },
        },
      },
    })
    console.log(usuario)
    return { success: true, message: 'Usuario registrado exitosamente.' }
  } catch (error) {
    console.log(error)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return { message: 'Este correo electrónico ya está registrado.' }
    }
    return { message: 'Ocurrió un error al registrar el usuario.' }
  }

  // const response = await fetchResponse('clientes', 'POST', {
  //   usuario: get('email'),
  //   password: get('password'),
  // })
  // if (!response) {
  //   return {
  //     errors: {
  //       response: 'Ocurrio un error al crear el cliente',
  //     },
  //   }
  // }
  // return {
  //   success: true,
  // }
}

export { login, registerClient }
