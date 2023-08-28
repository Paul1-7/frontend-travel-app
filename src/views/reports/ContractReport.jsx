import {
  COLUMNS_CONTRACTS_REPORT,
  COLUMNS_CUSTOMER_MORE_CONTRACTS_REPORT,
  COLUMNS_ROUTES_MORE_CONTRACTS_REPORT,
  CONTRACTS_REPORT_SORT_OPTIONS,
  DASHBOARD,
  REPORT_FREQUENCY_OPTIONS,
  initialFormContractReport
} from '@/constants'
import { usePrint, useReport } from '@/hooks'
import schema from '@/schemas'
import {
  DashboardContainer,
  Form,
  HeaderBusinessInfo,
  Loader,
  Select
} from '@/ui-component'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { EmptyReport } from './EmptyReport'
import { useQuery } from '@tanstack/react-query'
import { ButtonsReport } from './ButtonsReport'
import {
  listContractsByDates,
  listCustomerByAmountContrats,
  listRouteByAmountContrats
} from '@/services'
import DateRangePicker from './DateRangePicker'
import ReportSummary from './ReportSummary'
import TableReport from './TableReport'
import TotalSummary from './TotalSummary'

const sxNoPrint = {
  '@media print': {
    display: 'none'
  }
}

function getColumnsToReport(watchedValues) {
  const selectedValue = watchedValues.options.orderBy
  if (selectedValue === '4') return COLUMNS_CUSTOMER_MORE_CONTRACTS_REPORT
  if (selectedValue === '5') return COLUMNS_ROUTES_MORE_CONTRACTS_REPORT
  return COLUMNS_CONTRACTS_REPORT
}

export default function ContractReport() {
  const formMethods = useForm({
    resolver: yupResolver(schema.contractsReport),
    defaultValues: initialFormContractReport,
    mode: 'all',
    criteriaMode: 'all'
  })
  const watchedFormValues = formMethods.watch()

  const columnsToReport = getColumnsToReport(watchedFormValues)

  const { fileName, showAllRows, handleShowRows, searchTerm } = useReport({
    formMethods,
    frequencyOptions: REPORT_FREQUENCY_OPTIONS,
    initialFormOptions: initialFormContractReport.options,
    filename: 'reporteContratos'
  })

  const { data, isSuccess } = useQuery([searchTerm], ({ queryKey }) => {
    const params = queryKey?.[0]

    const orderValue = watchedFormValues.options.orderBy

    if (!params || !params.length) return

    if (orderValue === '4') return listCustomerByAmountContrats(params)

    if (orderValue === '5') return listRouteByAmountContrats(params)

    return listContractsByDates(params)
  })

  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({
    fileName
  })

  return (
    <DashboardContainer data={DASHBOARD.reports.contracts}>
      {loadingPrint && <Loader />}
      <Form methods={formMethods}>
        <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
          <Grid item xs={12} md={6}>
            <Select
              name="options.criterio"
              label="Criterios"
              items={REPORT_FREQUENCY_OPTIONS}
              isArray
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              name="options.orderBy"
              label="Ordenar por"
              items={CONTRACTS_REPORT_SORT_OPTIONS}
              isArray
            />
          </Grid>
          {Number(watchedFormValues.options.criterio) === 5 && (
            <DateRangePicker />
          )}
        </Grid>
        {!data?.data?.length ? (
          <EmptyReport />
        ) : (
          <ButtonsReport
            handlePrint={handlePrint}
            columnsCSV={COLUMNS_CUSTOMER_MORE_CONTRACTS_REPORT}
            dataCSV={data?.data}
            fileName={fileName}
          />
        )}
      </Form>
      {isSuccess && (
        <Grid
          ref={componentToPrintRef}
          sx={{
            '@media print': {
              padding: '2rem',
              color: 'black'
            }
          }}
        >
          <FormGroup sx={{ paddingBottom: '2rem', displayPrint: 'none' }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  size="small"
                  value={showAllRows}
                  onChange={handleShowRows}
                  disabled={data?.data?.length <= 10}
                />
              }
              label="Mostrar solo las 10 primeras filas"
            />
          </FormGroup>
          <HeaderBusinessInfo sx={{ display: 'none', displayPrint: 'block' }} />
          <Typography
            gutterBottom
            variant="h3"
            align="center"
            sx={{ display: 'none', displayPrint: 'inherit', mt: 4 }}
          >
            Reporte de contratos
          </Typography>
          <ReportSummary
            frequencyOptions={REPORT_FREQUENCY_OPTIONS}
            sortOptions={CONTRACTS_REPORT_SORT_OPTIONS}
            watchedFormValues={watchedFormValues.options}
          />
          <TableReport
            columns={columnsToReport}
            rows={data?.data}
            showAllRows={showAllRows}
          />
          {data?.total && <TotalSummary total={data.total} />}
        </Grid>
      )}
    </DashboardContainer>
  )
}
