import PropTypes from 'prop-types'
import { Button, Grid, Stack, Typography } from '@material-ui/core'
import {
  AutoComplete,
  DatePicker,
  Input,
  RadioGroup,
  Select
} from '@/ui-component'
import { ITEMS_LANGUAJE, ROUTES } from '@/constants'
import { LoadingButton } from '@material-ui/lab'
import { Clear, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { add } from 'date-fns'
import { getDayNameAndTimeFormat } from '@/utils'

function FormContract({ loading, customers = [], routes = [], route }) {
  const { horariosRuta = [] } = route ?? {}

  const availableSchedule = horariosRuta.map(
    ({ horarioEntrada, horarioSalida, id }) => ({
      id,
      value: getDayNameAndTimeFormat(horarioEntrada, horarioSalida)
    })
  )

  return (
    <>
      <Grid wrap="wrap" container spacing={2}>
        <Grid item xs={12} md={6}>
          <AutoComplete label="cliente" name="idCliente" items={customers} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select label="Ruta" name="idRuta" items={routes} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input
            label="Cantidad de personas"
            name="cantidadPersonas"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input label="Monto total" name="monto" type="number" disabled />
        </Grid>

        <Grid item xs={12} md={6}>
          <Select label="Idioma" name="idioma" items={ITEMS_LANGUAJE} />
        </Grid>
      </Grid>

      <Grid wrap="wrap" container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Horario de partida
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="Fecha"
            name="fecha"
            disablePast
            maxDate={add(new Date(), { months: 1 })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadioGroup
            items={availableSchedule}
            label={'Horarios disponibles'}
            name={'idHorarioRuta'}
          />
        </Grid>
      </Grid>

      <Stack justifyContent={'center'} gap={2} flexDirection="row">
        <Button
          startIcon={<Clear />}
          variant="outlined"
          color="error"
          LinkComponent={Link}
          to={ROUTES.contracts.default}
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

FormContract.propTypes = {
  loading: PropTypes.bool,
  customers: PropTypes.array,
  routes: PropTypes.array,
  route: PropTypes.any
}

export default FormContract
