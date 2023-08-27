export const getVehiclesWithTypeAndCapacity = (vehicles) => {
  return vehicles.map(({ id, placa, capacidad }) => ({
    id,
    nombre: `placa : ${placa} - capacidad: ${capacidad}`,
    capacidad
  }))
}
