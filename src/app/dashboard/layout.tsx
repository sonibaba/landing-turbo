import Navbar from '@/components/dashboard/Navbar'
import { SessionProvider } from 'next-auth/react'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <SessionProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        {children}
      </main>
    </SessionProvider>
  )
}

export default RootLayout
