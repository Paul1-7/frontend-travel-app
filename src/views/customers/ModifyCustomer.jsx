import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import schema from '@/schemas'
import { DASHBOARD, ROUTES, initialFormCustomers } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { getCustomerById, modifyCustomer } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSnackbarMessage } from '@/hooks'
import { Redirect, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import FormCustomer from './FormCustomer'

const ModifyCustomer = () => {
  const { id } = useParams()
  const { mutate, isLoading, isSuccess, error, isError, data } = useMutation({
    mutationFn: (data) => {
      return modifyCustomer({ data, id })
    }
  })

  const customer = useQuery({
    queryFn: () => getCustomerById(id),
    queryKey: ['getCustomer']
  })

  useSnackbarMessage({
    errors: [error?.message]
  })

  const methods = useForm({
    resolver: yupResolver(schema.clientes),
    defaultValues: initialFormCustomers,
    mode: 'all',
    criteriaMode: 'all'
  })

  useEffect(() => {
    if (!customer.isSuccess) return

    Object.entries(customer.data).forEach(([key, value]) => {
      methods.setValue(key, value, { shouldValidate: true })
    })
  }, [customer.isSuccess, customer.data])

  return (
    <DashboardContainer data={DASHBOARD.customers.modify}>
      <Form methods={methods} onSubmit={mutate}>
        <FormCustomer loading={isLoading} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.customers.default, state: data }} />
      )}
    </DashboardContainer>
  )
}

export default ModifyCustomer
