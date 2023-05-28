import { DASHBOARD } from '@/constants/dashboard'
import {
  DashboardContainer,
  DataTable,
  DialogConfirmation
} from '@/ui-component'
import { COLUMNS_TABLE, TEXT_MODAL } from '@/constants'
import { deletePlace, listPlaces } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import useSnackBarMessage from '@/hooks/useSnackbarMessage'
import { useLocation, useHistory } from 'react-router-dom'
import { useContext } from 'react'
import DataTableContext from '@/contexts/DataTableContext'
import { useResetError } from '@/hooks'

const buttonsActions = { edit: true, remove: true, detail: false }
const Places = () => {
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } =
    useContext(DataTableContext)

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

  const { state, pathname } = useLocation()
  const history = useHistory()

  useResetError({
    fn: resDeletePlaces.reset,
    ctx: [resDeletePlaces]
  })

  useSnackBarMessage({
    successes: [state?.message, resDeletePlaces.data?.message],
    errors: [resDeletePlaces.error?.message]
  })

  if (state?.message) {
    history.replace(pathname)
  }

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
