import { getVehiclesWithTypeAndCapacity } from '@/adapters'
import { Axios } from '@/apis'

export const URL_VEHICLES = {
  default: '/api/v1/vehiculos',
  noAssignments: '/api/v1/vehiculos/sin-asignaciones'
}

export const listVehicles = () =>
  Axios.get(URL_VEHICLES.default).then((res) => {
    return res.data
  })

export const listVehiclesToAssignment = (date) =>
  Axios.get(`${URL_VEHICLES.noAssignments}/${date}`).then((res) => {
    return getVehiclesWithTypeAndCapacity(res.data)
  })

export const listVehiclesWithTypeAndBoard = () =>
  Axios.get(URL_VEHICLES.default).then((res) => {
    return getVehiclesWithTypeAndCapacity(res.data)
  })

export const getVehicleById = (id) =>
  Axios.get(`${URL_VEHICLES.default}/${id}`).then((res) => {
    return res.data
  })

export const addVehicle = async ({ data }) => {
  return Axios.post(URL_VEHICLES.default, data)
}

export const modifyVehicle = async ({ data, id }) => {
  return Axios.put(`${URL_VEHICLES.default}/${id}`, data)
}

export const deleteVehicle = async ({ id }) => {
  return Axios.delete(`${URL_VEHICLES.default}/${id}`)
}
