import { getDateLocale } from '@/utils'

export const getContractWithDetails = (contracts) => {
  return contracts.map((contract) => ({
    ...contract,
    cliente: `${contract.cliente.nombre} ${contract.cliente.apellido}`,
    ruta: contract.ruta.titulo
  }))
}

export const getContractsToAssignment = (contracts) => {
  return contracts.map(({ fechaSalida, ruta, cantidadRegistros }) => ({
    id: fechaSalida,
    value: `${ruta.titulo} - restantes: ${cantidadRegistros}`
  }))
}

export const getContractsToForm = (contracts) => {
  return contracts.map(({ id, codReferencia, cantidadPersonas }) => ({
    id,
    value: `${codReferencia} - cant. personas: ${cantidadPersonas}`,
    cantidadPersonas
  }))
}

export const getContractsToReport = (contracts) => {
  let total = 0
  const data = contracts.map((contract, index) => {
    const { cliente, monto, cantidadPersonas, fecha, idioma, empleado } =
      contract
    total += monto

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

  return {
    data,
    total
  }
}

export const getCustomersMoreContracts = (contracts) => {
  const data = contracts.map((contract, index) => {
    const { clienteNombre, contractCount, clienteApellido } = contract

    return {
      index: index + 1,
      cliente: `${clienteNombre} ${clienteApellido}`,
      contratos: contractCount
    }
  })

  return {
    data
  }
}
