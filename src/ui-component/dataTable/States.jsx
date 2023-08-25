import { TableCell } from '@material-ui/core'

import PropTypes from 'prop-types'
import Label from '../Label'
import { TABLE_STATES } from '../../constants/dataTable'

const States = ({ value, align }) => {
  const states = TABLE_STATES.active
  return (
    <TableCell align={align}>
      <Label color={states?.[value]?.variant}>{states?.[value]?.name}</Label>
    </TableCell>
  )
}

export default States

States.propTypes = {
  value: PropTypes.any,
  align: PropTypes.string
}
