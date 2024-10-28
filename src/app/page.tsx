'use client'

import Banner from '@/components/home/Banner'
import Footer from '@/components/home/Footer'
import HeroPedido from '@/components/home/HeroPedido'
import Navbar from '@/components/home/Navbar'
import NavbarMobile from '@/components/home/NavbarMobile'
import Productos from '@/components/home/Productos'
import { useAdvancedDevice } from '@/hooks/isMobile'

export default function Home() {
  const isMobile = useAdvancedDevice().isMobile

  return (
    <div>
      <main>
        {isMobile ? <NavbarMobile /> : <Navbar />}
        <Banner />
        <HeroPedido />
        <Productos />
      </main>
      <Footer />
    </div>
  )
}
