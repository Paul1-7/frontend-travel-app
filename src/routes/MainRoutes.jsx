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
const Places = Loadable(lazy(() => import('../views/places/Places')))
const AddPlace = Loadable(lazy(() => import('../views/places/AddPlace')))

// employees
const Employees = Loadable(lazy(() => import('../views/employees/Employees')))
const AddEmployees = Loadable(
  lazy(() => import('../views/employees/AddEmployees'))
)
const ModifyEmployees = Loadable(
  lazy(() => import('../views/employees/ModifyEmployees'))
)

// customers
const Customers = Loadable(lazy(() => import('../views/customers/Customers')))
const AddCustomer = Loadable(
  lazy(() => import('../views/customers/AddCustomer'))
)
const ModifyCustomer = Loadable(
  lazy(() => import('../views/customers/ModifyCustomer'))
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
          {/* places*/}
          <Route
            exact
            path={ROUTES.places.default}
            children={
              <DataTableProvider>
                <Places />
              </DataTableProvider>
            }
          />
          <Route exact path={ROUTES.places.add} component={AddPlace} />
          {/* <Route
            exact
            path={`${ROUTES.employees.modify}/:id`}
            component={ModifyEmployees}
          />  */}
          {/* empleados*/}
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
          {/* customers */}
          <Route
            exact
            path={ROUTES.customers.default}
            children={
              <DataTableProvider>
                <Customers />
              </DataTableProvider>
            }
          />
          <Route exact path={ROUTES.customers.add} component={AddCustomer} />
          <Route
            exact
            path={`${ROUTES.customers.modify}/:id`}
            component={ModifyCustomer}
          />
          {/* </AuthGuard> */}
        </Switch>
      </MainLayout>
    </Route>
  )
}

export default MainRoutes
