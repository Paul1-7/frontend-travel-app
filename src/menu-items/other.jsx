// assets
import { ROUTES } from '@/constants'
import {
  IconHelp,
  IconMountain,
  IconRoute,
  IconSitemap,
  IconUser,
  IconUsers,
  IconLayoutDashboard
} from '@tabler/icons'

// constant
const icons = {
  rutas: IconRoute,
  lugares: IconMountain,
  clientes: IconUser,
  empleados: IconUsers,
  IconHelp: IconHelp,
  IconSitemap: IconSitemap,
  dashboard: IconLayoutDashboard
}

export const other = {
  id: 'sample-docs-roadmap',
  title: 'Modulos',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: ROUTES.dashboard,
      icon: icons.dashboard,
      breadcrumbs: true
    },
    {
      id: 'rutas',
      title: 'Rutas',
      type: 'item',
      url: ROUTES.routes.default,
      icon: icons.rutas,
      breadcrumbs: true,
      children: [
        {
          id: 'nueva-ruta',
          title: 'Nueva ruta',
          type: 'item',
          url: '/rutas/nuevo',
          breadcrumbs: true
        }
      ]
    },

    {
      id: 'lugares',
      title: 'Lugares',
      type: 'item',
      url: ROUTES.places.default,
      icon: icons.lugares,
      breadcrumbs: true,
      children: [
        {
          id: 'nuevo-lugar',
          title: 'Nuevo lugar',
          type: 'item',
          url: '/lugares/nuevo',
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'clientes',
      title: 'Clientes',
      type: 'item',
      url: ROUTES.customers.default,
      icon: icons.clientes,
      breadcrumbs: true
    },
    {
      id: 'empleados',
      title: 'Empleados',
      type: 'item',
      url: ROUTES.employees.default,
      icon: icons.empleados,
      breadcrumbs: true
    }
  ]
}