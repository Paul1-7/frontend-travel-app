import { DEFAULT_VALUE_ITEM, initialFormAssignment } from '@/constants'
import {
  listContractsToAssignment,
  listEmployeesToAssignment,
  listVehiclesToAssignment
} from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

function getTotalValues(data = [], source, field) {
  const filteredContracts = data.filter(({ id }) => source.includes(id))

  let total = 0
  filteredContracts.forEach((item) => {
    total += Number(item[field])
  })

  return total
}

export const useAssignment = ({ formMethods }) => {
  const selectedDate = formMethods.watch('fecha')
  const capMaxPersons = formMethods.watch('capMaxPersonas')
  const totalPersons = formMethods.watch('totalPersonas')
  const selectedContracts = formMethods.watch('contratos')
  const selectedVehicles = formMethods.watch('vehiculos')

  const isDateByDefault = selectedDate === DEFAULT_VALUE_ITEM

  const guides = useQuery({
    queryKey: ['listEmployeesToAssignment'],
    queryFn: () => listEmployeesToAssignment(selectedDate),
    enabled: false
  })

  const vehicles = useQuery({
    queryKey: ['listVehiclesToAssignment'],
    queryFn: () => listVehiclesToAssignment(selectedDate),
    enabled: false
  })

  const contracts = useQuery({
    queryKey: ['listContractsToAssignment'],
    queryFn: () => listContractsToAssignment(selectedDate),
    enabled: false
  })

  useEffect(() => {
    if (isDateByDefault) {
      formMethods.reset(initialFormAssignment)
      return
    }

    guides.refetch()
    vehicles.refetch()
    contracts.refetch()
  }, [selectedDate])

  useEffect(() => {
    const capMaxPersons = getTotalValues(
      vehicles.data,
      selectedVehicles,
      'capacidad'
    )

    const totalPersons = getTotalValues(
      contracts.data,
      selectedContracts,
      'cantidadPersonas'
    )

    formMethods.setValue('capMaxPersonas', capMaxPersons)
    formMethods.setValue('totalPersonas', totalPersons)
  }, [selectedContracts, selectedVehicles])

  return {
    guides,
    contracts,
    vehicles,
    capMaxPersons,
    totalPersons,
    isDateByDefault
  }
}
