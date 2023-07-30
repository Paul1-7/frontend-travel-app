import { placesSchedulesListToDetail } from '@/adapters'
import { Axios } from '@/apis'

export const URL_PlACES_SCHEDULE = {
  default: '/api/v1/horarios-lugares'
}

export const listPlaceSchedules = () =>
  Axios.get(URL_PlACES_SCHEDULE.default).then((res) => {
    return res.data
  })

export const placesSchedulesListDetail = async () => {
  const response = await Axios.get(URL_PlACES_SCHEDULE.default)
  return placesSchedulesListToDetail(response.data)
}

export const getPlacesScheduleById = (id) =>
  Axios.get(`${URL_PlACES_SCHEDULE.default}/${id}`).then((res) => {
    return res.data
  })

export const addPlacesSchedule = async ({ data }) => {
  return Axios.post(URL_PlACES_SCHEDULE.default, data)
}

export const modifyPlacesSchedule = async ({ data, id }) => {
  return Axios.put(`${URL_PlACES_SCHEDULE.default}/${id}`, data)
}

export const deletePlacesSchedule = async ({ id }) => {
  return Axios.delete(`${URL_PlACES_SCHEDULE.default}/${id}`)
}
