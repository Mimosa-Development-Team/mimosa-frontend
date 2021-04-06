import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LeftSidebar from 'components/LeftSidebar'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import loader from 'assets/images/loader_loading.gif'
import { ROUTES } from '../constants'
import VerticalTab from './components/VerticalTab'
import { useFaq } from './hooks'

const MemberFAQ = () => {
  const { faq, isLoading, getFaq } = useFaq()

  useEffect(() => {
    getFaq()
  }, [getFaq])

  return (
    <PageWrapper>
      <LeftSidebar showNav links={ROUTES} />
      {isLoading ? (
        <div className="loaderWrapper">
          <img src={loader} alt="Loading ..." />
        </div>
      ) : (
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
      )}
    </PageWrapper>
  )
}

MemberFAQ.propTypes = {}

export default MemberFAQ
