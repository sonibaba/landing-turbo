import { LoaderCircle } from 'lucide-react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export default function Spinner({ color = 'text-primary' }: SpinnerProps) {
  return (
    <div className="w-lvw h-lvh absolute top-0 z-20 flex items-center justify-center">
      <div className={`flex justify-center items-center absolute z-30`} role="status">
        <LoaderCircle className={`animate-spin h-16 w-16 ${color}`} aria-hidden="true" />
        <span className="sr-only text-black">Cargando...</span>
      </div>
      <div className="w-full h-full bg-gray-600 opacity-40"></div>
    </div>
  )
}
