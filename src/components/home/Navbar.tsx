'use client'

import { faBagShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Carrito from './Carrito'

const Navbar = () => {
  const [openBag, setOpenBag] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const loginDropdownRef = useRef<HTMLDivElement>(null)
  const carDropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
      if (carDropDownRef.current && !carDropDownRef.current.contains(event.target as Node)) {
        setOpenBag(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white">
      <div className="max-w-full mx-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="logo.svg" alt="Turbo Pizza" width={60} height={36} />
            </Link>
          </div>
          <div className="flex">
            <div className="flex items-center space-x-4" ref={loginDropdownRef}>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  <span className="text-primary font-extrabold text-xl">
                    Hola, invitado <FontAwesomeIcon icon={faChevronDown} className="text-base" />
                  </span>
                </button>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <Link href="/login" passHref>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                          role="menuitem"
                        >
                          Iniciar sesión
                        </span>
                      </Link>
                      <Link href="/register" passHref>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                          role="menuitem"
                        >
                          Crear cuenta
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4" ref={carDropDownRef}>
              <div className="">
                <button onClick={() => setOpenBag(!openBag)}>
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="text-primary px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center cursor-pointer h-6 w-6"
                  />
                </button>
                {openBag && <Carrito />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
