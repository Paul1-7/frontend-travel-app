import { IconUser } from '@tabler/icons'
import { ROUTES } from './routes'
import { IconMountain } from '@tabler/icons'

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
  }
}
