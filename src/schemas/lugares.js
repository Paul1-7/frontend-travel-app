import * as yup from 'yup';
import { msg, regex } from '../constants/validaciones';

const lugares = yup.object().shape({
    nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    direccion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    horariosAtencion: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    estado: yup.string().required().matches(regex.number, msg.number).required()
});

export default lugares;
