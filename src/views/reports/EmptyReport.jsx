import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

export const EmptyReport = ({ message }) => {
  return (
    <Typography align="center" variant="body2" sx={{ pt: 2 }}>
      {message ?? 'No hay registros con los criterios definidos'}
    </Typography>
  )
}

EmptyReport.propTypes = {
  message: PropTypes.string
}
