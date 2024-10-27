'use client'

import fetchResponse from '@/lib/fetch'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Iniciar sesión con:', { email, password })
    const response = await fetchResponse('auth', 'POST', {
      usuario: email,
      flag: 'cliente',
      password,
    })
    if (response) {
      const { access_token } = response
      localStorage.setItem('token', access_token)
      redirect('/dashboard')
    }
    // router.replace('/dashboard')
    // Aquí iría la lógica para manejar el inicio de sesión
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Iniciar sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent"
              placeholder="Correo electrónico"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-[0.2rem] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Correo electrónico
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary placeholder-transparent"
              placeholder="Contraseña"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-[0.2rem] text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
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
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/reset-password"
                className="font-medium text-primary hover:text-primary-dark"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/registro"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
