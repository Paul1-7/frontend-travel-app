import PropTypes from 'prop-types'
import { Button, Grid, Stack } from '@material-ui/core'
import { Input, Select, SelectChip } from '@/ui-component'
import { ROUTES } from '@/constants'
import { LoadingButton } from '@material-ui/lab'
import { Clear, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'

function FormAssigment({
  loading,
  assignmentAvailables = [],
  contracts = [],
  guides = [],
  vehicles = [],
  isDateByDefault = true
}) {
  return (
    <>
      <Grid wrap="wrap" container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Select
            label="asignaciones disponibles"
            name="fecha"
            items={assignmentAvailables}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Cantidad total de personas"
            name="totalPersonas"
            type="number"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Capacidad maxima de personas"
            name="capMaxPersonas"
            type="number"
            disabled
          />
        </Grid>
      </Grid>
      <Grid wrap="wrap" container spacing={2}>
        <Grid item xs={12} md={6}>
          <SelectChip
            label="Contratos"
            name="contratos"
            items={contracts}
            disabled={isDateByDefault}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectChip
            label="Guias"
            name="guias"
            items={guides}
            disabled={isDateByDefault}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectChip
            label="Vehiculos"
            name="vehiculos"
            items={vehicles}
            disabled={isDateByDefault}
          />
        </Grid>
      </Grid>
      <Stack justifyContent={'center'} gap={2} flexDirection="row">
        <Button
          startIcon={<Clear />}
          variant="outlined"
          color="error"
          LinkComponent={Link}
          to={ROUTES.assignments.default}
        >
          Cancelar
        </Button>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<Save />}
          color="secondary"
          variant="outlined"
        >
          Guardar
        </LoadingButton>
      </Stack>
    </>
  )
}

FormAssigment.propTypes = {
  loading: PropTypes.bool,
  contracts: PropTypes.array,
  guides: PropTypes.array,
  vehicles: PropTypes.array,
  assignmentAvailables: PropTypes.array,
  isDateByDefault: PropTypes.bool
}

export default FormAssigment
