/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import NoResultsFound from 'components/NoResultsFound'
import loader from 'assets/images/loader_loading.gif'
import Loading from 'components/LoadingPage'
import { ROUTES, PRIVATE_ROUTES } from '../constants'
import VerticalTab from './components/VerticalTab'
import SearchResults from './components/SearchResults'
import { useFaq, useFaqResults } from './hooks'

const MemberFAQ = ({ user, hasSession }) => {
  const { faq, isLoading, getFaq } = useFaq()
  const [searchFaq, setSearchFaq] = useState('')
  const [showResults, setShowResults] = useState(false)
  const {
    faqResults,
    getFaqResults,
    isLoading: faqLoading
  } = useFaqResults(searchFaq)

  const handleKeyPress = e => {
    setSearchFaq(e.target.value)
    if (e.target.value.length > 3) {
      getFaqResults(searchFaq)
      setShowResults(true)
    }
    if (e.target.value === '') {
      setShowResults(false)
    }
  }

  const handleCancel = () => {
    setSearchFaq('')
    setShowResults(false)
  }

  const handleSubmit = () => {
    if (searchFaq) {
      getFaqResults(searchFaq)
      setShowResults(true)
    }
  }

  useEffect(() => {
    getFaq()
  }, [getFaq])

  useEffect(() => {
    getFaqResults(searchFaq)
  }, [getFaqResults, searchFaq])

  return (
    <PageWrapper
      showNav
      links={hasSession ? PRIVATE_ROUTES : ROUTES}
      user={user}
      hasSession={hasSession}
    >
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
            <SearchField
              faq
              variant="large"
              inputSubmit={handleSubmit}
              inputChange={handleKeyPress}
              inputClear={handleCancel}
              search={searchFaq}
            />
          </div>
          <Divider />
          {showResults ? (
            <>
              {faqResults ? (
                <SearchResults
                  searchTerm={searchFaq}
                  data={faqResults}
                />
              ) : faqLoading ? (
                <Loading />
              ) : (
                <NoResultsFound term={searchFaq} />
              )}
            </>
          ) : (
            <VerticalTab data={faq} />
          )}
        </PageContentWrapper>
      )}
    </PageWrapper>
  )
}

MemberFAQ.propTypes = {}

export default MemberFAQ
