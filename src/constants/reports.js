import { add } from 'date-fns'

const dateEnd = new Date()

export const REPORT_FREQUENCY_OPTIONS = [
  {
    id: '1',
    name: 'Diaria',
    dateStart: add(new Date(), { days: -1 }),
    dateEnd
  },
  {
    id: '2',
    name: 'Semanal',
    dateStart: add(new Date(), { days: -7 }),
    dateEnd
  },
  {
    id: '3',
    name: 'Mensual',
    dateStart: add(new Date(), { days: -30 }),
    dateEnd
  },
  {
    id: '4',
    name: 'Anual',
    dateStart: add(new Date(), { days: -365 }),
    dateEnd
  },
  {
    id: '5',
    name: 'Rango de fechas',
    dateStart: null,
    dateEnd: null
  }
]

export const COLUMNS_CONTRACTS_REPORT = [
  { displayName: 'N°', id: 'index' },
  { displayName: 'Cliente', id: 'cliente' },
  { displayName: 'Monto (Bs)', id: 'monto' },
  { displayName: 'Cantidad de personas', id: 'cantidadPersonas' },
  { displayName: 'Fecha del contrato', id: 'fecha' },
  { displayName: 'Idioma', id: 'idioma' },
  { displayName: 'Empleado', id: 'empleado' }
]

export const COLUMNS_CUSTOMER_MORE_CONTRACTS_REPORT = [
  { displayName: 'N°', id: 'index' },
  { displayName: 'Cliente', id: 'cliente' },
  { displayName: 'N° de contrataciones', id: 'contrataciones' }
]

export const COLUMNS_ROUTES_MORE_CONTRACTS_REPORT = [
  { displayName: 'N°', id: 'index' },
  { displayName: 'Ruta', id: 'ruta' },
  { displayName: 'N° de contrataciones', id: 'contrataciones' }
]

export const CONTRACTS_REPORT_SORT_OPTIONS = [
  { id: '1', name: 'Fecha del contrato' },
  { id: '2', name: 'Monto' },
  { id: '3', name: 'nombre de cliente' },
  {
    id: '4',
    name: 'clientes con mas contrataciones'
  },
  {
    id: '5',
    name: 'rutas mas contratadas'
  }
]
