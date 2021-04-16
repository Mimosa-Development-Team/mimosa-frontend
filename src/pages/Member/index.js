import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Dashboard from './Home'
import About from './About'
import ContributionForm from './ContributionForm'
import FAQ from './FAQ'
import Question from './Question'
import PageMaintenance from './Static/PageMaintenance'
import PageTermsConditions from './Static/PageTermsConditions'
import Page404 from './Static/Page404'
import './index.scss'

const Member = () => {
  return (
    <div className="wrapper">
      <div className="appMain">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/contribution/:id" component={Question} />
          <Route
            path="/contribution-form/:type/:method"
            component={ContributionForm}
          />
          <Route
            path="/my-contributions"
            component={Dashboard}
          />
          <Route path="/about" component={About} />
          <Route path="/faq" component={FAQ} />
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

Member.propTypes = {}

export default Member
