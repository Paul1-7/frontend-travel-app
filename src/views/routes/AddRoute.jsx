import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { DASHBOARD, ROUTES, initialFormRoute } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { addRoute, listPlacesWithLatLng } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormRoute from './FormRoute'
import { Box } from '@material-ui/core'
import { useMapBox } from '@/hooks'

const AddRoute = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addRoute({ data })
    }
  })
  const { mapRef, generateMarkers, deleteMarkers, mapLoaded } = useMapBox({
    initialMarker: false
  })

  const methods = useForm({
    resolver: yupResolver(schema.rutas),
    defaultValues: initialFormRoute,
    mode: 'all',
    criteriaMode: 'all'
  })

  const placesData = useQuery({
    queryKey: ['listPlaces'],
    queryFn: listPlacesWithLatLng
  })

  return (
    <DashboardContainer data={DASHBOARD.routes.add}>
      <Box
        sx={{ width: '100%', height: 400, marginBottom: '2rem' }}
        ref={mapRef}
      ></Box>
      <Form methods={methods} onSubmit={mutate}>
        <FormRoute
          loading={isLoading}
          deleteMarkers={deleteMarkers}
          generateMarkers={generateMarkers}
          placesData={placesData}
          isMapLoaded={mapLoaded}
        />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.routes.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddRoute
