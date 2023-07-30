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

export const initialFormCustomers = {
  nombre: '',
  apellido: '',
  ci: '',
  telefono: '',
  estado: '1'
}

export const initialFormPlaces = {
  nombre: '',
  direccion: '',
  horariosAtencion: '',
  estado: '1'
}

export const initialFormDriver = {
  nombreChofer: '',
  apellidoChofer: '',
  auto: '',
  capacidad: ''
}

export const initialFormRoute = {
  titulo: '',
  descripcion: '',
  duracion: '',
  precio: '',
  itinerarios: [
    {
      idLugar: '0'
    }
  ]
}

export const initialFormPlaceSchedule = {
  idLugar: '0'
}
