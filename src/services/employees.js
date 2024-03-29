import {
  employeeAdapter,
  employeesListAdapter,
  employeesListToForm
} from '@/adapters'
import { Axios } from '@/apis'

export const URL_EMPLOYEES = {
  default: '/api/v1/empleados',
  noAssignments: '/api/v1/empleados/sin-asignaciones'
}

export const listEmployees = () =>
  Axios.get(URL_EMPLOYEES.default).then((res) => {
    return employeesListAdapter(res.data)
  })

export const listEmployeesToAssignment = (date) =>
  Axios.get(`${URL_EMPLOYEES.noAssignments}/${date}`).then((res) => {
    return employeesListToForm(res.data)
  })

export const getEmployeesById = (id) =>
  Axios.get(`${URL_EMPLOYEES.default}/${id}`).then((res) => {
    return employeeAdapter(res.data)
  })

export const addEmployees = async ({ data }) => {
  return Axios.post(URL_EMPLOYEES.default, data)
}

export const modifyEmployees = async ({ data, id }) => {
  return Axios.put(`${URL_EMPLOYEES.default}/${id}`, data)
}

export const deleteEmployee = async ({ id }) => {
  return Axios.delete(`${URL_EMPLOYEES.default}/${id}`)
}
