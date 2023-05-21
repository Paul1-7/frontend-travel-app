import React from 'react'
import { Redirect, Switch } from 'react-router-dom'

// routes
import MainRoutes from './MainRoutes'

// project imports
import { ROUTES } from '@/constants'

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={ROUTES.dashboard} />
      <React.Fragment>
        {/* Routes for authentication pages */}
        {/* <AuthenticationRoutes /> */}

        {/* Route for login */}
        {/* <LoginRoutes /> */}

        {/* Routes for main layouts */}
        <MainRoutes />
      </React.Fragment>
    </Switch>
  )
}

export default Routes