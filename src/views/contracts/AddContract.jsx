import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { DASHBOARD, ROUTES, initialFormContract } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { addContract, listCustomersWithFullName, listRoutes } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormContract from './FormContract'
import { useContract } from '@/hooks'

const AddDriver = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addContract({ data })
    }
  })

  const customersData = useQuery({
    queryKey: ['listCustomers'],
    queryFn: listCustomersWithFullName
  })

  const routesData = useQuery({
    queryKey: ['listRoutes'],
    queryFn: listRoutes
  })

  const formMethods = useForm({
    resolver: yupResolver(schema.contracts),
    defaultValues: initialFormContract,
    mode: 'all',
    criteriaMode: 'all'
  })

  useContract({ formMethods, routes: routesData.data })

  const handleSubmit = (data) => {
    const newData = {
      ...data,
      idCliente: data.idCliente.id,
      idEmpleado: data.idCliente.id
    }
    mutate(newData)
  }

  return (
    <DashboardContainer data={DASHBOARD.contracts.add}>
      <Form methods={formMethods} onSubmit={handleSubmit}>
        <FormContract
          loading={isLoading}
          customers={customersData.data}
          routes={routesData.data}
        />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.contracts.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddDriver
