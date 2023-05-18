import { employeesListAdapter } from '@/adapters'
import { Axios } from '@/apis'

export const URL_EMPLOYEES = {
  default: '/api/v1/empleados'
}

export const listEmployees = (url) =>
  Axios.get(url).then((res) => {
    return employeesListAdapter(res.data)
  })

export const addEmployees = (...args) => {
  console.log(args)
  Axios.post(...args).then((res) => {
    return res.data
  })
}
