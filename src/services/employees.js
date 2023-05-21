import { employeesListAdapter } from '@/adapters'
import { Axios } from '@/apis'

export const URL_EMPLOYEES = {
  default: '/api/v1/empleados'
}

export const listEmployees = () =>
  Axios.get(URL_EMPLOYEES.default).then((res) => {
    return employeesListAdapter(res.data)
  })

export const addEmployees = ({ data }) => {
  Axios.post(URL_EMPLOYEES.default, data).then((res) => {
    return res.data
  })
}
