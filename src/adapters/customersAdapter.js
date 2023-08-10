export const getCustomerWithFullName = (contracts) => {
  return contracts.map(({ id, nombre, apellido, ci }) => ({
    id,
    nombre: `${nombre} ${apellido} - ci: ${ci}`
  }))
}
