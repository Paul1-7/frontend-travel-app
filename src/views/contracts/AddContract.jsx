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
import RouteInfo from './RouteInfo'
import { useEffect } from 'react'
import { useRef } from 'react'
import { toast } from 'sonner'

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

  const { matchScheduleToContract } = useContract({
    formMethods,
    routes: routesData.data
  })

  const handleSubmit = (data) => {
    if (matchScheduleToContract()) {
      toast.error('el horario elegido ya no esta disponible')
      return
    }

    const newData = {
      ...data,
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
      <RouteInfo route={selectedRoute.current} sx={{ mb: 6 }} />
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
