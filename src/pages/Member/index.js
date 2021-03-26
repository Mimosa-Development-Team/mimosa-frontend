import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Dashboard from './Home'
import ContributionForm from './ContributionForm'
import FAQ from './FAQ'
import Question from './Question'
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
          <Route path="/about" component={Dashboard} />
          <Route path="/faq" component={FAQ} />
        </Switch>
      </div>
      <CssBaseline />
    </div>
  )
}

Member.propTypes = {}

export default Member
