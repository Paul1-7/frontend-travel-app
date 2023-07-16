import { DASHBOARD } from '@/constants/dashboard'
import {
  DashboardContainer,
  DataTable,
  DialogConfirmation
} from '@/ui-component'
import { COLUMNS_TABLE, TEXT_MODAL } from '@/constants'
import {  deleteDriver, listDrivers } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import DataTableContext from '@/contexts/DataTableContext'

const buttonsActions = { edit: true, remove: true, detail: false }

const Drivers = () => {
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } =
    useContext(DataTableContext)

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['listDrivers'],
    queryFn: listDrivers
  })

  const resDeleteDriver = useMutation({
    mutationFn: (id) => deleteDriver({ id }),
    onSuccess: refetch
  })

  const handleDelete = (id) => {
    resDeleteDriver.mutate(id)
  }

  return (
    <DashboardContainer data={DASHBOARD.drivers.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteDriver.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.drivers}
        rows={data}
        error={error}
        loading={isLoading}
        numeration
        btnActions={buttonsActions}
        orderByDefault="capacidad"
      />
    </DashboardContainer>
  )
}

export default Drivers
