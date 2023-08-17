import PropTypes from 'prop-types'
import { Button, Grid, Stack } from '@material-ui/core'
import { Input, Select } from '@/ui-component'
import { ITEMS_VEHICLES_TYPE, ROUTES } from '@/constants'
import { LoadingButton } from '@material-ui/lab'
import { Clear, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'

function FormVehicle({ loading }) {
  return (
    <>
      <Grid wrap="wrap" container spacing={2}>
        <Grid item xs={12} md={6}>
          <Input label="Modelo" name="modelo" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Placa" name="placa" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select label="Tipo" name="tipo" items={ITEMS_VEHICLES_TYPE} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Capacidad (personas)"
            name="capacidad"
            type={'number'}
          />
        </Grid>
      </Grid>
      <Stack justifyContent={'center'} gap={2} flexDirection="row">
        <Button
          startIcon={<Clear />}
          variant="outlined"
          color="error"
          LinkComponent={Link}
          to={ROUTES.vehicles.default}
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

FormVehicle.propTypes = {
  loading: PropTypes.bool
}

export default FormVehicle
