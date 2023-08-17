import * as yup from 'yup'
import { msg, regex } from '../constants/validaciones'

const drivers = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellido: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  numLicencia: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  idVehiculo: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test(
      'noDefaultValue',
      'Tiene que seleccionar una opción',
      (value) => value !== '0'
    )
})

export default drivers
