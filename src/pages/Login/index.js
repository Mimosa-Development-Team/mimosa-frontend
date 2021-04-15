import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import LoginDashboard from './Login'
import TEST from './TestHome'

const Login = () => {
  return (
    <div className="wrapper">
      <div className="appMain">
        <Switch>
          <Route exact path="/" component={LoginDashboard} />
          <Route exact path="/home" component={TEST} />
        </Switch>
      </div>
      <CssBaseline />
    </div>
  )
}

Login.propTypes = {}

export default Login
