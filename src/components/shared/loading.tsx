import { LoaderCircle } from 'lucide-react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export default function Spinner({ color = 'text-primary' }: SpinnerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-40">
      <div className="flex flex-col items-center justify-center p-4 text-black ">
        <LoaderCircle
          className={`animate-spin h-12 w-12 sm:h-16 sm:w-16 ${color}`}
          aria-hidden="true"
        />
        <span className="mt-2 text-sm sm:text-base text-gray-700">Cargando...</span>
      </div>
    </div>
  )
}
