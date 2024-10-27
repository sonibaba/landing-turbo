import Navbar from '@/components/dashboard/Navbar'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {children}
    </main>
  )
}

export default RootLayout
