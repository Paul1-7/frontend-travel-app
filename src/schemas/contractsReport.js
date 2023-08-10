import { msg, regex } from '@/constants'
import * as yup from 'yup'

const contractsReport = yup.object().shape({
  options: yup.object().shape({
    criterio: yup
      .string()
      .matches(regex.alphaNumeric, msg.alphaNumeric)
      .test(
        'noDefaultValue',
        'Tiene que seleccionar una opción',
        (value) => value !== '0'
      ),
    orderBy: yup
      .string()
      .matches(regex.alphaNumeric, msg.alphaNumeric)
      .test(
        'noDefaultValue',
        'Tiene que seleccionar una opción',
        (value) => value !== '0'
      )
  }),
  dateStart: yup.date(),
  dateEnd: yup.date()
})

export default contractsReport
