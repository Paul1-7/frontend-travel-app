import PropTypes from 'prop-types'
import React from 'react'

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles'
import { Avatar, Box, Drawer, useMediaQuery } from '@material-ui/core'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'
import { BrowserView, MobileView } from 'react-device-detect'

// project imports
import MenuList from './MenuList'
import LogoSection from '../LogoSection'
// import MenuCard from './MenuCard';
import { drawerWidth } from '../../../store/constant'
import { useAuth } from '@/hooks'
import { deepOrange } from '@material-ui/core/colors'
import { ROLES } from '@/constants'

// style constant
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRight: 'none',
    [theme.breakpoints.up('md')]: {
      top: '88px'
    }
  },
  ScrollHeight: {
    height: 'calc(100vh - 88px)',
    paddingLeft: '16px',
    paddingRight: '16px',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px)'
    }
  },
  boxContainer: {
    display: 'flex',
    padding: '16px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}))

function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

function nameRols(roles) {
  const gerente = roles.find((rol) => rol.id === ROLES.GERENTE)
  if (gerente) {
    return gerente.nombre
  }

  let nameRols = ''
  roles.forEach((rol) => {
    if (rol.nombre !== 'Cliente') {
      nameRols += rol.nombre + ' '
    }
  })

  return nameRols
}

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { authenticated } = useAuth()

  const { nombre, apellido, roles } = authenticated ?? {}

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))

  const drawer = (
    <React.Fragment>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <div className={classes.boxContainer}>
          <LogoSection />
        </div>
      </Box>
      <BrowserView>
        <PerfectScrollbar component="div" className={classes.ScrollHeight}>
          <Box
            sx={{
              mt: 2,
              p: 4,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '0.5rem'
            }}
          >
            <Avatar
              {...stringAvatar(`${nombre} ${apellido}`)}
              sx={{ bgcolor: deepOrange[500], color: 'white', mx: 'auto' }}
            />

            <span
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
            >{`${nombre} ${apellido}`}</span>
            <span
              style={{
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {nameRols(roles)}
            </span>
          </Box>
          <MenuList />
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          {/* <MenuCard /> */}
        </Box>
      </MobileView>
    </React.Fragment>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </nav>
  )
}

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
}

export default Sidebar
