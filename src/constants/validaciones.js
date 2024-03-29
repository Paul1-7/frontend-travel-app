import { setLocale } from 'yup';

setLocale({
    // use constant translation keys for messages without values
    mixed: {
        default: 'Campo invalido',
        required: 'Este campo es requerido'
    },
    // use functions to generate an error object that includes the value from the schema
    number: {
        min: ({ min }) => ({ key: `El valor debe de ser mayor a ${min}`, values: { min } }),
        max: ({ max }) => ({ key: `El valor debe de ser menor a ${max}`, values: { max } })
    },
    array: {
        min: 'tiene que seleccionar al menos una opcíon'
    }
});

const regex = {
    alphaNumeric: /^$|^[a-zA-Z\d\-_./\séáíóúñ+:]+$/,
    password: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}|)/,
    number: /^[0-9]+$/,
    tel: /^[0-9-+\s]+$/,
    float: /^[0-9.-]+$/
};

const msg = {
    alphaNumeric: 'Solo se permite valores alphanumericos',
    password: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número',
    number: 'Solo se permiten valores numericos',
    tel: 'No es un número de telefono',
    float: 'Solo se permiten valores numericos o decimales'
};

export { regex, msg };
