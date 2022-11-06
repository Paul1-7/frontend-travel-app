import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../utilities/TablerIcons')));

// rutas
const Rutas = Loadable(lazy(() => import('../views/rutas/Rutas')));
const AgregarFormRuta = Loadable(lazy(() => import('../views/rutas/AgregarFormRuta')));
// lugares
const Lugares = Loadable(lazy(() => import('../views/lugares/Lugares')));
const AgregarFormLugar = Loadable(lazy(() => import('../views/lugares/AgregarFormLugar')));
// clientes
const Clientes = Loadable(lazy(() => import('../views/clientes/Clientes')));
const AgregarFormCliente = Loadable(lazy(() => import('../views/clientes/AgregarFormCliente')));
// empleados
const Empleados = Loadable(lazy(() => import('../views/empleados/Empleados')));
const AgregarFormEmpleado = Loadable(lazy(() => import('../views/empleados/AgregarFormEmpleado')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',

                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/material-icons',

                '/rutas',
                '/lugares',
                '/puntos',
                '/clientes',
                '/empleados'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />

                        <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/utils/util-color" component={UtilsColor} />
                        <Route path="/utils/util-shadow" component={UtilsShadow} />
                        <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" component={UtilsMaterialIcons} />
                        {/* rutas */}
                        <Route exact path="/rutas" component={Rutas} />
                        <Route exact path="/rutas/nuevo" component={AgregarFormRuta} />
                        {/* lugares */}
                        <Route exact path="/lugares" component={Lugares} />
                        <Route exact path="/lugares/nuevo" component={AgregarFormLugar} />
                        {/* clientes */}
                        <Route exact path="/clientes" component={Clientes} />
                        <Route exact path="/clientes/nuevo" component={AgregarFormCliente} />
                        {/* empleados */}
                        <Route exact path="/empleados" component={Empleados} />
                        <Route exact path="/empleados/nuevo" component={AgregarFormEmpleado} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
