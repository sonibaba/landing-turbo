import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

export const SignupFormSchema = z.object({
  usuario: z
    .string()
    .email({ message: 'Por favor, introduzca un correo electrónico válido.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Tener al menos 8 caracteres de longitud' })
    .regex(/[a-zA-Z]/, { message: 'Debe contener al menos una letra.' })
    .regex(/[0-9]/, { message: 'Debe contener al menos un numero.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Debe de contener al menos un caracter especial.',
    })
    .trim(),
})

const phoneValidateZod = z.string().transform((value, ctx) => {
  const isValidPhone = isValidPhoneNumber(value, 'MX')
  if (!isValidPhone) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Telefono no valido',
    })
    return z.NEVER
  }
  return parsePhoneNumber(value, 'MX')
})

export const SinginFormSchema = z.object({
  nombre: z.string().trim(),
  apePaterno: z.string().trim(),
  apeMaterno: z.string().trim(),
  direccion: z.string().trim(),
  email: z
    .string()
    .email({ message: 'Por favor, introduzca un correo electrónico válido.' })
    .trim(),
  telefono: phoneValidateZod,
  password: z
    .string()
    .min(8, { message: 'Tener al menos 8 caracteres de longitud' })
    .regex(/[a-zA-Z]/, { message: 'Debe contener al menos una letra.' })
    .regex(/[0-9]/, { message: 'Debe contener al menos un numero.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Debe de contener al menos un caracter especial.',
    })
    .trim(),
})

export type SignupFormState = {
  errors?: {
    usuario?: string[]
    password?: string[]
    response?: string
  }
  success?: boolean
}

export type SigninFormState = {
  errors?: {
    nombre?: string[]
    apePaterno?: string[]
    apeMaterno?: string[]
    email?: string[]
    telefono?: string[]
    response?: string
  }
  success?: boolean
}
