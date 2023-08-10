import { DEFAULT_VALUE_ITEM } from '@/constants'
import { useEffect } from 'react'

export const useContract = ({  formMethods, routes = [] }) => {
  const { watch, setValue } = formMethods
  const selectedRoutedId = watch('idRuta')
  const numberOfPeople = watch('cantidadPersonas')

  useEffect(() => {
    if (selectedRoutedId === DEFAULT_VALUE_ITEM || !routes.length || isNaN(numberOfPeople))
      return

    const selectedRoute = routes.find(({ id }) => id === selectedRoutedId)
    const { precio } = selectedRoute

    setValue('monto', precio * numberOfPeople)
  }, [selectedRoutedId, routes, numberOfPeople])
}
