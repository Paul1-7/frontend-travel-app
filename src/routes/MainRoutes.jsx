import { lazy } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

// project imports
import MainLayout from './../layout/MainLayout'
import Loadable from '../ui-component/Loadable'
import AuthGuard from './../utils/route-guard/AuthGuard'
import { DataTableProvider } from '../contexts/DataTableContext'
import { ROUTES } from '@/constants'

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import('../views/dashboard/Default'))
)

// rutas
const Rutas = Loadable(lazy(() => import('../views/rutas/Rutas')))
const AgregarFormRuta = Loadable(
  lazy(() => import('../views/rutas/AgregarFormRuta'))
)
const ModificarFormRuta = Loadable(
  lazy(() => import('../views/rutas/ModificarFormRuta'))
)
// lugares
const Lugares = Loadable(lazy(() => import('../views/lugares/Lugares')))
const AgregarFormLugar = Loadable(
  lazy(() => import('../views/lugares/AgregarFormLugar'))
)
// clientes
const Clientes = Loadable(lazy(() => import('../views/clientes/Clientes')))
const AgregarFormCliente = Loadable(
  lazy(() => import('../views/clientes/AgregarFormCliente'))
)
// empleados
const Employees = Loadable(lazy(() => import('../views/employees/Employees')))
const AddEmployees = Loadable(
  lazy(() => import('../views/employees/AddEmployees'))
)
const ModifyEmployees = Loadable(
  lazy(() => import('../views/employees/ModifyEmployees'))
)

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
  const location = useLocation()

  return (
    <Route path="/administracion">
      <MainLayout>
        <Switch location={location} key={location.pathname}>
          {/* <AuthGuard> */}
          <Route path={ROUTES.dashboard} component={DashboardDefault} />
          {/* <Route
            exact
            path={ROUTES.routes.default}
            children={
              <DataTableProvider>
                <Rutas />
              </DataTableProvider>
            }
          /> */}
          {/* <Route exact path="/rutas/nuevo" component={AgregarFormRuta} />
          <Route
            exact
            path="/rutas/modificar/:id"
            component={ModificarFormRuta}
          />
          <Route exact path="/lugares" component={Lugares} />
          <Route exact path="/lugares/nuevo" component={AgregarFormLugar} />
          <Route exact path="/clientes" component={Clientes} />
          <Route exact path="/clientes/nuevo" component={AgregarFormCliente} /> */}
          {/* empleados */}
          <Route
            exact
            path={ROUTES.employees.default}
            children={
              <DataTableProvider>
                <Employees />
              </DataTableProvider>
            }
          />
          <Route exact path={ROUTES.employees.add} component={AddEmployees} />
          <Route
            exact
            path={`${ROUTES.employees.modify}/:id`}
            component={ModifyEmployees}
          />
          {/* </AuthGuard> */}
        </Switch>
      </MainLayout>
    </Route>
  )
}

export default MainRoutes
