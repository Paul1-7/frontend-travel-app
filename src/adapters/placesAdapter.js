export const getPlaceWithLatLng = (data) => {
  return data.map(({ id, nombre, punto }) => ({
    id,
    nombre,
    lng: punto.lng,
    lat: punto.lat
  }))
}
