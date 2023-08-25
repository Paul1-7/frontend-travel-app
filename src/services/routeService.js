import { getRouteWithDetails, getRoutesWithDetails } from '@/adapters'
import { Axios } from '@/apis'

export const URL_ROUTES = {
  default: '/api/v1/rutas',
  schedule: '/api/v1/rutas/horarios'
}

export const listRoutes = () =>
  Axios.get(URL_ROUTES.default).then((res) => {
    return res.data
  })

export const listRoutesWithDetails = () =>
  Axios.get(URL_ROUTES.default).then((res) => {
    return getRoutesWithDetails(res.data)
  })

export const listRoutesWithSchedule = () =>
  Axios.get(URL_ROUTES.schedule).then((res) => {
    return res.data
  })

export const getRouteById = (id) =>
  Axios.get(`${URL_ROUTES.default}/${id}`).then((res) => {
    return getRouteWithDetails(res.data)
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
