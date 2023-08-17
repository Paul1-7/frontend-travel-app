import PropTypes from 'prop-types'
import { Button, Grid, Stack } from '@material-ui/core'
import { Input, Select } from '@/ui-component'
import { ROUTES } from '@/constants'
import { LoadingButton } from '@material-ui/lab'
import { Clear, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'

function FormDriver({ loading, vehicles = [] }) {
  return (
    <>
      <Grid wrap="wrap" container spacing={2}>
        <Grid item xs={12} md={6}>
          <Input label="Nombres" name="nombre" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Apellidos" name="apellido" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Número de licencia" name="numLicencia" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select label="Vehiculo" name="idVehiculo" items={vehicles} />
        </Grid>
      </Grid>
      <Stack justifyContent={'center'} gap={2} flexDirection="row">
        <Button
          startIcon={<Clear />}
          variant="outlined"
          color="error"
          LinkComponent={Link}
          to={ROUTES.drivers.default}
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

FormDriver.propTypes = {
  loading: PropTypes.bool,
  vehicles: PropTypes.array
}

export default FormDriver
