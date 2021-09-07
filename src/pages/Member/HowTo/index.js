import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import NoResultsFound from 'components/NoResultsFound'
import loader from 'assets/images/loader_loading.gif'
import { ROUTES, PRIVATE_ROUTES } from '../constants'
import VerticalTab from './components/VerticalTab'
import SearchResults from './components/SearchResults'
import { useFaq, useFaqResults } from './hooks'

const MemberHowTo = ({ user, hasSession }) => {
  const { faq, isLoading, getFaq } = useFaq()
  const [searchFaq, setSearchFaq] = useState('')
  const [showResults, setShowResults] = useState(false)
  const { faqResults, getFaqResults } = useFaqResults(searchFaq)

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
            How to
          </Typography>
          <div className="mt-10 align-center">
            <SearchField
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

MemberHowTo.propTypes = {}

export default MemberHowTo
