import { getDateLocale } from '@/utils'

export const getContractWithDetails = (contracts) => {
  return contracts.map((contract) => ({
    ...contract,
    cliente: `${contract.cliente.nombre} ${contract.cliente.apellido}`,
    ruta: contract.ruta.titulo
  }))
}

export const getContractsToReport = (contracts) => {
  return contracts.map((contract, index) => {
    const { cliente, monto, cantidadPersonas, fecha, idioma, empleado } =
      contract

    return {
      index: index + 1,
      cliente: `${cliente.nombre} ${cliente.apellido}`,
      monto,
      cantidadPersonas,
      fecha: getDateLocale(fecha),
      idioma,
      empleado: `${empleado.nombre} ${empleado.apellido}`
    }
  })
}
