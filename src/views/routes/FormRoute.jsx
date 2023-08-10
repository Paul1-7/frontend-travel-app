import PropTypes from 'prop-types'
import { Button, Grid, Stack, Typography } from '@material-ui/core'
import { Input } from '@/ui-component'
import { ROUTES } from '@/constants'
import { LoadingButton } from '@material-ui/lab'
import { Clear, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import Itinerario from './Itinerario'

function FormRoute({
  loading,
  generateMarkers,
  deleteMarkers,
  routeData,
  placesData,
  isMapLoaded
}) {
  return (
    <>
      <Grid wrap="wrap" container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Datos de la ruta
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Titulo" name="titulo" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Descripción" name="descripcion" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Duracion" name="duracion" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Precio" name="precio" />
        </Grid>
      </Grid>
      <Itinerario
        generateMarkers={generateMarkers}
        deleteMarkers={deleteMarkers}
        routeData={routeData}
        placesData={placesData}
        isMapLoaded={isMapLoaded}
      />
      <Stack justifyContent={'center'} gap={2} flexDirection="row">
        <Button
          startIcon={<Clear />}
          variant="outlined"
          color="error"
          LinkComponent={Link}
          to={ROUTES.routes.default}
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

FormRoute.propTypes = {
  loading: PropTypes.bool,
  generateMarkers: PropTypes.func,
  deleteMarkers: PropTypes.func,
  routeData: PropTypes.object,
  placesData: PropTypes.object,
  isMapLoaded: PropTypes.bool
}

export default FormRoute
