import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { DASHBOARD, ROUTES, initialFormPlaces } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { getPlaceById, modifyPlace } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMapBox } from '@/hooks'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormPlaces from './FormPlaces'
import { Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const ModifyPlace = () => {
  const { id } = useParams()
  const { mapRef, getLngLatMarker, generateMarkers, mapLoaded } = useMapBox({
    initialMarker: false
  })

  const modifyPlaceData = useMutation({
    mutationFn: (data) => {
      return modifyPlace({ data, id })
    }
  })

  const place = useQuery({
    queryKey: ['place'],
    queryFn: () => getPlaceById(id)
  })

  const methods = useForm({
    resolver: yupResolver(schema.lugares),
    defaultValues: initialFormPlaces,
    mode: 'all',
    criteriaMode: 'all'
  })

  useEffect(() => {
    if (!place.isSuccess || !mapLoaded) return
    methods.reset(place.data, {
      keepErrors: true,
      keepIsValid: true,
      keepDefaultValues: true,
      keepTouched: true
    })

    const { punto, nombre } = place.data

    const markers = [
      {
        lngLat: [punto?.[0].lng, punto?.[0].lat],
        label: nombre,
        draggable: true
      }
    ]

    generateMarkers(markers)
  }, [place.data, mapLoaded])

  const handleSubmit = (data) => {
    const newData = { lugar: data, punto: getLngLatMarker(0) }
    modifyPlaceData.mutate(newData)
  }

  return (
    <DashboardContainer data={DASHBOARD.places.modify}>
      <Box
        sx={{
          width: '100%',
          height: 400,
          marginBottom: '2rem',
          overflow: 'hidden'
        }}
        ref={mapRef}
      ></Box>
      <Form methods={methods} onSubmit={handleSubmit}>
        <FormPlaces loading={modifyPlaceData.isLoading} />
      </Form>
      {modifyPlaceData.isSuccess && (
        <Redirect to={{ pathname: ROUTES.places.default }} />
      )}
    </DashboardContainer>
  )
}

export default ModifyPlace
