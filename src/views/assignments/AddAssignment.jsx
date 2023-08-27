import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { DASHBOARD, ROUTES, initialFormAssignment } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { addAssignment, listContractsAvailable } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormAssignment from './FormAssignment'
import { useAssignment } from '@/hooks'

const AddAssignment = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addAssignment({ data })
    }
  })

  const assignmentsAvailable = useQuery({
    queryKey: ['listCustomers'],
    queryFn: listContractsAvailable
  })

  const formMethods = useForm({
    resolver: yupResolver(schema.assignments),
    defaultValues: initialFormAssignment,
    mode: 'all',
    criteriaMode: 'all'
  })

  const { contracts, guides, vehicles, isDateByDefault } = useAssignment({
    formMethods
  })

  const handleSubmit = (data) => {
    mutate(data)
  }

  return (
    <DashboardContainer data={DASHBOARD.assignments.add}>
      <Form methods={formMethods} onSubmit={handleSubmit}>
        <FormAssignment
          loading={isLoading}
          contracts={contracts.data}
          guides={guides.data}
          vehicles={vehicles.data}
          isDateByDefault={isDateByDefault}
          assignmentAvailables={assignmentsAvailable.data}
        />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.assignments.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddAssignment
