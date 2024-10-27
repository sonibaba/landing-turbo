import { IRegisterClient } from '@/model/client'
import fetchResponse from '../fetch'

const registerClient = async (
  client: IRegisterClient
): Promise<{ error: boolean; message?: string }> => {
  const response = await fetchResponse('clientes', 'POST', client)
  if (!response) {
    return {
      error: true,
      message: 'Ocurrio un error al crear el cliente',
    }
  }
  return {
    error: false,
    message: 'Cliente creado correctamente',
  }
}

export { registerClient }
