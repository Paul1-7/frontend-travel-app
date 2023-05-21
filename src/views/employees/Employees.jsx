import { DASHBOARD } from '@/constants/dashboard'
import { DashboardContainer, DataTable } from '@/ui-component'
import { COLUMNS_TABLE } from '@/constants'
import { listEmployees } from '@/services'
import { useQuery } from '@tanstack/react-query'

const buttonsActions = { edit: true, remove: true, detail: false }
const Employees = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['listEmployees'],
    queryFn: listEmployees
  })

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
