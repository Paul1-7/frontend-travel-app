import { format } from 'date-fns'

export function fTime(date) {
  return format(new Date(date), 'HH:mm')
}
