'use client'

import { registerClient } from '@/lib/registro/actions'
import { faCheckCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface FormData {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  email: string
  telefono: string
  direccion: string
  password: string
}

interface FormErrors {
  nombre?: string
  apellidoPaterno?: string
  email?: string
  telefono?: string
  direccion?: string
  password?: string
}

const Registro = () => {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors: FormErrors = {}

    if (form.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres'
      isValid = false
    }

    if (form.apellidoPaterno.trim().length < 2) {
      newErrors.apellidoPaterno = 'El apellido paterno debe tener al menos 2 caracteres'
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Por favor, introduce un email válido'
      isValid = false
    }

    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(form.telefono)) {
      newErrors.telefono = 'El número de teléfono debe tener 10 dígitos'
      isValid = false
    }

    if (form.direccion.trim().length < 10) {
      newErrors.direccion = 'Por favor, introduce una dirección válida'
      isValid = false
    }

    if (form.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const { error, message } = await registerClient(form)
      if (error) {
        toast.error(message)
        return
      }
      toast.success(message)
      setTimeout(() => {
        redirect('/login')
      }, 100)
      console.log('Formulario enviado', form)
      // Aquí iría la lógica para enviar el formulario al servidor
    } else {
      console.log('Formulario inválido')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear una cuenta</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mx-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre(s)
              </label>
              <div className="mt-1">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              {errors.nombre && <p className="mt-2 text-sm text-red-600">{errors.nombre}</p>}
            </div>

            <div className="mx-4">
              <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700">
                Apellido Paterno
              </label>
              <div className="mt-1">
                <input
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={form.apellidoPaterno}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              {errors.apellidoPaterno && (
                <p className="mt-2 text-sm text-red-600">{errors.apellidoPaterno}</p>
              )}
            </div>

            <div className="mx-4">
              <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700">
                Apellido Materno
              </label>
              <div className="mt-1">
                <input
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  type="text"
                  autoComplete="family-name"
                  value={form.apellidoMaterno}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <div className="mx-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="mx-4">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Número de Teléfono
              </label>
              <div className="mt-1">
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={form.telefono}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              {errors.telefono && <p className="mt-2 text-sm text-red-600">{errors.telefono}</p>}
            </div>

            <div className="mx-4">
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <div className="mt-1">
                <textarea
                  id="direccion"
                  name="direccion"
                  rows={3}
                  required
                  value={form.direccion}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              {errors.direccion && <p className="mt-2 text-sm text-red-600">{errors.direccion}</p>}
            </div>

            <div className="mx-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="h-5 w-5 text-gray-400"
                  />
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="mx-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Registrarse
              </button>
            </div>
          </form>

          <div className="mt-6 mx-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            ¿Por qué crear una cuenta en Turbo Pizza?
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span>Pedidos más rápidos y fáciles</span>
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span>Acceso a ofertas exclusivas</span>
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span>Guarda tus direcciones favoritas</span>
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span>Historial de pedidos</span>
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span>Programa de recompensas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Registro
