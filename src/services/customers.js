import { getCustomerWithFullName } from '@/adapters'
import { Axios } from '@/apis'

export const URL_CUSTOMERS = {
  default: '/api/v1/clientes'
}

export const listCustomers = () =>
  Axios.get(URL_CUSTOMERS.default).then((res) => {
    return res.data
  })

export const listCustomersWithFullName = () =>
  Axios.get(URL_CUSTOMERS.default).then((res) => {
    return getCustomerWithFullName(res.data)
  })

export const getCustomerById = (id) =>
  Axios.get(`${URL_CUSTOMERS.default}/${id}`).then((res) => {
    return res.data
  })

export const addCustomer = async ({ data }) => {
  return Axios.post(URL_CUSTOMERS.default, data)
}

export const modifyCustomer = async ({ data, id }) => {
  return Axios.put(`${URL_CUSTOMERS.default}/${id}`, data)
}

export const deleteCustomer = async ({ id }) => {
  return Axios.delete(`${URL_CUSTOMERS.default}/${id}`)
}
