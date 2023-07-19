import * as yup from 'yup'
import { msg, regex } from '../constants/validaciones'

const itinerarios = yup.object().shape({
  idLugar: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required()
    .test(
      'noDefaultValue',
      'Tiene que seleccionar una opción',
      (value) => value !== '0'
    )
})

const rutas = yup.object().shape({
  titulo: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  descripcion: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  duracion: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  precio: yup.number().required().typeError('tiene que ser un número'),
  itinerarios: yup
    .array()
    .of(itinerarios)
    .test('uniqueIds', 'Los lugares deben ser únicos', (values) => {
      const ids = values.map((value) => value.idLugar)
      const uniqueIds = new Set(ids)
      return ids.length === uniqueIds.size
    })
    .min(2, 'Tiene que seleccionar al menos dos lugares')
    .required()
})

export default rutas
