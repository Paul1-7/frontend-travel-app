import { DEFAULT_VALUE_ITEM } from '@/constants'
import { listContractsByDatesDefault } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { add, isSameDay } from 'date-fns'
import { useState, useEffect } from 'react'

export const useContract = ({ formMethods, routes = [] }) => {
  const [disabledDates, setDisabledDates] = useState([])

  const currentDate = new Date()
  const dateStart = currentDate.toISOString()
  const dateEnd = add(currentDate, { months: 1 }).toISOString()
  const orderBy = 1
  const params = `/?dateStart=${dateStart}&dateEnd=${dateEnd}&orderBy=${orderBy}`

  const contracts = useQuery({
    queryKey: ['listContractsByDatesDefault'],
    queryFn: () => listContractsByDatesDefault(params),
    enabled: false
  })

  const { watch, setValue } = formMethods
  const selectedRoutedId = watch('idRuta')
  const selectedSchedule = watch('idHorarioRuta')
  const selectedDate = watch('fechaSalida')
  const numberOfPeople = watch('cantidadPersonas')

  useEffect(() => {
    if (
      selectedRoutedId === DEFAULT_VALUE_ITEM ||
      !routes.length ||
      isNaN(numberOfPeople)
    )
      return

    const selectedRoute = routes.find(({ id }) => id === selectedRoutedId)
    const { precio } = selectedRoute

    setValue('monto', precio * numberOfPeople)
  }, [selectedRoutedId, routes, numberOfPeople])

  useEffect(() => {
    if (selectedRoutedId === DEFAULT_VALUE_ITEM) return
    contracts.refetch()
  }, [selectedRoutedId, selectedSchedule, selectedDate])

  function matchScheduleToContract() {
    const contract = contracts.data.find(
      ({ idRuta, horariosRuta, fechaSalida }) => {
        const { id: idHorario } = horariosRuta

        return (
          idRuta === selectedRoutedId &&
          idHorario === selectedSchedule &&
          isSameDay(new Date(fechaSalida), selectedDate)
        )
      }
    )

    return !!contract
  }

  useEffect(() => {
    if (!contracts.isSuccess) return

    const dates = contracts.data.filter(
      ({ idRuta }) => idRuta === selectedRoutedId
    )

    setDisabledDates(dates)
  }, [contracts.data, contracts.isSuccess, selectedRoutedId])

  return {
    disabledDates,
    matchScheduleToContract
  }
}
