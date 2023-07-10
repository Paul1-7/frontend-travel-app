import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { DASHBOARD, ROUTES, initialFormCustomers } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { addCustomer } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormCustomer from './FormCustomer'

const AddCustomer = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addCustomer({ data })
    }
  })

  const methods = useForm({
    resolver: yupResolver(schema.clientes),
    defaultValues: initialFormCustomers,
    mode: 'all',
    criteriaMode: 'all'
  })

  return (
    <DashboardContainer data={DASHBOARD.customers.add}>
      <Form methods={methods} onSubmit={mutate}>
        <FormCustomer loading={isLoading} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.customers.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddCustomer
