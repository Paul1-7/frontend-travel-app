import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import { useEffect } from 'react'
import { Select } from '@/ui-component'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { Add } from '@material-ui/icons'
import PropTypes from 'prop-types'
import schema from '@/schemas'

const initialForm = {
  idLugar: '0'
}

const Itinerario = ({
  generateMarkers,
  deleteMarkers,
  routeData = {},
  placesData,
  isMapLoaded
}) => {
  const { control, formState, register } = useFormContext()
  const { errors } = formState
  const itinerarioError = errors?.itinerarios?.message
  const placesWatch = useWatch({
    control,
    name: 'itinerarios'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itinerarios'
  })

  useEffect(() => {
    if (
      !placesData.isSuccess ||
      (!routeData?.isSuccess && typeof routeData?.isSuccess === 'boolean') ||
      !isMapLoaded
    )
      return

    const idPlaces = placesWatch.map(({ idLugar }) => idLugar)

    const markers = placesData.data
      .filter(({ id }) => idPlaces.includes(id))
      .map(({ lng, lat, nombre }) => ({
        lngLat: [lng, lat],
        label: nombre
      }))

    deleteMarkers()
    generateMarkers(markers)
  }, [placesWatch, placesData.isSuccess, routeData?.isSuccess, isMapLoaded])

  useEffect(() => {
    register('itinerarios', schema.rutas)
  }, [register])

  return (
    <>
      <Grid item container alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Itinerarios
          </Typography>
        </Grid>
        <Grid item>
          <Button
            aria-label="add"
            startIcon={<Add />}
            color="secondary"
            onClick={() => append(initialForm)}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item>
          <FormHelperText error color="error">
            {itinerarioError}
          </FormHelperText>
        </Grid>
      </Grid>
      <Grid item>
        {fields.map((item, index) => {
          return (
            <FormControl
              disabled={placesData.isLoading}
              sx={{ width: '100%' }}
              key={item.id}
            >
              <Grid wrap="wrap" container spacing={1}>
                <Grid item sx={{ mt: 1 }}>
                  <IconButton
                    color="secondary"
                    aria-label="remove an item"
                    size="small"
                    onClick={() => {
                      remove(index)
                    }}
                  >
                    <HighlightOffIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={5}>
                  <Select
                    propsContainer={{ sx: { mt: 1 } }}
                    name={`itinerarios.${index}.idLugar`}
                    label="Lugar"
                    isArray
                    items={placesData.data}
                  />
                </Grid>
              </Grid>
            </FormControl>
          )
        })}
      </Grid>
    </>
  )
}

Itinerario.propTypes = {
  generateMarkers: PropTypes.func,
  deleteMarkers: PropTypes.func,
  routeData: PropTypes.object,
  placesData: PropTypes.object,
  isMapLoaded: PropTypes.bool
}

export default Itinerario
