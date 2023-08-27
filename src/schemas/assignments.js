import * as yup from 'yup'

const assignments = yup.object().shape({
  fecha: yup.string().required(),
  totalPersonas: yup
    .number()
    .typeError('tiene que ser un número')
    .required()
    .min(1, 'el mínimo es una persona'),

  capMaxPersonas: yup
    .number()
    .typeError('tiene que ser un número')
    .required()
    .when('totalPersonas', (totalPersonas, schema) => {
      if (totalPersonas) {
        return schema.moreThan(
          totalPersonas - 1,
          'La cantidad de personas excede la capacidad maxima'
        )
      }
      return schema
    })
    .min(1, 'el mínimo es una persona'),
  guias: yup
    .array()
    .test('uniqueIdsGuias', 'Los guias no deben repetirse', (values) => {
      const uniqueIds = new Set(values)
      return values.length === uniqueIds.size
    })
    .min(1, 'Tiene que seleccionar al menos un guía')
    .required(),
  vehiculos: yup
    .array()
    .test(
      'uniqueIdsVehiculos',
      'Los vehiculos no deben repetirse',
      (values) => {
        const uniqueIds = new Set(values)
        return values.length === uniqueIds.size
      }
    )
    .min(1, 'Tiene que seleccionar al menos un vehículo')
    .required(),
  contratos: yup
    .array()
    .test(
      'uniqueIdsContratos',
      'Los contratos no deben repetirse',
      (values) => {
        const uniqueIds = new Set(values)
        return values.length === uniqueIds.size
      }
    )
    .min(1, 'Tiene que seleccionar al menos un contrato')
    .required()
})

export default assignments
