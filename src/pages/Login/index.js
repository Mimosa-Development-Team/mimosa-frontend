import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import PageMaintenance from '../Static/PageMaintenance'
import PageTermsConditions from '../Static/PageTermsConditions'
import Page404 from '../Static/Page404'
import LoginDashboard from './Login'
// import TEST from './TestHome'

const Login = () => {
  return (
    <div className="wrapper">
      <div className="appMain">
        <Switch>
          <Route path="/" component={LoginDashboard} />
          <Route
            path="/maintenance"
            component={PageMaintenance}
          />
          <Route
            path="/terms-and-conditions"
            component={PageTermsConditions}
          />
          <Route component={Page404} />
        </Switch>
      </div>
      <CssBaseline />
    </div>
  )
}

Login.propTypes = {}

export default Login
