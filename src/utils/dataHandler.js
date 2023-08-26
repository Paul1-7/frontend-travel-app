import { DAYS } from '@/constants'
import { format, getDay } from 'date-fns'
import { differenceInMinutes } from 'date-fns'
import { fTime } from './formatTime'
import { setHours } from 'date-fns'
import { setMinutes } from 'date-fns'
import { setSeconds } from 'date-fns'

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const objectByString = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, '?.$1') // convert indexes to properties
  s = s.replace(/^\./, '') // strip a leading dot
  const a = s.split('.')
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i]
    if (typeof o === 'undefined') return null
    if (k in o) {
      o = o[k]
    } else {
      return null
    }
  }
  return o
}

const getBOBCurrency = (value) =>
  new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(
    value
  )

const getFormattedTime = (date) =>
  new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(date)

export function getTimeDifferenceWithFormat(date1, date2) {
  const minutesDifference = differenceInMinutes(date2, date1)

  const hours = Math.floor(minutesDifference / 60)
  const minutes = minutesDifference % 60

  return format(new Date().setHours(hours, minutes), 'HH:mm')
}

export const getDateLocale = (date) => {
  return new Date(date).toLocaleDateString()
}

export const getDateTimeFormat = (value) => {
  const format = new Intl.DateTimeFormat('es-BO', {
    dateStyle: 'medium',
    timeStyle: 'medium'
  })
  const date = new Date(value)
  return format.format(date)
}

export const getDayNameAndTimeFormat = (dateStart, dateEnd) => {
  const dayOfWeek = getDay(new Date(dateStart))
  const dayName = DAYS[dayOfWeek]

  return `${dayName} de: ${fTime(dateStart)} a ${fTime(dateEnd)}`
}

export function setTimeComponentsToAnotherDate(sourceDate, destinationDate) {
  const hours = sourceDate.getHours()
  const minutes = sourceDate.getMinutes()
  const seconds = sourceDate.getSeconds()

  const dateWithTimeComponents = setHours(
    setMinutes(setSeconds(destinationDate, seconds), minutes),
    hours
  )

  return dateWithTimeComponents
}

export { objectByString, getBOBCurrency, getFormattedTime }
