'use client'

import useStore from '@/hooks/useStore'
import useCartStore from '@/store/useCartStore'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LogOut, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const Navbar = () => {
  const cantidad = useStore(useCartStore, state => state.productos)

  return (
    <nav className="bg-white border-b">
      <div className="w-12/12 mx-2">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <Image
                className="h-8 w-auto"
                src="logo.svg"
                alt="Turbo pizza"
                width={60}
                height={32}
              />
            </Link>
          </div>
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard/carrito">
              <div className="relative inline-flex">
                <ShoppingCart className="h-8 w-auto text-primary pr-2" />
                <div className="absolute -top-2 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cantidad?.length ?? 0}
                </div>
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Hola, Jorge
                  <FontAwesomeIcon icon={faChevronDown} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/logout">
                    <LogOut />
                    <span>Cerrar sesión</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <FontAwesomeIcon
              icon={faSignOutAlt}
              onClick={() => {
                localStorage.clear()
                redirect('/')
              }}
              className="text-primary  rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center cursor-pointer h-6 w-6"
            /> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
