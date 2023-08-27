import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import {
  DASHBOARD,
  DEFAULT_VALUE_ITEM,
  ROUTES,
  initialFormContract
} from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import {
  addContract,
  listCustomersWithFullName,
  listRoutesWithSchedule
} from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormContract from './FormContract'
import { useContract } from '@/hooks'
import { useEffect } from 'react'
import { useRef } from 'react'
import { setTimeComponentsToAnotherDate } from '@/utils'

const AddContract = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addContract({ data })
    }
  })

  const selectedRoute = useRef(null)

  const customersData = useQuery({
    queryKey: ['listCustomers'],
    queryFn: listCustomersWithFullName
  })

  const routesData = useQuery({
    queryKey: ['listRoutes'],
    queryFn: listRoutesWithSchedule
  })

  const formMethods = useForm({
    resolver: yupResolver(schema.contracts),
    defaultValues: initialFormContract,
    mode: 'all',
    criteriaMode: 'all'
  })
  const idRouteWatched = formMethods.watch('idRuta')
  const selectedIdHorario = formMethods.watch('idHorarioRuta')
  const selectedDate = formMethods.watch('fechaSalida')

  useContract({
    formMethods,
    routes: routesData.data
  })

  const handleSubmit = (data) => {
    // if (matchScheduleToContract()) {
    //   toast.error('el horario elegido ya no esta disponible')
    //   return
    // }

    const selectedSchedule = selectedRoute.current.horariosRuta.find(
      ({ id }) => selectedIdHorario === id
    )

    const { horarioEntrada } = selectedSchedule
    const dateSchedule = new Date(horarioEntrada)

    const newData = {
      ...data,
      fechaSalida: setTimeComponentsToAnotherDate(dateSchedule, selectedDate),
      idCliente: data.idCliente.id,
      idEmpleado: data.idCliente.id
    }
    mutate(newData)
  }

  useEffect(() => {
    if (idRouteWatched === DEFAULT_VALUE_ITEM || !routesData.data.length) {
      selectedRoute.current = null
      return
    }

    selectedRoute.current = routesData.data.find(
      ({ id }) => id === idRouteWatched
    )
  }, [idRouteWatched, routesData.data])

  return (
    <DashboardContainer data={DASHBOARD.contracts.add}>
      <Form methods={formMethods} onSubmit={handleSubmit}>
        <FormContract
          loading={isLoading}
          customers={customersData.data}
          routes={routesData.data}
          route={selectedRoute.current}
        />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.contracts.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddContract
