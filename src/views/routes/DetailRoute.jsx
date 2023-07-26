import { DASHBOARD } from '@/constants'
import { DashboardContainer } from '@/ui-component'
import { getRouteById } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useMapBox, usePrint } from '@/hooks'
import { Backdrop, Box, Button, Grid, Typography } from '@material-ui/core'

const DetailRoute = () => {
  const { id } = useParams()
  const { componentToPrintRef, handlePrint, loadingPrint } = usePrint()
  const { mapRef, generateMarkers, mapLoaded } = useMapBox({
    initialMarker: false
  })

  const route = useQuery({
    queryFn: () => getRouteById(id),
    cacheTime: 0,
    queryKey: ['getRoute']
  })
  const dataRoute = route.data

  useEffect(() => {
    if (!route.isSuccess || !mapLoaded) return

    const markers = route.data.itinerarios.map(
      ({ punto: { lng, lat }, nombre }) => ({
        lngLat: [lng, lat],
        label: nombre
      })
    )

    generateMarkers(markers)
  }, [route.isSuccess, mapLoaded])

  return (
    <DashboardContainer data={DASHBOARD.routes.detail}>
      <Backdrop isLoading={loadingPrint} />
      <Button
        onClick={handlePrint}
        variant="outlined"
        color="secondary"
        sx={{ displayPrint: 'none', mb: 2 }}
      >
        Imprimir detalle de la ruta
      </Button>
      <Grid
        ref={componentToPrintRef}
        sx={{
          '@media print': { padding: '2rem' }
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ mb: 4, display: 'none', displayPrint: 'block' }}
        >
          Detalle de la ruta
        </Typography>
        <Box
          sx={{ width: '100%', height: 400, marginBottom: '2rem' }}
          ref={mapRef}
        ></Box>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="h2" gutterBottom>
              <span style={{ fontWeight: 'bold', color: 'black' }}>
                Nombre de la ruta:{' '}
              </span>
              {dataRoute?.titulo}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="h2" sx={{ mb: 2 }}>
              <span style={{ fontWeight: 'bold', color: 'black' }}>
                Duracion:
              </span>
              {dataRoute?.duracion}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="h2" gutterBottom>
              <span style={{ fontWeight: 'bold', color: 'black' }}>
                Descripción:
              </span>
              {dataRoute?.descripcion}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 'bold', color: 'black', mb: 2 }}
            >
              Itinerario
            </Typography>
          </Grid>
          {dataRoute?.itinerarios.map(({ id, nombre }, index) => (
            <Grid item xs={12} key={id}>
              <Typography variant="body1" component="h2" gutterBottom>
                <span style={{ fontWeight: 'bold' }}>
                  {`${index + 1}. Lugar: `}
                </span>
                {nombre}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </DashboardContainer>
  )
}

export default DetailRoute
