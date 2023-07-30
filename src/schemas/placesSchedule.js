import { msg, regex } from '@/constants/validaciones'
import * as yup from 'yup'

const placesSchedule = yup.object().shape({
  idLugar: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test(
      'idLugar',
      'Tiene que seleccionar una opción',
      (value) => value !== '0'
    )
})

export default placesSchedule
