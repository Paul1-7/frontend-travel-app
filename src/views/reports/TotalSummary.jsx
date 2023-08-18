import { getBOBCurrency } from '@/utils'
import { Stack, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const TotalSummary = ({ total = 0 }) => {
  return (
    <Stack sx={{ pt: 4, pr: 4 }} alignItems={'flex-end'}>
      <Typography variant="h4" width={'max-content'}>
        Total: {getBOBCurrency(total)}
      </Typography>
    </Stack>
  )
}

TotalSummary.propTypes = {
  total: PropTypes.number
}

export default TotalSummary
