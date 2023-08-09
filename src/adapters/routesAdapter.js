import { format, parseISO } from 'date-fns'

const groupSchedulesByDays = (data) => {
  let daysSchedule = {}

  data.forEach(({ horariosLugar }) => {
    horariosLugar.forEach((horarioLugar) => {
      const day = format(parseISO(horarioLugar.horarioEntrada), 'EEEE')

      if (day in daysSchedule) {
        daysSchedule[day].push(horarioLugar)
      } else {
        daysSchedule[day] = [horarioLugar]
      }
    })
  })
  return daysSchedule
}

export const getRouteWithDetails = (data) => {
  return {
    ...data,
    itinerarios: data.itinerarios.map(({ id, punto, nombre }) => ({
      idLugar: id,
      nombre,
      punto
    }))
  }
}

export const getRoutesWithDetails = (data) => {
  return data.map((route) => ({
    ...route,
    itinerarios: route.itinerarios.map(({ id, punto, nombre }) => ({
      idLugar: id,
      nombre,
      punto
    })),
    horariosLugar: groupSchedulesByDays(route.itinerarios)
  }))
}
