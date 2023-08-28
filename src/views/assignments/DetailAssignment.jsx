import { DASHBOARD } from '@/constants'
import { DashboardContainer, HeaderBusinessInfo } from '@/ui-component'
import { getAssignmentById } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { usePrint } from '@/hooks'
import { Backdrop, Button, Grid, Typography } from '@material-ui/core'
import { getDateTimeFormat } from '@/utils'

const DetailAssignment = () => {
  const { id } = useParams()
  const { componentToPrintRef, handlePrint, loadingPrint } = usePrint()

  const { data } = useQuery({
    queryFn: () => getAssignmentById(id),
    cacheTime: 0,
    queryKey: ['getAssignment']
  })

  return (
    <DashboardContainer data={DASHBOARD.assignments.detail}>
      <Backdrop open={loadingPrint} />
      <Button
        onClick={handlePrint}
        variant="outlined"
        color="secondary"
        sx={{ displayPrint: 'none', mb: 4 }}
      >
        Imprimir asignación
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
            Detalle de asignación
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Codigo de referencia: </span>
              {data?.codReferencia ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Fecha de salida: </span>
              {data?.fecha && getDateTimeFormat(new Date(data.fecha))}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>Ruta: </span>
              {data?.asigCont?.[0]?.ruta?.titulo ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 600 }}>
                Cantidad total de personas:{' '}
              </span>
              {data?.totalPersonas ?? ''}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography
              sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <span style={{ fontWeight: 600 }}>Contratos asignados: </span>
              {data?.asigCont?.map(
                ({ codReferencia, cantidadPersonas }, idx) => (
                  <div key={codReferencia + idx}>
                    {`${
                      idx + 1
                    }.  ${codReferencia} - ${cantidadPersonas} personas`}
                  </div>
                )
              )}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography
              sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <div style={{ fontWeight: 600 }}>Guias asignados: </div>
              {data?.asigGuias?.map(({ nombre, apellido }, idx) => (
                <div key={nombre + idx}>
                  {`${idx + 1}. ${nombre} ${apellido}`}
                </div>
              ))}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <div style={{ fontWeight: 600 }}>Vehiculos asignados: </div>
              {data?.asigVeh?.map(({ placa, capacidad }, idx) => (
                <div key={placa + idx}>
                  {`${idx + 1}. placa: ${placa} - capacidad: ${capacidad}`}
                </div>
              ))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </DashboardContainer>
  )
}

export default DetailAssignment
