import { DASHBOARD } from '@/constants/dashboard'
import { DashboardContainer, DataTable } from '@/ui-component'
import { COLUMNS_TABLE } from '@/constants'
import { listEmployees } from '@/services'
import { useQuery } from '@tanstack/react-query'
import useSnackBarMessage from '@/hooks/useSnackbarMessage'
import { useLocation, useHistory } from 'react-router-dom'

const buttonsActions = { edit: true, remove: true, detail: false }
const Employees = () => {
  const { state, pathname } = useLocation()
  const history = useHistory()

  const { data, error, isLoading } = useQuery({
    queryKey: ['listEmployees'],
    queryFn: listEmployees
  })
  useSnackBarMessage({
    successes: [state?.message],
    errors: []
  })

  if (state?.message) {
    history.replace(pathname)
  }

  return (
    <DashboardContainer data={DASHBOARD.employees.default}>
      <DataTable
        columns={COLUMNS_TABLE.employees}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={buttonsActions}
        orderByDefault="roles"
      />
    </DashboardContainer>
  )
}

export default Employees
