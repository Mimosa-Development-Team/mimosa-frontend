import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeStyles, CssBaseline } from '@material-ui/core'
import DashboardWrapper from 'components/DashboardWrapper'
import PageHeader from 'components/DashboardWrapper/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import { ROUTES } from './constants'
import Dashboard from './Home'

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

const Member = () => {
  const classes = useStyles()
  return (
    <BrowserRouter>
      <DashboardWrapper links={ROUTES} />
      <div className={classes.appMain}>
        <PageHeader
          title={ROUTES[0].title}
          subTitle="Form design with validation"
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </div>
      <CssBaseline />
    </BrowserRouter>
  )
}

Member.propTypes = {}

export default Member
