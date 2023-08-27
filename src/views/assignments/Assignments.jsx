import { DASHBOARD } from '@/constants/dashboard'
import { DashboardContainer, DataTable } from '@/ui-component'
import { COLUMNS_TABLE } from '@/constants'
import { listAssignments } from '@/services'
import { useQuery } from '@tanstack/react-query'

const buttonsActions = { edit: true, remove: false, detail: true }

const Assignments = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['listAssignments'],
    queryFn: listAssignments
  })

  return (
    <DashboardContainer data={DASHBOARD.assignments.default}>
      <DataTable
        columns={COLUMNS_TABLE.assignments}
        rows={data}
        error={error}
        loading={isLoading}
        btnActions={buttonsActions}
        orderByDefault="codReferencia"
      />
    </DashboardContainer>
  )
}

export default Assignments
