export const getRouteWithItinerario = (data) => {
  return {
    ...data,
    itinerarios: data.itinerarios.map(({ id }) => ({
      idLugar: id
    }))
  }
}
