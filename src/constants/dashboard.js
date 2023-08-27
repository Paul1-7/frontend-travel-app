import { IconUser, IconBus } from '@tabler/icons'
import { ROUTES } from './routes'
import { IconMountain } from '@tabler/icons'
import { Article } from '@mui/icons-material'

export const DASHBOARD = {
  employees: {
    default: {
      title: 'Empleados',
      description: 'Lista de empleados',
      button: {
        icon: IconUser,
        url: ROUTES.employees.add,
        name: 'Nuevo empleado'
      }
    },
    add: {
      title: 'Agregar empleado',
      description: 'Agrega un empleado para el acceso al sistema'
    },
    modify: {
      title: 'Modificar empleado',
      description: 'Modifica un empleado existente para el acceso al sistema'
    }
  },
  customers: {
    default: {
      title: 'Clientes',
      description: 'Lista de clientes',
      button: {
        icon: IconUser,
        url: ROUTES.customers.add,
        name: 'Nuevo cliente'
      }
    },
    add: {
      title: 'Agregar cliente',
      description: 'Agrega un cliente para el acceso al sistema'
    },
    modify: {
      title: 'Modificar cliente',
      description: 'Modifica un cliente existente para el acceso al sistema'
    }
  },
  places: {
    default: {
      title: 'Lugares',
      description: 'Lista de lugares',
      button: {
        icon: IconMountain,
        url: ROUTES.places.add,
        name: 'Nuevo lugar'
      }
    },
    add: {
      title: 'Agregar nuevo lugar',
      description: 'Agrega un lugar para crear una ruta'
    },
    modify: {
      title: 'Modificar lugar',
      description: 'Modifica un lugar existente'
    }
  },
  drivers: {
    default: {
      title: 'Choferes',
      description: 'Lista de choferes para las rutas',
      button: {
        icon: IconUser,
        url: ROUTES.drivers.add,
        name: 'Nuevo chofer'
      }
    },
    add: {
      title: 'Agregar chofer',
      description: 'Agrega un chofer para las rutas'
    },
    modify: {
      title: 'Modificar chofer',
      description: 'Modifica un chofer existente para las rutas'
    }
  },
  vehicles: {
    default: {
      title: 'Vehiculos',
      description: 'Lista de vehiculos para las rutas',
      button: {
        icon: IconBus,
        url: ROUTES.vehicles.add,
        name: 'Nuevo vehiculo'
      }
    },
    add: {
      title: 'Agregar vehiculo',
      description: 'Agrega un vehiculo para las rutas'
    },
    modify: {
      title: 'Modificar vehiculo',
      description: 'Modifica los datos de un vehiculo existente para las rutas'
    }
  },
  routes: {
    default: {
      title: 'Rutas',
      description: 'Lista de rutas',
      button: {
        icon: Article,
        url: ROUTES.routes.add,
        name: 'Nueva ruta'
      }
    },
    add: {
      title: 'Agregar ruta',
      description: 'Agrega una nueva ruta '
    },
    modify: {
      title: 'Modificar ruta',
      description: 'Modifica una ruta existente'
    },
    detail: {
      title: 'Detalle de ruta',
      description: 'Muestra la informacion de la ruta y los cambios que tuvo'
    }
  },
  placesSchedules: {
    default: {
      title: 'Horarios de lugares',
      description: 'Se define los horarios de atención de cada lugar'
    }
  },
  routesSchedules: {
    default: {
      title: 'Horarios de rutas',
      description:
        'Se define los horarios de las rutas en base a los horarios disponibles de los lugares'
    }
  },
  contracts: {
    default: {
      title: 'Contrataciones',
      description: 'Lista de contrataciones',
      button: {
        icon: Article,
        url: ROUTES.contracts.add,
        name: 'Nueva contratación'
      }
    },
    add: {
      title: 'Agregar contratación',
      description: 'Agrega una nueva contratación '
    },
    modify: {
      title: 'Modificar contratación',
      description: 'Modifica una contratación existente'
    },
    detail: {
      title: 'Detalle de contratación',
      description: 'Muestra la informacion del contrato'
    }
  },
  assignments: {
    default: {
      title: 'Asignaciones para contratos',
      description: 'Lista de las asignaciones para los contratos de las rutas',
      button: {
        icon: Article,
        url: ROUTES.assignments.add,
        name: 'Nueva asignación'
      }
    },
    add: {
      title: 'Agregar asignación',
      description: 'Agrega una nueva asignación de personal para las rutas'
    },
    modify: {
      title: 'Modificar asignación',
      description: 'Modifica una asignación existente'
    },
    detail: {
      title: 'Detalle de asignación',
      description:
        'Muestra la informacion de la asignación de personal para las rutas'
    }
  },
  reports: {
    contracts: {
      title: 'Reportes de de contratos de rutas',
      description:
        'Genera reportes de los contratos de rutas en formato PDF o CSV'
    }
  }
}
