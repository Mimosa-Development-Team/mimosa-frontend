import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import VerticalTab from './components/VerticalTab'
import { useFaq } from './hooks'

const MemberFAQ = () => {
  const { faq, getFaq } = useFaq()

  useEffect(() => {
    getFaq()
  })

  return (
    <div>
      <Typography variant="h1" align="center">
        FAQ/Help
      </Typography>
      <Divider />
      <VerticalTab data={faq} />
    </div>
  )
}

MemberFAQ.propTypes = {}

export default MemberFAQ
