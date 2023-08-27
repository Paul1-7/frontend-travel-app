import { getAssignmentsToList } from '@/adapters'
import { Axios } from '@/apis'

export const URL_ASSIGNMENTS = {
  default: '/api/v1/asignaciones'
}

export const listAssignments = () =>
  Axios.get(URL_ASSIGNMENTS.default).then((res) => {
    return getAssignmentsToList(res.data)
  })

export const getAssignmentById = (id) =>
  Axios.get(`${URL_ASSIGNMENTS.default}/${id}`).then((res) => {
    return res.data
  })

export const addAssignment = async ({ data }) => {
  return Axios.post(URL_ASSIGNMENTS.default, data)
}

export const modifyAssignment = async ({ data, id }) => {
  return Axios.put(`${URL_ASSIGNMENTS.default}/${id}`, data)
}
