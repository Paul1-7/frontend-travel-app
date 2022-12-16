// assets
import { IconHelp, IconMountain, IconRoute, IconSitemap, IconUser, IconUsers, IconLayoutDashboard } from '@tabler/icons';

// constant
const icons = {
    rutas: IconRoute,
    lugares: IconMountain,
    clientes: IconUser,
    empleados: IconUsers,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    dashboard: IconLayoutDashboard
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const other = {
    id: 'sample-docs-roadmap',
    title: 'Modulos',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.dashboard,
            breadcrumbs: true
        },
        {
            id: 'rutas',
            title: 'Rutas',
            type: 'item',
            url: '/rutas',
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
            url: '/lugares',
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
            url: '/clientes',
            icon: icons.clientes,
            breadcrumbs: true
        },
        {
            id: 'empleados',
            title: 'Empleados',
            type: 'item',
            url: '/empleados',
            icon: icons.empleados,
            breadcrumbs: true
        }
    ]
};
