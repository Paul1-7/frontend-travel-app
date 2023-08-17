import * as yup from 'yup'
import { msg, regex } from '../constants/validaciones'

const drivers = yup.object().shape({
  modelo: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  placa: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  capacidad: yup
    .number()
    .min(2, 'la capacidad mínima es 2')
    .required()
    .typeError('tiene que ser un número'),
  tipo: yup
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
