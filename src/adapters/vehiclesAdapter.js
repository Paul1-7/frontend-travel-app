export const getVehiclesWithTypeAndBoard = (vehicles) => {
  return vehicles.map(({ id, placa, tipo }) => ({
    id,
    nombre: `placa : ${placa} - tipo: ${tipo}`
  }))
}
