import * as yup from 'yup';
import { msg, regex } from '../constants/validaciones';

const itinerarios = yup.object().shape({
    idLugar: yup
        .string()
        .matches(regex.alphaNumeric, msg.alphaNumeric)
        .required()
        .test('noDefaultValue', 'Tiene que seleccionar una opción', (value) => value !== '0'),
    descripcion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    horaInicio: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    horaFin: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required()
});

const horarios = yup.object().shape({
    idDia: yup.array().min(1).required(),
    idHorario: yup
        .array()
        .required()
        .when(['checkedDia'], (checkedDia, schema, node) => {
            if (!node.from?.length) return;
            const { idHorario } = node.from[0].value;
            const isObject = idHorario.every((item) => typeof item === 'object');

            if (checkedDia.length && isObject) return schema.min('es requerido');
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
    // .test('checkeddia', 'Tiene que seleccionar al menos un día', (value) => {
    //     const checkedDia = value.filter(({ checkedDia }) => checkedDia.length);
    //     console.log('TCL: checkedDia', checkedDia.length);

    //     return checkedDia.length > 0;
    // })
});

export default rutas;
