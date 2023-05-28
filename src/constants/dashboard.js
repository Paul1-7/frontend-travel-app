import { IconUser } from '@tabler/icons'
import { ROUTES } from './routes'

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
  }
}
