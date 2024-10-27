import Banner from '@/components/home/Banner'
import Footer from '@/components/home/Footer'
import HeroPedido from '@/components/home/HeroPedido'
import Navbar from '@/components/home/Navbar'
import Productos from '@/components/home/Productos'

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
        <Banner />
        <HeroPedido />
        <Productos />
      </main>
      <Footer />
    </div>
  )
}
