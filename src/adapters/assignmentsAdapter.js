export const getAssignmentsToList = (assignments) => {
  return assignments.map((assignment) => ({
    ...assignment,
    ruta: assignment.contratos[0].contrato.ruta.titulo
  }))
}
