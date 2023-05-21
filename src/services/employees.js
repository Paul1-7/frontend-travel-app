import { employeesListAdapter } from '@/adapters'
import { Axios } from '@/apis'

export const URL_EMPLOYEES = {
  default: '/api/v1/empleados'
}

export const listEmployees = () =>
  Axios.get(URL_EMPLOYEES.default).then((res) => {
    return employeesListAdapter(res)
  })

export const addEmployees = async ({ data }) => {
  return Axios.post(URL_EMPLOYEES.default, data)
}
