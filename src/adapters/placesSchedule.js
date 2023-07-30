export const placesSchedulesListToDetail = (data) =>
  data.map((item) => {
    const { lugar } = item
    return {
      ...item,
      lugar: lugar.nombre
    }
  })
