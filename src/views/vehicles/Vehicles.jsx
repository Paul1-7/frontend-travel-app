import { DASHBOARD } from '@/constants/dashboard'
import {
  DashboardContainer,
  DataTable,
  DialogConfirmation
} from '@/ui-component'
import { COLUMNS_TABLE, TEXT_MODAL } from '@/constants'
import { deleteVehicle, listVehicles } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import DataTableContext from '@/contexts/DataTableContext'

const buttonsActions = { edit: true, remove: true, detail: false }

const Vehicles = () => {
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } =
    useContext(DataTableContext)

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['listVehicles'],
    queryFn: listVehicles
  })

  const resDeleteVehicle = useMutation({
    mutationFn: (id) => deleteVehicle({ id }),
    onSuccess: refetch
  })

  const handleDelete = (id) => {
    resDeleteVehicle.mutate(id)
  }

  return (
    <DashboardContainer data={DASHBOARD.vehicles.default}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={resDeleteVehicle.isLoading}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <DataTable
        columns={COLUMNS_TABLE.vehicles}
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

export default Vehicles
