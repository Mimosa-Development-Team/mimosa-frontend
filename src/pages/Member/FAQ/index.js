import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core'
import VerticalTab from './components/VerticalTab'

const style = {
  header: {
    textAlign: 'center'
  },
  divider: {
    margin: '30px 0'
  }
}

const MemberFAQ = props => {
  const { classes } = props

  return (
    <div>
      <Typography
        className={classes.header}
        variant="h5"
        component="h1"
      >
        FAQ/Help
      </Typography>
      <Divider className={classes.divider} />
      <VerticalTab />
    </div>
  )
}

MemberFAQ.propTypes = {}

export default withStyles(style)(MemberFAQ)
