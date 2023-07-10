import { ITEMS_RADIO_GROUP } from '@/constants'
import { Input } from '@/ui-component'
import { Grid, RadioGroup } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { LoadingButton } from '@material-ui/lab'
import PropTypes from 'prop-types'

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
          <Input label="Horarios de atención" name="horariosAtencion" />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
      </div>
    </>
  )
}

FormPlaces.propTypes = {
  loading: PropTypes.bool
}

export default FormPlaces
