import * as yup from 'yup'
import { msg, regex } from '../constants/validaciones'

const drivers = yup.object().shape({
  nombreChofer: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  apellidoChofer: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  auto: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  capacidad: yup.number().required().typeError('tiene que ser un número')
})

export default drivers
