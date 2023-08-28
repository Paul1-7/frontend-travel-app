import { useAuth } from '@/hooks'
import { getDateTimeFormat } from '@/utils'
import { Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const ReportSummary = ({
  sortOptions,
  frequencyOptions,
  watchedFormValues
}) => {
  const { authenticated } = useAuth() ?? {}
  const { nombre, apellido } = authenticated ?? {}

  return (
    <Grid container wrap="wrap">
      <Grid item xs={6}>
        <Typography
          variant="body2"
          sx={{ lineHeight: 1.5, color: 'black' }}
        >{`Ordenado por: ${
          sortOptions.find(({ id }) => id === watchedFormValues.orderBy)
            ?.name ?? ''
        }`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="body2"
          sx={{ lineHeight: 1.5, color: 'black' }}
        >{`Criterio: ${
          frequencyOptions.find(({ id }) => id === watchedFormValues.criterio)
            ?.name ?? ''
        }`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.5,
            display: 'none',
            displayPrint: 'inherit',
            color: 'black'
          }}
        >{`Fecha del reporte: ${getDateTimeFormat(new Date())}`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: 'none', displayPrint: 'inherit' }}>
        <Typography
          variant="body2"
          sx={{ lineHeight: 1.5, color: 'black' }}
        >{`Realizado por: ${nombre} ${apellido}`}</Typography>
      </Grid>
    </Grid>
  )
}

ReportSummary.propTypes = {
  sortOptions: PropTypes.array,
  frequencyOptions: PropTypes.array,
  watchedFormValues: PropTypes.object
}

export default ReportSummary
