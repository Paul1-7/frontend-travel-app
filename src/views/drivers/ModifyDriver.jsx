import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import schema from '@/schemas'
import { DASHBOARD, ROUTES, initialFormDriver } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import {
  getDriverById,
  listVehiclesWithTypeAndBoard,
  modifyDriver
} from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import FormDriver from './FormDriver'

const ModifyDriver = () => {
  const { id } = useParams()
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return modifyDriver({ data, id })
    }
  })

  const driver = useQuery({
    queryFn: () => getDriverById(id),
    queryKey: ['getDriver']
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

  useEffect(() => {
    if (!driver.isSuccess || !vehicles.isSuccess) return
    methods.reset(driver.data)
  }, [driver.isSuccess, vehicles.isSuccess])

  return (
    <DashboardContainer data={DASHBOARD.drivers.modify}>
      <Form methods={methods} onSubmit={mutate}>
        <FormDriver loading={isLoading} vehicles={vehicles.data} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.drivers.default }} />
      )}
    </DashboardContainer>
  )
}

export default ModifyDriver
