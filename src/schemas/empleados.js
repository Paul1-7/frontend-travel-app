import * as yup from 'yup'
import { msg, regex } from '../constants/validaciones'

const empleados = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  apellido: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  ci: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  estado: yup.string().required().matches(regex.number, msg.number).required(),
  roles: yup.array().min(1).required(),
  usuario: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  password: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .when('oldPassword', {
      is: (value) => !value,
      then: () => yup.string().required(),
      otherwise: () => yup.string()
    }),
  oldPassword: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .nullable(),
  repetirPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las constraseñas no coinciden'),
  telefono: yup.string().required().matches(regex.tel, msg.tel).required()
})
export default empleados
