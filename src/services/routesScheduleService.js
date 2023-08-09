import { routesSchedulesListToDetail } from '@/adapters'
import { Axios } from '@/apis'

export const URL_ROUTES_SCHEDULE = {
  default: '/api/v1/horarios-rutas'
}

export const listRoutesSchedules = () =>
  Axios.get(URL_ROUTES_SCHEDULE.default).then((res) => {
    return res.data
  })

export const routesSchedulesListDetail = async () => {
  const response = await Axios.get(URL_ROUTES_SCHEDULE.default)
  return routesSchedulesListToDetail(response.data)
}

export const getRoutessScheduleById = (id) =>
  Axios.get(`${URL_ROUTES_SCHEDULE.default}/${id}`).then((res) => {
    return res.data
  })

export const addRoutessSchedule = async ({ data }) => {
  return Axios.post(URL_ROUTES_SCHEDULE.default, data)
}

export const modifyRoutessSchedule = async ({ data, id }) => {
  return Axios.put(`${URL_ROUTES_SCHEDULE.default}/${id}`, data)
}

export const deleteRoutessSchedule = async ({ id }) => {
  return Axios.delete(`${URL_ROUTES_SCHEDULE.default}/${id}`)
}
