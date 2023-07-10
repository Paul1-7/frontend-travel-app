import { toast } from 'sonner'

export const onResponse = (response) => {
  if (response.data?.message) {
    toast.success(response.data?.message)
  }

  return response
}

export const onResponseError = (error) => {
  const response = error.response?.data
  if (typeof response === 'string') {
    toast.error(response)
    throw response
  }
  if (typeof response === 'object') {
    const errorMesage = response?.message
    toast.error(errorMesage)
    throw errorMesage
  }

  toast.error('Ha ocurrido un error')
  throw error
}

export const onRequest = (config) => {
  return config
}

export const onRequestError = (config) => {
  return config
}
