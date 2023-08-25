import { getDayNameAndTimeFormat } from '@/utils'
import { Card, CardContent, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const RouteInfo = ({ route = {}, sx = {} }) => {
  const { horariosRuta = [], titulo } = route ?? {}

  return (
    <Card
      sx={{
        minHeight: '10rem',
        boxShadow: '9px 10px 12px -5px rgba(0,0,0,0.32)',
        ...sx
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h4" component={'h2'} sx={{ width: '100%', pb: 2 }}>
          Itinerario de la ruta: {titulo ?? 'ninguno'}
        </Typography>
        <Typography variant="h5" component={'h3'} sx={{ width: '100%', pb: 2 }}>
          Horarios
        </Typography>
        {horariosRuta.map(({ horarioEntrada, horarioSalida, id }, idx) => (
          <Typography key={id} sx={{ pb: 1 }}>{`${
            idx + 1
          }. ${getDayNameAndTimeFormat(
            horarioEntrada,
            horarioSalida
          )} `}</Typography>
        ))}
      </CardContent>
    </Card>
  )
}

RouteInfo.propTypes = {
  route: PropTypes.object,
  sx: PropTypes.object
}

export default RouteInfo
