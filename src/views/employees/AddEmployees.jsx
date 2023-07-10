import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import schema from '@/schemas'
import { DASHBOARD, ROUTES, initialFormEmployees } from '@/constants'
import FormEmployees from './FormEmployees'
import { DashboardContainer, Form } from '@/ui-component'
import { addEmployees } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { Redirect } from 'react-router-dom'

const AddEmployee = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addEmployees({ data })
    }
  })

  const methods = useForm({
    resolver: yupResolver(schema.empleados),
    defaultValues: initialFormEmployees,
    mode: 'all',
    criteriaMode: 'all'
  })

  return (
    <DashboardContainer data={DASHBOARD.employees.add}>
      <Form methods={methods} onSubmit={mutate}>
        <FormEmployees loading={isLoading} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.employees.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddEmployee
