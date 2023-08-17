import {
  employeeAdapter,
  getContractWithDetails,
  getContractsToReport
} from '@/adapters'
import { Axios } from '@/apis'

export const URL_CONTRACTS = {
  default: '/api/v1/contratos',
  report: '/api/v1/contratos/reportes'
}

export const listContracts = () =>
  Axios.get(URL_CONTRACTS.default).then((res) => {
    return getContractWithDetails(res.data)
  })

export const listContractsByDates = (params) =>
  Axios.get(`${URL_CONTRACTS.report}${params}`).then((res) => {
    return getContractsToReport(res.data)
  })

export const getContractById = (id) =>
  Axios.get(`${URL_CONTRACTS.default}/${id}`).then((res) => {
    return employeeAdapter(res.data)
  })

export const addContract = async ({ data }) => {
  return Axios.post(URL_CONTRACTS.default, data)
}

export const modifyContract = async ({ data, id }) => {
  return Axios.put(`${URL_CONTRACTS.default}/${id}`, data)
}