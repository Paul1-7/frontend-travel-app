import { DASHBOARD } from '@/constants/dashboard'
import {
  DashboardContainer,
  DataTable,
  DialogConfirmation
} from '@/ui-component'
import { COLUMNS_TABLE, TEXT_MODAL } from '@/constants'
import { deleteCustomer, listCustomers } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import useSnackBarMessage from '@/hooks/useSnackbarMessage'
import { useLocation, useHistory } from 'react-router-dom'
import { useContext } from 'react'
import DataTableContext from '@/contexts/DataTableContext'
import { useResetError } from '@/hooks'

const buttonsActions = { edit: true, remove: true, detail: false }
const Employees = () => {
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } =
    useContext(DataTableContext)

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['listCustomers'],
    queryFn: listCustomers
  })

  const resDeleteCustomer = useMutation({
    mutationFn: (id) => deleteCustomer({ id }),
    onSuccess: () => {
      refetch()
    }
  })

  const { state, pathname } = useLocation()
  const history = useHistory()

  useResetError({
    fn: resDeleteCustomer.reset,
    ctx: [resDeleteCustomer]
  })

  useSnackBarMessage({
    successes: [state?.message, resDeleteCustomer.data?.message],
    errors: [resDeleteCustomer.error?.message]
  })

  if (state?.message) {
    history.replace(pathname)
  }

  const handleDelete = (id) => {
    resDeleteCustomer.mutate(id)
  }

  return (
    <DashboardContainer data={DASHBOARD.customers.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteCustomer.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.customers}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={buttonsActions}
        orderByDefault="nombre"
      />
    </DashboardContainer>
  )
}

export default Employees
