import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { CssBaseline } from '@material-ui/core'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import PageMaintenance from '../Static/PageMaintenance'
import PageTermsConditions from '../Static/PageTermsConditions'
import Page404 from '../Static/Page404'
import Login from '../Login/Login'
import Dashboard from './Home'
import UserContributions from './UserContributions'
import About from './About'
import ContributionForm from './ContributionForm'
import FAQ from './FAQ'
import Question from './Question'
import './index.scss'

const Member = () => {
  const { user: proxyUser } = useGlobalState()
  const [hasSession, setHasSession] = useState(false)
  const [user, setUser] = useState(null)
  const temp = getRawData(proxyUser)

  useEffect(() => {
    setHasSession(!isEmpty(temp))
    setUser(getRawData(proxyUser))
  }, [setHasSession, setUser, user, proxyUser])

  return (
    <div className="wrapper">
      <div className="appMain">
        <Switch>
          <Route
            exact
            path="/"
            component={props => (
              <Dashboard
                {...props}
                hasSession={hasSession}
                user={user}
              />
            )}
          />
          <Route
            path="/contribution/:id"
            component={props => {
              return (
                <Question
                  {...props}
                  hasSession={hasSession}
                  user={user}
                />
              )
            }}
          />
          <Route
            path="/contribution-form/:type/:method"
            component={props => {
              return (
                <ContributionForm
                  {...props}
                  hasSession={hasSession}
                  user={user}
                />
              )
            }}
          />
          <Route
            path="/my-contributions"
            component={props => {
              return (
                <UserContributions
                  {...props}
                  hasSession={hasSession}
                  user={user}
                />
              )
            }}
          />
          <Route
            path="/about"
            component={props => {
              return (
                <About
                  {...props}
                  hasSession={hasSession}
                  user={user}
                />
              )
            }}
          />
          <Route path="/faq" component={FAQ} user={user} />
          <Route
            path="/login"
            component={props => <Login {...props} />}
          />
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
