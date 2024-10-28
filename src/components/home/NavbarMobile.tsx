'use client'

import { faBagShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import MobileEmptyCart from './MobileEmptyCart'

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openBag, setOpenBag] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)

  const carDropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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
    <div className="bg-background">
      <nav className="flex items-center justify-between p-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDrawer}
                className="text-primary mr-4"
              >
                {isOpen ? (
                  <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <div className="text-xl font-bold">
              <Link href="/" className="flex items-center">
                <Image src="logo.svg" alt="Turbo Pizza" width={50} height={36} />
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4 max-w-screen" ref={carDropDownRef}>
            <div className="relative ">
              <button onClick={() => setOpenBag(!openBag)}>
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-primary px-3 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center cursor-pointer h-8 w-8"
                />
              </button>
              {openBag && <MobileEmptyCart />}
            </div>
          </div>
          <SheetContent side="left" className="w-7/12 sm:max-w-none">
            <SheetHeader>
              <SheetTitle>Menú</SheetTitle>
              <SheetDescription>Accede a tu cuenta o crea una nueva.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <Button variant="outline">Iniciar sesión</Button>
              <Button>Crear cuenta</Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default NavbarMobile
