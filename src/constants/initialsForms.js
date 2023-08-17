import { add } from 'date-fns'
import { DEFAULT_VALUE_ITEM, ITEMS_ROL } from './inputs'

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
  nombre: '',
  apellido: '',
  numLicencia: '',
  idVehiculo: '0'
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

export const initialFormRouteListSchedule = {
  route: {
    id: DEFAULT_VALUE_ITEM,
    titulo: 'ninguno',
    precio: null,
    borrado: false,
    descripcion: null,
    duracion: null,
    horariosLugar: null,
    itinerarios: []
  }
}

export const initialFormRouteSchedule = {
  idRuta: '0'
}

export const initialFormContract = {
  idRuta: '0',
  idCliente: { id: 0, nombre: 'Ninguno' },
  fecha: new Date(),
  monto: 0,
  cantidadPersonas: 1,
  idioma: 'es'
}

export const initialFormContractReport = {
  options: {
    criterio: DEFAULT_VALUE_ITEM,
    orderBy: DEFAULT_VALUE_ITEM
  },
  dateStart: new Date(),
  dateEnd: add(new Date(), { days: 1 })
}

export const initialFormVehicle = {
  modelo: '',
  tipo: '0',
  placa: '',
  capacidad: ''
}
