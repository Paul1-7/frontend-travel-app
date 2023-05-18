import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import schema from '../../schemas'
import { Report } from 'notiflix/build/notiflix-report-aio'
import { DASHBOARD, initialFormEmployees } from '@/constants'
import FormEmployees from './FormEmployees'
import { DashboardContainer, Form } from '@/ui-component'
import { useSWRConfig } from 'swr'
import { URL_EMPLOYEES, addEmployees } from '@/services'

const AddEmployee = () => {
  const { mutate } = useSWRConfig()

  const methods = useForm({
    resolver: yupResolver(schema.empleados),
    defaultValues: initialFormEmployees,
    mode: 'all',
    criteriaMode: 'all'
  })

  const onSubmit = (data) => {
    console.log('TCL: onSubmit -> data', data)
    mutate(URL_EMPLOYEES.default, addEmployees(data), {
      revalidate: false,
      rollbackOnError: true,
      populateCache: true
    })
  }

  return (
    <DashboardContainer data={DASHBOARD.employees.add}>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormEmployees loading={false} />
      </Form>
    </DashboardContainer>
  )
}

export default AddEmployee
