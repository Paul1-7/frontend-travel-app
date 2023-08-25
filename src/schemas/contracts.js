import * as yup from 'yup'
import { msg, regex } from '../constants/validaciones'

const contracts = yup.object().shape({
  idRuta: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test(
      'idRuta-test',
      'Debe seleccionar otra opción',
      (value) => value !== '0'
    ),
  idCliente: yup
    .object()
    .shape({
      id: yup.string().notOneOf(['0'], 'El id no puede ser cero'),
      nombre: yup.string()
    })
    .required()
    .test(
      'idProv-test',
      'Debe seleccionar otra opción',
      (value) => value.id !== '0'
    ),
  idHorarioRuta: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test(
      'noDefaultValue',
      'Tiene que seleccionar una opción',
      (value) => value !== '0'
    ),
  fecha: yup.date().required().typeError('tiene que ser una fecha'),
  cantidadPersonas: yup.number().required().min(1, 'el minimo es 1'),
  monto: yup.number().required()
})

export default contracts
