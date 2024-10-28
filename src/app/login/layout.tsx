'use client'

import Navbar from '@/components/home/Navbar'
import NavbarMobile from '@/components/home/NavbarMobile'
import { useAdvancedDevice } from '@/hooks/isMobile'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const isMobile = useAdvancedDevice().isMobile

  return (
    <main className="min-h-screen bg-background">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      {children}
    </main>
  )
}

export default RootLayout
