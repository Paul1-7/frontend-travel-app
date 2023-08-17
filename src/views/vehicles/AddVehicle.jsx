import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { DASHBOARD, ROUTES, initialFormVehicle } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { addVehicle } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormVehicle from './FormVehicle'

const AddVehicle = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addVehicle({ data })
    }
  })

  const methods = useForm({
    resolver: yupResolver(schema.vehicles),
    defaultValues: initialFormVehicle,
    mode: 'all',
    criteriaMode: 'all'
  })

  return (
    <DashboardContainer data={DASHBOARD.vehicles.add}>
      <Form methods={methods} onSubmit={mutate}>
        <FormVehicle loading={isLoading} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.vehicles.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddVehicle
