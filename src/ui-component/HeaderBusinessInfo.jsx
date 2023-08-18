import PropTypes from 'prop-types'
import { Box, Divider, Stack, Typography } from '@material-ui/core'
import { BUSINESS_INFO } from '@/constants'
import { logo } from '@/assets/images'

const HeaderBusinessInfo = ({ sx }) => {
  const { phone, city, address, cellphone, mail, address2 } = BUSINESS_INFO
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Stack flexDirection="row" justifyContent="space-between">
        <img src={logo} style={{ width: '9rem', height: '100%' }} alt="logo" />
        <Box>
          <Typography
            align="center"
            variant="caption"
            sx={{ display: 'flex', mb: 1 }}
          >
            {`Direc. ${address}`}
            <br />
            {address2}
            <br />
            {`Tel. ${phone} Cel. ${cellphone}`}
            <br />
            {`Ciudad ${city}`}
            <br />
            {`Email: ${mail} `}
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: '#000' }} />
    </Box>
  )
}

HeaderBusinessInfo.propTypes = {
  sx: PropTypes.object
}

export default HeaderBusinessInfo
