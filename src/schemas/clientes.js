import * as yup from 'yup';
import { msg, regex } from '../constants/validaciones';

const clientes = yup.object().shape({
    nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    apellido: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    ci: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    estado: yup.string().required().matches(regex.number, msg.number).required(),
    telefono: yup.string().required().matches(regex.tel, msg.tel).required()
});

export default clientes;
