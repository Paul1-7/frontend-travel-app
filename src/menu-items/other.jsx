// assets
import { ROLES, ROUTES } from '@/constants'
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
  IconCar,
  IconAddressBook
} from '@tabler/icons'

const { ENCARGADO_RUTAS, GERENTE, GUIA, SECRETARIA } = ROLES

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
  vehicles: IconCar,
  assignments: IconAddressBook
}

export const other = {
  id: 'sample-docs-roadmap',
  title: 'Modulos',
  type: 'group',
  children: [
    {
      id: 'clientes',
      title: 'Clientes',
      type: 'item',
      url: ROUTES.customers.default,
      icon: icons.clientes,
      breadcrumbs: true,
      allowedRols: [GERENTE, SECRETARIA]
    },
    {
      id: 'choferes',
      title: 'Choferes',
      type: 'item',
      url: ROUTES.drivers.default,
      icon: icons.choferes,
      breadcrumbs: true,
      allowedRols: [GERENTE, SECRETARIA]
    },
    {
      id: 'vehiculos',
      title: 'Vehiculos',
      type: 'item',
      url: ROUTES.vehicles.default,
      icon: icons.vehicles,
      breadcrumbs: true,
      allowedRols: [GERENTE, SECRETARIA]
    },
    {
      id: 'empleados',
      title: 'Empleados',
      type: 'item',
      url: ROUTES.employees.default,
      icon: icons.empleados,
      breadcrumbs: true,
      allowedRols: [GERENTE]
    },
    {
      id: 'rutas',
      title: 'Rutas',
      type: 'item',
      url: ROUTES.routes.default,
      icon: icons.rutas,
      breadcrumbs: true,
      allowedRols: [GERENTE, SECRETARIA, GUIA, ENCARGADO_RUTAS]
    },
    {
      id: 'lugares',
      title: 'Lugares',
      type: 'item',
      url: ROUTES.places.default,
      icon: icons.lugares,
      breadcrumbs: true,
      allowedRols: [GERENTE, SECRETARIA, ENCARGADO_RUTAS]
    },
    {
      id: 'placesSchedule',
      title: 'Horarios de lugares',
      type: 'item',
      url: ROUTES.placesSchedules.default,
      icon: icons.schedules,
      breadcrumbs: true,
      allowedRols: [GERENTE]
    },
    {
      id: 'routesSchedule',
      title: 'Horarios de rutas',
      type: 'item',
      url: ROUTES.routesSchedules.default,
      icon: icons.schedules,
      breadcrumbs: true,
      allowedRols: [GERENTE]
    },
    {
      id: 'contracts',
      title: 'Contratos',
      type: 'item',
      url: ROUTES.contracts.default,
      icon: icons.contract,
      breadcrumbs: true,
      allowedRols: [GERENTE, SECRETARIA]
    },
    {
      id: 'assignments',
      title: 'Asignaciones para contratos',
      type: 'item',
      url: ROUTES.assignments.default,
      icon: icons.assignments,
      breadcrumbs: true,
      allowedRols: [GERENTE, SECRETARIA, GUIA]
    },
    {
      id: 'reports',
      title: 'Reportes',
      type: 'collapse',
      icon: icons.reports,
      allowedRols: [GERENTE],
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
