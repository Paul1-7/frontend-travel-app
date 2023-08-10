import { daysToRepeat } from '@/constants'
import { getTimeDifferenceWithFormat } from '@/utils'
import { useTheme } from '@mui/material'
import { getHours, max } from 'date-fns'
import { parseISO } from 'date-fns'
import { add, sub } from 'date-fns'
import { min } from 'date-fns'
import { format } from 'date-fns'
import { useState, useEffect, useMemo } from 'react'

export const useRepeatEvents = ({
  events = [],
  eventsBackground,
  placesLength
}) => {
  const theme = useTheme()
  const EVENT_COLOR = theme.palette.secondary.light
  const BACKGROUND_COLOR = theme.palette.secondary.main

  const [eventsWithRules, setEventsWithRules] = useState([])
  const [eventsBackgroundWithRules, setEventsBackgroundWithRules] = useState([])

  const generateEventWithRules = (startDate, finishDate) => {
    const dateStart = new Date(startDate)
    const dateFinish = new Date(finishDate)
    const dateNow = new Date()
    const day = format(dateStart, 'EEEE')

    return {
      rrule: {
        freq: 'weekly',
        byweekday: [daysToRepeat?.[day]],
        dtstart: sub(dateNow.setTime(dateStart.getTime()), {
          months: 2
        }).toISOString(),
        until: add(dateNow.setTime(dateFinish.getTime()), {
          months: 2
        }).toISOString()
      },
      duration: getTimeDifferenceWithFormat(dateStart, dateFinish),
      end: dateFinish
    }
  }

  const getEarliestTime = (dateArray) => {
    const time = {
      morning: { start: [], end: [] },
      afternoon: { start: [], end: [] }
    }

    dateArray.forEach(({ horarioEntrada, horarioSalida }) => {
      const dateEntryParse = parseISO(horarioEntrada)
      const timeEntry = getHours(new Date(dateEntryParse))

      const dateFinishParse = parseISO(horarioSalida)
      const timeFinish = getHours(new Date(dateFinishParse))

      if (timeEntry >= 0 && timeEntry < 12) {
        time.morning.start.push(dateEntryParse)
      } else {
        time.afternoon.start.push(dateEntryParse)
      }

      if (timeFinish >= 0 && timeFinish < 12) {
        time.morning.end.push(dateFinishParse)
      } else {
        time.afternoon.end.push(dateFinishParse)
      }
    })

    const earliestStartDate = max(startDates)
    const earliestFinishDate = min(finishDates)

    return {
      startDate: earliestStartDate,
      finishDate: earliestFinishDate
    }
  }

  const getEventsWithRules = useMemo(() => {
    return events.map((event) => {
      const { horarioSalida, horarioEntrada } = event
      return {
        ...generateEventWithRules(horarioEntrada, horarioSalida),
        backgroundColor: EVENT_COLOR,
        borderColor: EVENT_COLOR,
        textColor: '#000',
        editable: false,
        overlap: true,
        extendedProps: { ...event },
        endStr: event.horarioSalida
      }
    })
  }, [events, EVENT_COLOR])

  const groupScheduleByIdLugar = (schedules) => {
    let idLugarObj = {}
    schedules.forEach(({ idLugar }) => {
      if (idLugar in idLugarObj) {
        idLugarObj[idLugar] += 1
        return
      }

      idLugarObj[idLugar] = 1
    })

    return idLugarObj
  }

  const getEventsBackgroundWithRules = useMemo(() => {
    const newEvents = []
    if (!eventsBackground) return []
    console.log(
      'TCL: getEventsBackgroundWithRules -> eventsBackground',
      eventsBackground
    )

    Object.entries(eventsBackground).forEach(([, value]) => {
      const IdPlaceByDay = groupScheduleByIdLugar(value)

      const amountIdPlaceByDay = Object.keys(IdPlaceByDay).length

      if (amountIdPlaceByDay !== placesLength) return

      const intersection = getTimeIntersection(value)
      console.log(
        'TCL: getEventsBackgroundWithRules -> intersection',
        intersection
      )

      // newEvents.push({
      //   ...generateEventWithRules(startDate, finishDate),
      //   backgroundColor: BACKGROUND_COLOR,
      //   borderColor: BACKGROUND_COLOR,
      //   textColor: '#000',
      //   editable: false,
      //   overlap: true,
      //   endStr: finishDate,
      //   extendedProps: { title: 'Rango de horarios disponibles' }
      // })
    })

    return newEvents
  }, [eventsBackground, BACKGROUND_COLOR, placesLength])

  useEffect(() => {
    if (!events.length) return

    setEventsWithRules(getEventsWithRules)
  }, [events, getEventsWithRules])

  useEffect(() => {
    if (!eventsBackground || !Object.keys(eventsBackground).length) return
    setEventsBackgroundWithRules(getEventsBackgroundWithRules)
  }, [eventsBackground, getEventsBackgroundWithRules])

  return {
    events: [...eventsWithRules, ...eventsBackgroundWithRules]
  }
}
