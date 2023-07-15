import { ITEMS_RADIO_GROUP, ROUTES } from '@/constants'
import { Input, RadioGroup } from '@/ui-component'
import { Button, Grid, Stack } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import { Save } from '@material-ui/icons'
import { LoadingButton } from '@material-ui/lab'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const FormPlaces = ({ loading }) => {
  return (
    <>
      <Grid wrap="wrap" container spacing={2}>
        <Grid item xs={12} md={6}>
          <Input label="Nombre" name="nombre" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Dirección" name="direccion" />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
        </Grid>
      </Grid>
      <Stack justifyContent={'center'} gap={2} flexDirection={'row'}>
        <Button
          startIcon={<Clear />}
          variant="outlined"
          color="error"
          LinkComponent={Link}
          to={ROUTES.places.default}
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

FormPlaces.propTypes = {
  loading: PropTypes.bool
}

export default FormPlaces
