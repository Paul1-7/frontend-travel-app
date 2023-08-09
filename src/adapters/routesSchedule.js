export const routesSchedulesListToDetail = (data) =>
  data.map((item) => {
    const { ruta } = item
    return {
      ...item,
      ruta: ruta.titulo
    }
  })
