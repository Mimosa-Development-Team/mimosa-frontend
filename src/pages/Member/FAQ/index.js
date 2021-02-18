import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core'
import VerticalTab from './components/VerticalTab'
import { useFaq } from './hooks'

const style = {
  header: {
    textAlign: 'center'
  },
  divider: {
    margin: '30px 0'
  }
}

const MemberFAQ = props => {
  const { faq, getFaq } = useFaq()
  const { classes } = props

  useEffect(() => {
    getFaq()
  }, [])

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
      <VerticalTab data={faq} />
    </div>
  )
}

MemberFAQ.propTypes = {}

export default withStyles(style)(MemberFAQ)
