import { Axios } from '@/apis'

export const URL_AUTH = {
  default: '/api/v1/auth'
}

export const sendCredencials = async ({ data }) => {
  return Axios.post(URL_AUTH.default, data)
}
