export const getDriverWithVehicle = (drivers) => {
  return drivers.map((driver) => ({
    ...driver,
    vehiculo: driver.vehiculo.placa
  }))
}
