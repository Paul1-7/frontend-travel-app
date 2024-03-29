// material-ui
import { Typography } from '@material-ui/core'

// project imports
import NavGroup from './NavGroup'
import menuItem from '../../../../menu-items'
import { useAuth } from '@/hooks'

//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
  const { isAllowedRol } = useAuth()

  const menus = menuItem.items.map(({ children, ...rest }) => {
    return {
      ...rest,
      children: children.filter(({ allowedRols }) => isAllowedRol(allowedRols))
    }
  })

  const navItems = menus.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        )
    }
  })

  return navItems
}

export default MenuList
