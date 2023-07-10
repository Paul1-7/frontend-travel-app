import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import schema from '@/schemas'
import { DASHBOARD, ROUTES, initialFormEmployees } from '@/constants'
import FormEmployees from './FormEmployees'
import { DashboardContainer, Form } from '@/ui-component'
import { getEmployeesById, modifyEmployees } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const ModifyEmployees = () => {
  const { id } = useParams()
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return modifyEmployees({ data, id })
    }
  })

  const employee = useQuery({
    queryFn: () => getEmployeesById(id),
    queryKey: ['employee']
  })

  const methods = useForm({
    resolver: yupResolver(schema.empleados),
    defaultValues: initialFormEmployees,
    mode: 'all',
    criteriaMode: 'all'
  })

  useEffect(() => {
    if (!employee.isSuccess) return

    Object.entries(employee.data).forEach(([key, value]) => {
      if (key === 'password') {
        methods.setValue(key, '')
        methods.setValue('oldPassword', value)
        return
      }

      methods.setValue(key, value, { shouldValidate: true })
    })
  }, [employee.isSuccess, employee.data])

  return (
    <DashboardContainer data={DASHBOARD.employees.modify}>
      <Form methods={methods} onSubmit={mutate}>
        <FormEmployees loading={isLoading} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.employees.default }} />
      )}
    </DashboardContainer>
  )
}

export default ModifyEmployees
