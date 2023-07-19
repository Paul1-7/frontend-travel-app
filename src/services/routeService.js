import { getRouteWithItinerario } from '@/adapters'
import { Axios } from '@/apis'

export const URL_ROUTES = {
  default: '/api/v1/rutas'
}

export const listRoutes = () =>
  Axios.get(URL_ROUTES.default).then((res) => {
    return res.data
  })

export const getRouteById = (id) =>
  Axios.get(`${URL_ROUTES.default}/${id}`).then((res) => {
    return getRouteWithItinerario(res.data)
  })

export const addRoute = async ({ data }) => {
  return Axios.post(URL_ROUTES.default, data)
}

export const modifyRoute = async ({ data, id }) => {
  return Axios.put(`${URL_ROUTES.default}/${id}`, data)
}

export const deleteRoute = async ({ id }) => {
  return Axios.delete(`${URL_ROUTES.default}/${id}`)
}
