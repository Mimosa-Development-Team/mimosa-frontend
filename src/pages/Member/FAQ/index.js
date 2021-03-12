import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LeftSidebar from 'components/LeftSidebar'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import { ROUTES } from '../constants'
import VerticalTab from './components/VerticalTab'
import { useFaq } from './hooks'

const MemberFAQ = () => {
  const { faq, getFaq } = useFaq()

  useEffect(() => {
    getFaq()
  }, [getFaq])

  return (
    <>
      <LeftSidebar showNav links={ROUTES} />
      <PageContentWrapper>
        <Typography variant="h1" align="center">
          FAQ/Help
        </Typography>
        <div className="mt-10 align-center">
          <SearchField variant="large" />
        </div>
        <Divider />
        <VerticalTab data={faq} />
      </PageContentWrapper>
    </>
  )
}

MemberFAQ.propTypes = {}

export default MemberFAQ
