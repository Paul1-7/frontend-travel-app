import { Axios } from '@/apis'

export const URL_DRIVERS = {
  default: '/api/v1/choferes'
}

export const listDrivers = () =>
  Axios.get(URL_DRIVERS.default).then((res) => {
    return res.data
  })

export const getDriverById = (id) =>
  Axios.get(`${URL_DRIVERS.default}/${id}`).then((res) => {
    return res.data
  })

export const addDriver = async ({ data }) => {
  return Axios.post(URL_DRIVERS.default, data)
}

export const modifyDriver = async ({ data, id }) => {
  return Axios.put(`${URL_DRIVERS.default}/${id}`, data)
}

export const deleteDriver = async ({ id }) => {
  return Axios.delete(`${URL_DRIVERS.default}/${id}`)
}
