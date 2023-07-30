import PropTypes from 'prop-types'
import { Popover as PopoverMui, Typography } from '@material-ui/core'

const Popover = ({ anchorEl, handlePopoverClose, open, children }) => {
  return (
    <PopoverMui
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none'
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1 }}>{children}</Typography>
    </PopoverMui>
  )
}

Popover.propTypes = {
  anchorEl: PropTypes.object,
  handlePopoverClose: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.node
}

export default Popover
