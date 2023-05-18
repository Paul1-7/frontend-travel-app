import { Link } from 'react-router-dom'
import { ButtonBase } from '@material-ui/core'
import config from '@/config'
import { Logo } from '@/ui-component'

const LogoSection = () => {
  return (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
      <Logo />
    </ButtonBase>
  )
}

export default LogoSection
