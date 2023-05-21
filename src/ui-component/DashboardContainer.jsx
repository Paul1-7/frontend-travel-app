import PropTypes from 'prop-types'
import { MainCard } from './cards'
import { Grid, Typography } from '@material-ui/core'
import ButtonLink from './ButtonLink'

function DashboardContainer({ data, children }) {
  const { title, description, button } = data
  const { icon: Icon, url, name } = button ?? {}
  return (
    <MainCard>
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>
      <Typography component="p" sx={{ mb: 4 }}>
        {description}
      </Typography>
      {button && (
        <Grid item container direction="row-reverse">
          <ButtonLink to={url} endIcon={<Icon />}>
            {name}
          </ButtonLink>
        </Grid>
      )}
      {children}
    </MainCard>
  )
}

DashboardContainer.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node
}

export default DashboardContainer
