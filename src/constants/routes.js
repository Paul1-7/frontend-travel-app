const DEFAULT_ADMIN_PATH = '/administracion'

export const ROUTES = {
  dashboard: DEFAULT_ADMIN_PATH + '/inicio',
  employees: {
    add: DEFAULT_ADMIN_PATH + '/empleados/agregar',
    modify: DEFAULT_ADMIN_PATH + '/empleados/modificar',
    default: DEFAULT_ADMIN_PATH + '/empleados'
  },
  customers: {
    add: DEFAULT_ADMIN_PATH + '/clientes/agregar',
    modify: DEFAULT_ADMIN_PATH + '/clientes/modificar',
    default: DEFAULT_ADMIN_PATH + '/clientes'
  },
  places: {
    add: DEFAULT_ADMIN_PATH + '/lugares/agregar',
    modify: DEFAULT_ADMIN_PATH + '/lugares/modificar',
    default: DEFAULT_ADMIN_PATH + '/lugares'
  },
  routes: {
    add: DEFAULT_ADMIN_PATH + '/rutas/agregar',
    modify: DEFAULT_ADMIN_PATH + '/rutas/modificar',
    detail: DEFAULT_ADMIN_PATH + '/rutas/detalle',
    default: DEFAULT_ADMIN_PATH + '/rutas'
  },
  drivers: {
    add: DEFAULT_ADMIN_PATH + '/choferes/agregar',
    modify: DEFAULT_ADMIN_PATH + '/choferes/modificar',
    default: DEFAULT_ADMIN_PATH + '/choferes'
  }
}
