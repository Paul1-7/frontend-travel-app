import { Axios } from '@/apis'

export function customResponseWithAxios() {
  Axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const errorMessage =
        error?.response?.data?.message ?? 'Ocurrió un problema'
      throw new Error(errorMessage)
    }
  )
}
