import { ITEMS_ROL } from './inputs'

export const initialFormEmployees = {
  nombre: '',
  apellido: '',
  usuario: '',
  telefono: '',
  roles: [ITEMS_ROL[0].id],
  password: '',
  repetirPassword: '',
  ci: '',
  estado: '1',
  oldPassword: null
}
