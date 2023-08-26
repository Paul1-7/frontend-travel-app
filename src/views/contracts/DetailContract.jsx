import { DASHBOARD, ITEMS_LANGUAJE } from '@/constants'
import { DashboardContainer, HeaderBusinessInfo } from '@/ui-component'
import { getContractById } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { usePrint } from '@/hooks'
import { Backdrop, Button, Grid, Typography } from '@material-ui/core'
import { conversorNumerosALetras as ClaseConversor } from 'conversor-numero-a-letras-es-ar'
import { getBOBCurrency } from '@/utils'

const DetailContract = () => {
  const conversorNumerico = new ClaseConversor()
  const { id } = useParams()
  const { componentToPrintRef, handlePrint, loadingPrint } = usePrint()

  const { data } = useQuery({
    queryFn: () => getContractById(id),
    cacheTime: 0,
    queryKey: ['getContract']
  })

  return (
    <DashboardContainer data={DASHBOARD.contracts.detail}>
      <Backdrop open={loadingPrint} />
      <Button
        onClick={handlePrint}
        variant="outlined"
        color="secondary"
        sx={{ displayPrint: 'none', mb: 4 }}
      >
        Imprimir detalle de la contratacion
      </Button>
      <Grid
        ref={componentToPrintRef}
        sx={{
          '@media print': { padding: '2rem', color: 'black' }
        }}
      >
        <HeaderBusinessInfo
          sx={{ display: 'none', displayPrint: 'block', mb: 2 }}
        />
        <Grid>
          <Typography variant="h1" align="center" paragraph sx={{ mb: 4 }}>
            Nota de venta
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Fecha de salida: </span>
              {new Date(data?.fecha).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>NIT/CI/CEX: </span>
              {data?.cliente?.ci ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Nombre/Razon social: </span>
              {data?.cliente?.nombre ?? ''} {data?.cliente?.apellido ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Codigo de referencia: </span>
              {data?.codReferencia ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Ruta: </span>
              {data?.ruta?.titulo ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Idioma: </span>
              {ITEMS_LANGUAJE.find(({ id }) => id === data?.idioma).title ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Cantidad de personas: </span>
              {data?.cantidadPersonas ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>precio por persona: </span>
              {getBOBCurrency(data?.ruta?.precio ?? 0) ?? ''}
            </Typography>
          </Grid>
        </Grid>

        <Grid>
          <Typography
            sx={{ fontWeight: '700', pt: 4, color: 'black' }}
            variant="body2"
            paragraph
          >
            {`Son: ${conversorNumerico.convertToText(
              parseInt(data?.monto ?? 0, 10)
            )} ${
              (data?.monto - parseInt(data?.monto ?? 0, 10)).toFixed(2) * 100
            }/100 Bolivianos`}
          </Typography>
        </Grid>
      </Grid>
    </DashboardContainer>
  )
}

export default DetailContract
