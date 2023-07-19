import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import schema from '@/schemas'
import { DASHBOARD, ROUTES, initialFormRoute } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { getRouteById, listPlacesWithLatLng, modifyRoute } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Redirect, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import FormRoute from './FormRoute'
import { useMapBox } from '@/hooks'
import { Box } from '@material-ui/core'

const ModifyRoute = () => {
  const { id } = useParams()
  const { mapRef, generateMarkers, deleteMarkers, mapLoaded } = useMapBox({
    initialMarker: false
  })
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return modifyRoute({ data, id })
    }
  })

  const route = useQuery({
    queryFn: () => getRouteById(id),
    cacheTime: 0,
    queryKey: ['getRoute']
  })

  const placesData = useQuery({
    queryKey: ['listPlaces'],
    queryFn: listPlacesWithLatLng
  })

  const methods = useForm({
    resolver: yupResolver(schema.rutas),
    defaultValues: initialFormRoute,
    mode: 'all',
    criteriaMode: 'all'
  })

  useEffect(() => {
    if (!route.isSuccess || !placesData.isSuccess) return
    methods.reset(route.data, {
      keepErrors: true,
      keepIsValid: true,
      keepDefaultValues: true,
      keepTouched: true
    })
  }, [route.isSuccess, placesData.isSuccess])

  return (
    <DashboardContainer data={DASHBOARD.routes.modify}>
      <Box
        sx={{ width: '100%', height: 400, marginBottom: '2rem' }}
        ref={mapRef}
      ></Box>
      <Form methods={methods} onSubmit={mutate}>
        <FormRoute
          loading={isLoading || placesData.isLoading}
          deleteMarkers={deleteMarkers}
          generateMarkers={generateMarkers}
          routeData={route}
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

export default ModifyRoute
