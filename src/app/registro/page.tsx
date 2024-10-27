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
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center p-6">
      <div className="w-full max-w-3xl md:flex">
        <div className="md:w-2/3 md:pr-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Crear una cuenta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <div className="relative mt-6">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent bg-transparent"
                    placeholder="Nombre(s)"
                    required
                  />
                  <label
                    htmlFor="nombre"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm  peer-focus:z-0 bg-white"
                  >
                    Nombre(s)
                  </label>
                </div>
                {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <div className="relative mt-6">
                  <input
                    type="text"
                    id="apellidoPaterno"
                    name="apellidoPaterno"
                    value={form.apellidoPaterno}
                    onChange={handleChange}
                    className="peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent bg-transparent"
                    placeholder="Apellido Paterno"
                    required
                  />
                  <label
                    htmlFor="apellidoPaterno"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm  peer-focus:z-0 bg-white"
                  >
                    Apellido Paterno
                  </label>
                </div>
                {errors.apellidoPaterno && (
                  <p className="mt-1 text-sm text-red-600">{errors.apellidoPaterno}</p>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="apellidoMaterno"
                name="apellidoMaterno"
                value={form.apellidoMaterno}
                onChange={handleChange}
                className="peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent bg-transparent"
                placeholder="Apellido Materno"
              />
              <label
                htmlFor="apellidoMaterno"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Apellido Materno
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent"
                placeholder="Correo Electrónico"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Correo Electrónico
              </label>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div className="relative">
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent"
                placeholder="Número de Teléfono"
                required
              />
              <label
                htmlFor="telefono"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Número de Teléfono
              </label>
              {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
            </div>
            <div className="relative">
              <textarea
                id="direccion"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                rows={3}
                className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent"
                placeholder="Dirección"
                required
              ></textarea>
              <label
                htmlFor="direccion"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Dirección
              </label>
              {errors.direccion && <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent"
                placeholder="Contraseña"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Contraseña
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
              >
                Registrarse
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link href="/login" className="text-primary hover:text-primary-dark cursor-pointer">
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </div>

        <div className="md:w-1/3 mt-8 md:mt-0">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            ¿Por qué crear una cuenta en Turbo Pizza?
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span className="text-gray-700">Pedidos más rápidos y fáciles</span>
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span className="text-gray-700">Acceso a ofertas exclusivas</span>
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span className="text-gray-700">Guarda tus direcciones favoritas</span>
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span className="text-gray-700">Historial de pedidos</span>
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary mt-1 mr-2" />
              <span className="text-gray-700">Programa de recompensas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Registro
