import { DASHBOARD } from '@/constants/dashboard'
import {
  DashboardContainer,
  DataTable,
  DialogConfirmation
} from '@/ui-component'
import { COLUMNS_TABLE, TEXT_MODAL } from '@/constants'
import { deleteRoute, listRoutes } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import DataTableContext from '@/contexts/DataTableContext'

const buttonsActions = { edit: true, remove: true, detail: true }

const Routes = () => {
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } =
    useContext(DataTableContext)

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['listRoutes'],
    queryFn: listRoutes
  })

  const resDeleteRoute = useMutation({
    mutationFn: (id) => deleteRoute({ id }),
    onSuccess: refetch
  })

  const handleDelete = (id) => {
    resDeleteRoute.mutate(id)
  }

  return (
    <DashboardContainer data={DASHBOARD.routes.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteRoute.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.routes}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={buttonsActions}
        orderByDefault="titulo"
      />
    </DashboardContainer>
  )
}

export default Routes
