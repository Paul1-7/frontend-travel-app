import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

// routes
import MainRoutes from './MainRoutes'

// project imports
import { ROUTES } from '@/constants'
import { Loadable } from '@/ui-component'
import { lazy } from 'react'
const Login = Loadable(lazy(() => import('../views/auth/Login')))
//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={ROUTES.auth.login} />
      <Route path={ROUTES.auth.login} component={Login} exact />
      <React.Fragment>
        <MainRoutes />
      </React.Fragment>
    </Switch>
  )
}

export default Routes
