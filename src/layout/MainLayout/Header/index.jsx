import PropTypes from 'prop-types'

// material-ui
import { makeStyles } from '@material-ui/styles'
import { Avatar, Box, Button, ButtonBase } from '@material-ui/core'

// project imports
import LogoSection from '../LogoSection'
// import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection'

// assets
import { IconMenu2 } from '@tabler/icons'
import { useAuth } from '@/hooks'

// style constant
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: 'all .2s ease-in-out',
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light
    }
  },
  boxContainer: {
    width: '228px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: 'auto'
    }
  }
}))

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle }) => {
  const classes = useStyles()
  const { logout } = useAuth()

  return (
    <>
      {/* logo & toggler button */}
      <div className={classes.boxContainer}>
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            className={classes.headerAvatar}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </div>

      {/* header search */}
      {/* <SearchSection theme="light" /> */}
      <div className={classes.grow} />
      <div className={classes.grow} />

      {/* notification & profile */}
      <Button variant="outlined" color="secondary" onClick={logout}>
        Cerrar sesion
      </Button>
    </>
  )
}

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
}

export default Header
