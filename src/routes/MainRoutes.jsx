import { lazy } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

// project imports
import MainLayout from './../layout/MainLayout'
import Loadable from '../ui-component/Loadable'
import { DataTableProvider } from '../contexts/DataTableContext'
import { ROUTES } from '@/constants'

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import('../views/dashboard/Default'))
)

// rutas
const Routes = Loadable(lazy(() => import('../views/routes/Routes')))
const AddRoute = Loadable(lazy(() => import('../views/routes/AddRoute')))
const ModifyRoute = Loadable(lazy(() => import('../views/routes/ModifyRoute')))
// lugares
const Places = Loadable(lazy(() => import('../views/places/Places')))
const AddPlace = Loadable(lazy(() => import('../views/places/AddPlace')))
const ModifyPlace = Loadable(lazy(() => import('../views/places/ModifyPlace')))

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
// drivers
const Drivers = Loadable(lazy(() => import('../views/drivers/Drivers')))
const AddDriver = Loadable(lazy(() => import('../views/drivers/AddDriver')))
const ModifyDriver = Loadable(
  lazy(() => import('../views/drivers/ModifyDriver'))
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
          <Route
            exact
            path={`${ROUTES.places.modify}/:id`}
            component={ModifyPlace}
          />

          {/* routes*/}
          <Route
            exact
            path={ROUTES.routes.default}
            children={
              <DataTableProvider>
                <Routes />
              </DataTableProvider>
            }
          />
          <Route exact path={ROUTES.routes.add} component={AddRoute} />
          <Route
            exact
            path={`${ROUTES.routes.modify}/:id`}
            component={ModifyRoute}
          />
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
          {/* drivers */}
          <Route
            exact
            path={ROUTES.drivers.default}
            children={
              <DataTableProvider>
                <Drivers />
              </DataTableProvider>
            }
          />
          <Route exact path={ROUTES.drivers.add} component={AddDriver} />
          <Route
            exact
            path={`${ROUTES.drivers.modify}/:id`}
            component={ModifyDriver}
          />
          {/* </AuthGuard> */}
        </Switch>
      </MainLayout>
    </Route>
  )
}

export default MainRoutes
