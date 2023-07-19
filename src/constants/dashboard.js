import { IconUser } from '@tabler/icons'
import { ROUTES } from './routes'
import { IconMountain } from '@tabler/icons'
import { Route } from '@mui/icons-material'

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
  routes: {
    default: {
      title: 'Rutas',
      description: 'Lista de rutas',
      button: {
        icon: Route,
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
  }
}
