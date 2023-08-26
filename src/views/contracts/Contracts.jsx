import { DASHBOARD } from '@/constants/dashboard'
import { DashboardContainer, DataTable } from '@/ui-component'
import { COLUMNS_TABLE } from '@/constants'
import { listContracts } from '@/services'
import { useQuery } from '@tanstack/react-query'

const buttonsActions = { edit: true, remove: false, detail: true }

const Contracts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['listContracts'],
    queryFn: listContracts
  })

  return (
    <DashboardContainer data={DASHBOARD.contracts.default}>
      <DataTable
        columns={COLUMNS_TABLE.contracts}
        rows={data}
        error={error}
        loading={isLoading}
        btnActions={buttonsActions}
        orderByDefault="fecha"
      />
    </DashboardContainer>
  )
}

export default Contracts
