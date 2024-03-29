import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { DASHBOARD, ROUTES, initialFormDriver } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { addDriver, listVehiclesWithTypeAndBoard } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormDriver from './FormDriver'

const AddDriver = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addDriver({ data })
    }
  })

  const vehicles = useQuery({
    queryFn: listVehiclesWithTypeAndBoard,
    queryKey: ['listVehicles']
  })

  const methods = useForm({
    resolver: yupResolver(schema.drivers),
    defaultValues: initialFormDriver,
    mode: 'all',
    criteriaMode: 'all'
  })

  return (
    <DashboardContainer data={DASHBOARD.drivers.add}>
      <Form methods={methods} onSubmit={mutate}>
        <FormDriver loading={isLoading} vehicles={vehicles.data} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.drivers.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddDriver
