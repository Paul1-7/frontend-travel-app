export const COLUMNS_TABLE = {
  routes: [
    { field: 'titulo', header: 'titulo', type: '' },
    { field: 'descripcion', header: 'descripcion', type: '' },
    { field: 'duracion', header: 'duracion', type: '' },
    { field: 'precio', header: 'precio por persona', type: 'currency' }
  ],
  employees: [
    { field: 'nombre', header: 'Nombre', type: '' },
    { field: 'apellido', header: 'Apellido', type: '' },
    { field: 'ci', header: 'CI/Nit', type: '' },
    { field: 'roles', header: 'Roles', type: '' },
    { field: 'estado', header: 'Estado', type: 'states' }
  ],
  customers: [
    { field: 'nombre', header: 'Nombre', type: '' },
    { field: 'apellido', header: 'Apellido', type: '' },
    { field: 'ci', header: 'CI/Nit', type: '' },
    { field: 'estado', header: 'Estado', type: 'states' }
  ],
  places: [
    { field: 'nombre', header: 'Nombre', type: '' },
    { field: 'direccion', header: 'Direción', type: '' },
    { field: 'estado', header: 'Estado', type: 'states' }
  ],
  drivers: [
    { field: 'nombre', header: 'Nombre', type: '' },
    { field: 'apellido', header: 'Apellido', type: '' },
    { field: 'numLicencia', header: 'Número de licencia', type: '' },
    { field: 'vehiculo', header: 'Vehiculo', type: '' }
  ],
  vehicles: [
    { field: 'placa', header: 'Placa', type: '' },
    { field: 'modelo', header: 'modelo', type: '' },
    { field: 'tipo', header: 'tipo', type: '' },
    { field: 'capacidad', header: 'Capacidad', type: '' }
  ],
  contracts: [
    { field: 'codReferencia', header: 'Código', type: '' },
    { field: 'cliente', header: 'Cliente', type: '' },
    { field: 'monto', header: 'Monto (Bs)', type: '' },
    { field: 'cantidadPersonas', header: 'Cantidad de personas', type: '' },
    { field: 'ruta', header: 'Ruta', type: '' },
    { field: 'fechaSalida', header: 'Fecha de salida', type: 'date' },
    { field: 'estado', header: 'Estado', type: '' }
  ],
  assignments: [
    { field: 'codReferencia', header: 'Código', type: '' },
    { field: 'fecha', header: 'Fecha de salida', type: 'date' },
    { field: 'totalPersonas', header: 'Cantidad de personas', type: '' },
    { field: 'ruta', header: 'Ruta', type: '' },
    { field: 'capMaxPersonas', header: 'Capacidad max. personas', type: '' }
  ]
}

export const TABLE_STATES = {
  active: [
    { name: 'Deshabilitado', variant: 'error' },
    { name: 'Habilitado', variant: 'success' }
  ],
  salesTypes: [
    { name: 'Directa', variant: 'info' },
    { name: 'Electrónica', variant: 'info' }
  ],
  paymentMethods: [
    { name: 'En efectivo', variant: 'info' },
    { name: 'Paypal', variant: 'info' },
    { name: 'Stripe', variant: 'info' }
  ]
}

export const COLUMN_FORMAT = {
  id: '',
  numeric: false,
  disablePadding: false,
  sorting: true,
  label: ''
}
