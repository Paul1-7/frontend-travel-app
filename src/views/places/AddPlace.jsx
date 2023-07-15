import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { DASHBOARD, ROUTES, initialFormPlaces } from '@/constants'
import { DashboardContainer, Form } from '@/ui-component'
import { addPlace } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { useMapBox } from '@/hooks'
import { Redirect } from 'react-router-dom'
import schema from '@/schemas'
import FormPlaces from './FormPlaces'
import { Box } from '@material-ui/core'

const AddPlace = () => {
  const { mapRef, getLngLatMarker } = useMapBox()
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (data) => {
      return addPlace({ data })
    }
  })

  const methods = useForm({
    resolver: yupResolver(schema.lugares),
    defaultValues: initialFormPlaces,
    mode: 'all',
    criteriaMode: 'all'
  })

  const handleSubmit = (data) => {
    const newData = { lugar: data, punto: getLngLatMarker(0) }
    mutate(newData)
  }

  return (
    <DashboardContainer data={DASHBOARD.places.add}>
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
        <FormPlaces loading={isLoading} />
      </Form>
      {!isLoading && !isError && isSuccess && (
        <Redirect to={{ pathname: ROUTES.places.default }} />
      )}
    </DashboardContainer>
  )
}

export default AddPlace
