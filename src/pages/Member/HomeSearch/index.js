import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from 'components/Card'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import NoResultsFound from 'components/NoResultsFound'
import Typography from '@material-ui/core/Typography'
import loader from 'assets/images/loader_loading.gif'
import { ROUTES, PRIVATE_ROUTES } from '../constants'
import styles from './styles.module.scss'
import { useResults } from './hooks'

const HomeSearch = ({ user, hasSession }) => {
  const history = useHistory()

  const term = window.location.pathname.split('=').pop()
  const [search, setSearch] = useState(term)
  const { results, isLoading, getResults } = useResults(search)

  const handleKeyPress = e => {
    if (e.key === 'Enter' && e.target.value) {
      setSearch(e.target.value)
    }
  }

  const handleCancel = () => {
    setSearch('')
    history.push('/')
  }

  useEffect(() => {
    getResults(search)
  }, [getResults, search])

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
          <div className={`${styles.groupHeader}`}>
            <SearchField
              inputChange={handleKeyPress}
              inputClear={handleCancel}
              search={search}
              className={`${styles.searchBox}`}
            />
          </div>
          {search.length > 4 && (
            <>
              {results ? (
                <>
                  <div className={`${styles.paperListHeader}`}>
                    <Typography
                      className={`${styles.title}`}
                      variant="h5"
                    >
                      Showing results for
                      <span
                        className={`${styles.term}`}
                        style={{
                          color: '#333333',
                          fontWeight: 'bold'
                        }}
                      >
                        {' `'}
                        {search}
                        {'`'}
                      </span>
                    </Typography>
                  </div>
                  {(results || []).map(data => (
                    <div
                      className={`${styles.content}`}
                      onClick={() => {
                        history.push(
                          `/contribution?list=${data.id}&active=${data.id}&from=home`,
                          { state: data }
                        )
                      }}
                    >
                      <Card
                        data={data}
                        form={false}
                        hideDetails
                        hideEdit
                      />
                    </div>
                  ))}
                </>
              ) : (
                <NoResultsFound term={search} />
              )}
            </>
          )}
        </PageContentWrapper>
      )}
    </PageWrapper>
  )
}

export default HomeSearch
