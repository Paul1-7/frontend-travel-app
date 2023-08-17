// assets
import { ROUTES } from '@/constants'
import {
  IconMountain,
  IconRoute,
  IconUser,
  IconUsers,
  IconLayoutDashboard,
  IconCalendarStats,
  IconUserCheck,
  IconFileDescription,
  IconClipboardData,
  IconCar
} from '@tabler/icons'

// constant
const icons = {
  rutas: IconRoute,
  lugares: IconMountain,
  choferes: IconUserCheck,
  clientes: IconUser,
  empleados: IconUsers,
  dashboard: IconLayoutDashboard,
  schedules: IconCalendarStats,
  contract: IconFileDescription,
  reports: IconClipboardData,
  vehicles: IconCar
}

export const other = {
  id: 'sample-docs-roadmap',
  title: 'Modulos',
  type: 'group',
  children: [
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
      id: 'choferes',
      title: 'Choferes',
      type: 'item',
      url: ROUTES.drivers.default,
      icon: icons.choferes,
      breadcrumbs: true
    },
    {
      id: 'vehiculos',
      title: 'Vehiculos',
      type: 'item',
      url: ROUTES.vehicles.default,
      icon: icons.vehicles,
      breadcrumbs: true
    },
    {
      id: 'empleados',
      title: 'Empleados',
      type: 'item',
      url: ROUTES.employees.default,
      icon: icons.empleados,
      breadcrumbs: true
    },
    {
      id: 'placesSchedule',
      title: 'Horarios de lugares',
      type: 'item',
      url: ROUTES.placesSchedules.default,
      icon: icons.schedules,
      breadcrumbs: true
    },
    {
      id: 'routesSchedule',
      title: 'Horarios de rutas',
      type: 'item',
      url: ROUTES.routesSchedules.default,
      icon: icons.schedules,
      breadcrumbs: true
    },
    {
      id: 'contracts',
      title: 'Contratos',
      type: 'item',
      url: ROUTES.contracts.default,
      icon: icons.contract,
      breadcrumbs: true
    },
    {
      id: 'reports',
      title: 'Reportes',
      type: 'collapse',
      icon: icons.reports,
      children: [
        {
          id: 'contract-report',
          title: 'Contratos',
          type: 'item',
          url: ROUTES.reports.contracts,
          breadcrumbs: true,
          icon: icons.contract
        }
      ]
    }
  ]
}
