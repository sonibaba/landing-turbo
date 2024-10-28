'use client'

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto">
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
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              onClick={() => {
                localStorage.clear()
                redirect('/')
              }}
              className="text-primary  rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center cursor-pointer h-6 w-6"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
