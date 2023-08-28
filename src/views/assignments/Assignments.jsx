import { DASHBOARD } from '@/constants/dashboard'
import { DashboardContainer, DataTable } from '@/ui-component'
import { COLUMNS_TABLE, ROLES } from '@/constants'
import { listAssignments } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks'

const { GERENTE, SECRETARIA } = ROLES

const Assignments = () => {
  const { isAllowedRol } = useAuth() ?? {}
  const { data, error, isLoading } = useQuery({
    queryKey: ['listAssignments'],
    queryFn: listAssignments
  })

  const buttonsActions = {
    edit: isAllowedRol([GERENTE, SECRETARIA]),
    remove: false,
    detail: true
  }

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
