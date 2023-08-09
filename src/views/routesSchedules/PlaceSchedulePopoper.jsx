import PropTypes from 'prop-types'
import { Popover } from '@/ui-component'
import { Typography } from '@mui/material'

const SchedulePopoper = ({ anchorEl, setAnchorEl, data }) => {
  const { lugar } = data?.extendedProps ?? {}
  return (
    <Popover
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      <Typography variant="caption" textAlign={'center'} color="black">
        <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          {lugar}
        </span>
      </Typography>
    </Popover>
  )
}

SchedulePopoper.propTypes = {
  anchorEl: PropTypes.any,
  setAnchorEl: PropTypes.func,
  data: PropTypes.object
}

export default SchedulePopoper
