import { DASHBOARD } from '@/constants/dashboard'
import {
  DashboardContainer,
  DataTable,
  DialogConfirmation
} from '@/ui-component'
import { COLUMNS_TABLE, ROLES, TEXT_MODAL } from '@/constants'
import { deletePlace, listPlaces } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import DataTableContext from '@/contexts/DataTableContext'
import { useAuth } from '@/hooks'

const { GERENTE, ENCARGADO_RUTAS } = ROLES

const Places = () => {
  const { isAllowedRol } = useAuth() ?? {}
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } =
    useContext(DataTableContext)

  const buttonsActions = {
    edit: isAllowedRol([GERENTE, ENCARGADO_RUTAS]),
    remove: isAllowedRol([GERENTE, ENCARGADO_RUTAS]),
    detail: false
  }

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['listPlaces'],
    queryFn: listPlaces
  })

  const resDeletePlaces = useMutation({
    mutationFn: (id) => deletePlace({ id }),
    onSuccess: () => {
      refetch()
    }
  })

  const handleDelete = (id) => {
    resDeletePlaces.mutate(id)
  }

  return (
    <DashboardContainer data={DASHBOARD.places.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeletePlaces.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.places}
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

export default Places
