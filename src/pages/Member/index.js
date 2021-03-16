import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Dashboard from './Home'
import QuestionForm from './QuestionForm'
import FAQ from './FAQ'
import Question from './Question'
import './index.scss'

const Member = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="appMain">
          <Switch>
            <Route exact path="/" component={Question} />
            <Route path="/contribution" component={Question} />
            <Route
              path="/contribution-form"
              component={QuestionForm}
            />
            <Route
              path="/my-contributions"
              component={Dashboard}
            />
            {/* <Route path="/bookmarks" component={Dashboard} /> */}
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
