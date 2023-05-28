import PropTypes from 'prop-types'
import { Button, Grid, Stack } from '@material-ui/core'
import { Input, RadioGroup } from '@/ui-component'
import { ITEMS_RADIO_GROUP, ROUTES } from '@/constants'
import { LoadingButton } from '@material-ui/lab'
import { Clear, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'

function FormCustomer({ loading }) {
  return (
    <>
      <Grid wrap="wrap" container spacing={2}>
        <Grid item xs={12} md={6}>
          <Input label="Nombre" name="nombre" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Apellido" name="apellido" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Carnet de identidad" name="ci" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Teléfono" name="telefono" />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
        </Grid>
      </Grid>
      <Stack justifyContent={'center'} gap={2}>
        <Button
          startIcon={<Clear />}
          variant="outlined"
          color="error"
          LinkComponent={Link}
          to={ROUTES.customers.default}
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

FormCustomer.propTypes = {
  loading: PropTypes.bool
}

export default FormCustomer
