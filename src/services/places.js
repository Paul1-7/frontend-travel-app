import { Axios } from '@/apis'

export const URL_PLACES = {
  default: '/api/v1/lugares'
}

export const listPlaces = () =>
  Axios.get(URL_PLACES.default).then((res) => {
    return res.data
  })

export const getPlaceById = (id) =>
  Axios.get(`${URL_PLACES.default}/${id}`).then((res) => {
    return res.data
  })

export const addPlace = async ({ data }) => {
  return Axios.post(URL_PLACES.default, data)
}

export const modifyPlace = async ({ data, id }) => {
  return Axios.put(`${URL_PLACES.default}/${id}`, data)
}

export const deletePlace = async ({ id }) => {
  return Axios.delete(`${URL_PLACES.default}/${id}`)
}
