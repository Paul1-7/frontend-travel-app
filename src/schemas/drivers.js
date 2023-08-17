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
    .test(
      'idVehiculo',
      'Tiene que seleccionar una opción',
      (value) => value !== '0'
    )
    .required()
})

export default drivers
