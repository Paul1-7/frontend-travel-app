import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core'
import { PictureAsPdf } from '@material-ui/icons'
import CsvDownloader from 'react-csv-downloader'
import { TableView } from '@material-ui/icons'

export const ButtonsReport = ({
  columnsCSV,
  handlePrint,
  dataCSV,
  fileName
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        displayPrint: 'none'
      }}
    >
      <Button
        type="button"
        startIcon={<PictureAsPdf />}
        variant="outlined"
        onClick={handlePrint}
        color="secondary"
      >
        Reporte en PDF
      </Button>
      <CsvDownloader
        datas={dataCSV}
        columns={columnsCSV}
        filename={fileName}
        extension=".csv"
        separator=","
      >
        <Button startIcon={<TableView />} variant="outlined" color="secondary">
          Reporte en CSV
        </Button>
      </CsvDownloader>
    </Box>
  )
}

ButtonsReport.propTypes = {
  columnsCSV: PropTypes.array,
  handlePrint: PropTypes.func,
  dataCSV: PropTypes.array,
  fileName: PropTypes.string
}
