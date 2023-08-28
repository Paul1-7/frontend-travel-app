import * as yup from 'yup'
import { msg, regex } from '../constants/validaciones'

const login = yup.object().shape({
  usuario: yup
    .string()
    .matches(regex.alphaNumeric, msg.alphaNumeric)
    .required(),
  password: yup
    .string()
    .matches(regex.alphaalphaNumeric, msg.alphaNumeric)
    .required()
})

export default login
