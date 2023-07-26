export const getRouteWithItinerario = (data) => {
  return {
    ...data,
    itinerarios: data.itinerarios.map(({ id, punto, nombre }) => ({
      idLugar: id,
      nombre,
      punto
    }))
  }
}
