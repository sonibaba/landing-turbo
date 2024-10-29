import { Alert, AlertDescription } from '@components/ui/alert'
import { XCircle } from 'lucide-react'
import { title } from 'process'

const FormError = ({
  message,
  errors,
}: {
  message?: string
  errors?: Array<string>
  title?: string
}) => {
  return (
    <Alert variant="destructive" className="mt-4">
      <XCircle className="h-4 w-4" />
      {message && <AlertDescription>{message}</AlertDescription>}
      {errors && (
        <div>
          <p className="capitalize">{title}</p>
          <ul>
            {errors.map(error => {
              return (
                <li key={error} className="capitalize">
                  - {error}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </Alert>
  )
}

export default FormError
