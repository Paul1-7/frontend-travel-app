import { DASHBOARD } from '@/constants/dashboard'
import {
  DashboardContainer,
  DataTable,
  DialogConfirmation
} from '@/ui-component'
import { COLUMNS_TABLE, TEXT_MODAL } from '@/constants'
import { deleteEmployee, listEmployees } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import DataTableContext from '@/contexts/DataTableContext'

const buttonsActions = { edit: true, remove: true, detail: false }
const Employees = () => {
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } =
    useContext(DataTableContext)

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['listEmployees'],
    queryFn: listEmployees
  })

  const resDeleteEmployee = useMutation({
    mutationFn: (id) => deleteEmployee({ id }),
    onSuccess: refetch
  })

  const handleDelete = (id) => {
    resDeleteEmployee.mutate(id)
  }

  return (
    <DashboardContainer data={DASHBOARD.employees.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteEmployee.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
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
