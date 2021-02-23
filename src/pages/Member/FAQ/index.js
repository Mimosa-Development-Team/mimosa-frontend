import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import SearchField from 'components/SearchField'
import VerticalTab from './components/VerticalTab'
import { useFaq } from './hooks'

const MemberFAQ = () => {
  const { faq, getFaq } = useFaq()

  useEffect(() => {
    getFaq()
  }, [getFaq])

  return (
    <div>
      <Typography variant="h1" align="center">
        FAQ/Help
      </Typography>
      <div className="mt-10 align-center">
        <SearchField variant="large" />
      </div>
      <Divider />
      <VerticalTab data={faq} />
    </div>
  )
}

MemberFAQ.propTypes = {}

export default MemberFAQ
