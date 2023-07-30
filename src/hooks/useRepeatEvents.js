import { daysToRepeat } from '@/constants'
import { getTimeDifferenceWithFormat } from '@/utils'
import { useTheme } from '@mui/material'
import { add, sub } from 'date-fns'
import { format } from 'date-fns'
import { useState, useEffect, useMemo } from 'react'

export const useRepeatEvents = ({ events = [] }) => {
  const theme = useTheme()
  const SECONDARY_COLOR = theme.palette.secondary.light
  const [eventsWithRules, setEventsWithRules] = useState([])

  const getEventsWithRules = useMemo(() => {
    return events.map((item) => {
      const dateStart = new Date(item.horarioEntrada)
      const dateFinish = new Date(item.horarioSalida)
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
        backgroundColor: SECONDARY_COLOR,
        borderColor: SECONDARY_COLOR,
        textColor: '#000',
        editable: false,
        overlap: false,
        extendedProps: { ...item },
        endStr: item.horarioSalida,
        end: dateFinish
      }
    })
  }, [events, SECONDARY_COLOR])

  useEffect(() => {
    if (!events.length) return

    setEventsWithRules(getEventsWithRules)
  }, [events, getEventsWithRules])

  return {
    eventsWithRules: eventsWithRules
  }
}
