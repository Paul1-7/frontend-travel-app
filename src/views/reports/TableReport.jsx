import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'

const styleTableCell = {
  '@media print': {
    padding: '0.3rem',
    fontSize: '13px'
  }
}

const TableReport = ({ columns = [], rows = [], showAllRows }) => {
  return (
    <TableContainer sx={{ paddingTop: '1rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ displayName }, index) => (
              <TableCell key={index} align="center">
                {displayName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={
                showAllRows && index >= 10
                  ? { display: 'none', displayPrint: 'table-row' }
                  : {}
              }
            >
              {Object.values(row).map((value, index) => (
                <TableCell
                  key={value + index}
                  component="th"
                  scope="row"
                  align="center"
                  sx={styleTableCell}
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

TableReport.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  showAllRows: PropTypes.bool
}

export default TableReport
