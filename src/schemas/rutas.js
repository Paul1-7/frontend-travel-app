import * as yup from 'yup';
import { msg, regex } from '../constants/validaciones';

const itinerarios = yup.object().shape({
    idLugar: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    horaInicio: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    horaFin: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required()
});

const horarios = yup.object().shape({
    idDia: yup.array().min(1, 'tiene que seleccionar al menos una opción').required(),
    idHorario: yup
        .array()
        .required()
        .when('checkedDia', (checkedDia, schema) => {
            if (!checkedDia.length) return schema.min('tiene que seleccionar un horario');
        }),
    checkedDia: yup.array().required()
});

const rutas = yup.object().shape({
    titulo: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),

    duracion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    precio: yup.string().matches(regex.float, msg.float).required(),
    estado: yup.string().required().matches(regex.number, msg.number).required(),
    itinerarios: yup.array().of(itinerarios).required(),
    horarios: yup.array().of(horarios).required()
});

export default rutas;
