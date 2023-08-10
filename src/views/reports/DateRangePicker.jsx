import { DatePicker } from '@/ui-component'
import { Grid, Typography } from '@material-ui/core'

const DateRangePicker = () => {
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" sx={{ displayPrint: 'none', pb: 3 }}>
        Seleccione el rango de fechas
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DatePicker label="Fecha de inicio" name="dateStart" isArray />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker label="Fecha de finalización" name="dateEnd" isArray />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DateRangePicker
