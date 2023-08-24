import { daysToRepeat } from '@/constants'
import { getTimeDifferenceWithFormat } from '@/utils'
import { useTheme } from '@mui/material'
import { add, sub } from 'date-fns'
import { format } from 'date-fns'
import { useRef } from 'react'
import { useState, useEffect, useMemo } from 'react'

export const useRepeatEvents = ({ events = [], eventsBackground }) => {
  const theme = useTheme()
  const EVENT_COLOR = theme.palette.secondary.light
  const BACKGROUND_COLOR = theme.palette.secondary.main

  const [eventsWithRules, setEventsWithRules] = useState([])
  const [eventsBackgroundWithRules, setEventsBackgroundWithRules] = useState([])
  const eventsToBackground = useRef([])

  function areTimeRangesIntersecting(time1, time2) {
    const cHorarioEntrada = new Date(time1?.horarioEntrada)
    const cHorarioFin = new Date(time1?.horarioSalida)
    const nHorarioEntrada = new Date(time2?.horarioEntrada)
    let nHorarioFin = new Date(time2?.horarioSalida)

    if (nHorarioFin < nHorarioEntrada) {
      nHorarioFin = add(new Date(time2?.horarioSalida), { days: 1 })
    }

    return cHorarioEntrada <= nHorarioFin && cHorarioFin >= nHorarioEntrada
  }

  function resetEvents() {
    setEventsWithRules([])
    setEventsBackgroundWithRules([])
  }

  function areTimeRangesOverlapping(time1, time2) {
    const cHorarioEntrada = new Date(time1?.horarioEntrada)
    const cHorarioFin = new Date(time1?.horarioSalida)
    const nHorarioEntrada = new Date(time2?.horarioEntrada)
    let nHorarioFin = new Date(time2?.horarioSalida)

    if (nHorarioFin < nHorarioEntrada) {
      nHorarioFin = add(new Date(time2?.horarioSalida), { days: 1 })
    }

    return cHorarioEntrada <= nHorarioEntrada && cHorarioFin >= nHorarioFin
  }

  function findIntersectionRange(timeRanges) {
    let maxHoraEntrada = '00:00'
    let minHoraFin = '23:59'

    for (const { horarioEntrada, horarioSalida } of timeRanges) {
      if (horarioEntrada <= horarioSalida) {
        if (horarioEntrada > maxHoraEntrada) {
          maxHoraEntrada = horarioEntrada
        }

        if (horarioSalida < minHoraFin) {
          minHoraFin = horarioSalida
        }
      } else {
        if (horarioEntrada > maxHoraEntrada) {
          maxHoraEntrada = horarioEntrada
        }

        if (horarioSalida > minHoraFin) {
          minHoraFin = horarioSalida
        }
      }
    }

    if (maxHoraEntrada <= minHoraFin) {
      return { horarioEntrada: maxHoraEntrada, horarioSalida: minHoraFin }
    }

    return null
  }

  function getGroupsAndIntersection(times) {
    let groups = []
    let notIntercepted = [...times]

    while (notIntercepted.length > 0) {
      let currentIntersection = notIntercepted[0]
      groups.push([currentIntersection])
      notIntercepted = notIntercepted.slice(1)
      let i = 0
      while (i < notIntercepted.length) {
        const isRange = areTimeRangesIntersecting(
          currentIntersection,
          notIntercepted[i]
        )
        if (isRange) {
          groups[groups.length - 1].push(notIntercepted[i])

          notIntercepted.splice(i, 1)
        } else {
          i++
        }
      }
    }

    const groupsIntersecting = groups.map((group) => {
      return findIntersectionRange(group)
    })

    return groupsIntersecting
  }

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
          months: 1
        }).toISOString(),
        until: add(dateNow.setTime(dateFinish.getTime()), {
          months: 1
        }).toISOString()
      },
      duration: getTimeDifferenceWithFormat(dateStart, dateFinish),
      end: dateFinish
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

  const getEventsBackgroundWithRules = useMemo(() => {
    if (!eventsBackground) return []
    eventsToBackground.current = []
    Object.entries(eventsBackground).forEach(([, value]) => {
      const newRange = getGroupsAndIntersection(value)
      eventsToBackground.current.push(newRange)
    })

    const newEventsWithRules = eventsToBackground.current
      .flat()
      .map((event) => ({
        ...generateEventWithRules(event.horarioEntrada, event.horarioSalida),
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BACKGROUND_COLOR,
        textColor: '#000',
        editable: false,
        overlap: true,
        endStr: event.horarioSalida,
        extendedProps: { title: 'Rango de horarios disponibles' }
      }))

    return newEventsWithRules
  }, [eventsBackground, BACKGROUND_COLOR])

  useEffect(() => {
    if (!events.length) {
      setEventsWithRules([])
      return
    }

    setEventsWithRules(getEventsWithRules)
  }, [events, getEventsWithRules])

  useEffect(() => {
    if (!eventsBackground || !Object.keys(eventsBackground).length) return
    setEventsBackgroundWithRules(getEventsBackgroundWithRules)
  }, [eventsBackground, getEventsBackgroundWithRules])

  return {
    events: [...eventsWithRules, ...eventsBackgroundWithRules],
    backgroundEvents: eventsToBackground.current,
    areTimeRangesIntersecting,
    areTimeRangesOverlapping,
    resetEvents
  }
}
