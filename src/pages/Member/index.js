import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeStyles, CssBaseline } from '@material-ui/core'
import DashboardWrapper from 'components/DashboardWrapper'
import { ROUTES } from './constants'
import Dashboard from './Home'
import FAQ from './FAQ'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex'
  },
  appMain: {
    flexGrow: 1,
    height: '98vh',
    marginTop: '2vh',
    background: '#F1F5F8',
    borderTopLeftRadius: '12px',
    padding: '40px'
  }
})

const Member = () => {
  const classes = useStyles()
  return (
    <BrowserRouter>
      <div className={classes.wrapper}>
        <DashboardWrapper links={ROUTES} />
        <div className={classes.appMain}>
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
