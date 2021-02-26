import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import DashboardWrapper from 'components/DashboardWrapper'
import { ROUTES } from './constants'
import Dashboard from './Home'
import FAQ from './FAQ'
import './index.scss'

const Member = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <DashboardWrapper links={ROUTES} />
        <div className="appMain">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route
              path="/my-contributions"
              component={Dashboard}
            />
            <Route path="/bookmarks" component={Dashboard} />
            <Route path="/about" component={Dashboard} />
            <Route path="/faq" component={FAQ} />
          </Switch>
        </div>
      </div>
      <CssBaseline />
    </BrowserRouter>
  )
}

Member.propTypes = {}

export default Member
