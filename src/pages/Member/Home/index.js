import React from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import Form from './components/form'

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

const MemberDashboard = () => {
  const classes = useStyles()
  return (
    <div>
      <Paper className={classes.pageContent}>
        <Form />
      </Paper>
    </div>
  )
}

MemberDashboard.propTypes = {}

export default MemberDashboard
