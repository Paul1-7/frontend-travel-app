import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ButtonLink = (props) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      LinkComponent={Link}
      {...props}
    />
  )
}

export default ButtonLink
