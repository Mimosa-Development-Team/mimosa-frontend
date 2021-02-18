import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import VerticalTab from './components/VerticalTab'

const MemberFAQ = () => {
  return (
    <div>
      <Typography variant="h1" align="center">
        FAQ/Help
      </Typography>
      <Divider />
      <VerticalTab />
    </div>
  )
}

MemberFAQ.propTypes = {}

export default MemberFAQ
