import * as yup from 'yup';
import { msg, regex } from '../constants/validaciones';

const itinerarios = yup.object().shape({
    idLugar: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    horaInicio: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    horaFin: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required()
});

const rutas = yup.object().shape({
    titulo: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    dias: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    horarios: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    duracion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    precio: yup.string().matches(regex.float, msg.float).required(),
    estado: yup.string().required().matches(regex.number, msg.number).required(),
    itinerarios: yup.array().of(itinerarios).required()
});

export default rutas;
