import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import schema from '@/schemas'
import { DASHBOARD, ROUTES, initialFormVehicle } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { getVehicleById, modifyVehicle } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import FormVehicle from './FormVehicle'

const ModifyVehicle = () => {
  const { id } = useParams()
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return modifyVehicle({ data, id })
    }
  })

  const vehicle = useQuery({
    queryFn: () => getVehicleById(id),
    queryKey: ['getVehicle']
  })

  const methods = useForm({
    resolver: yupResolver(schema.vehicles),
    defaultValues: initialFormVehicle,
    mode: 'all',
    criteriaMode: 'all'
  })

  useEffect(() => {
    if (!vehicle.isSuccess) return
    methods.reset(vehicle.data)
  }, [vehicle.isSuccess])

  return (
    <DashboardContainer data={DASHBOARD.vehicles.modify}>
      <Form methods={methods} onSubmit={mutate}>
        <FormVehicle loading={isLoading} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.vehicles.default }} />
      )}
    </DashboardContainer>
  )
}

export default ModifyVehicle
