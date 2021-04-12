/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Card from 'components/Card'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import { Button } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Typography from '@material-ui/core/Typography'
import loader from 'assets/images/loader_loading.gif'
import { ROUTES } from '../constants'
import styles from './style.module.scss'
import Banner from './components/Banner'
import SearchResults from './components/SearchResults'
import SortFilter from './components/SortFilter'
import { useQuestions, useResults } from './hooks'

const MemberDashboard = () => {
  const history = useHistory()
  const [orderBy, setOrderBy] = useState('DESC')
  const {
    questions,
    isLoading,
    refetch,
    getQuestions,
    hasNextPage,
    isFetchingNextPage
  } = useQuestions(orderBy)
  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)
  const { results, getResults } = useResults(search)
  const [sort, setSort] = useState('Most Recent')

  const handleKeyPress = e => {
    setSearch(e.target.value)
    if (e.target.value.length > 3) {
      getResults(search)
      setShowResults(true)
    }
    if (e.target.value === '') {
      setShowResults(false)
    }
  }

  const handleCancel = () => {
    setSearch('')
    setShowResults(false)
  }

  const handleSortClick = orderBy => {
    if (orderBy === 'DESC') {
      setSort('Most Recent')
    }
    if (orderBy === 'ASC') {
      setSort('Oldest')
    }
    setOrderBy(orderBy)
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    getResults(search)
  }, [getResults, search])

  return (
    <PageWrapper showNav links={ROUTES}>
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
            <Button
              className="btn primary"
              size="large"
              variant="contained"
              onClick={() => {
                history.push('/contribution-form/question/new', {
                  type: 'new'
                })
              }}
            >
              <AddBoxIcon /> NEW QUESTION
            </Button>
          </div>
          {showResults ? (
            <SearchResults searchTerm={search} data={results} />
          ) : (
            <>
              <div className={`${styles.homeBanner}`}>
                <Typography
                  className={`${styles.title}`}
                  variant="h1"
                >
                  Home
                </Typography>
                <Banner />
              </div>
              {questions ? (
                <>
                  <div className={`${styles.paperListHeader}`}>
                    <Typography
                      className={`${styles.title}`}
                      variant="h5"
                    >
                      Contribution List
                    </Typography>
                    <div className={`${styles.sortWrapper}`}>
                      <Typography
                        className={`${styles.title}`}
                        variant="h5"
                      >
                        Sort By:
                      </Typography>
                      <SortFilter
                        sortFilter={sort}
                        onClick={handleSortClick}
                      />
                    </div>
                  </div>
                  {questions.pages.map((group, i) => (
                    <React.Fragment key={i}>
                      {group.data.map(data => (
                        <div
                          className={`${styles.content}`}
                          onClick={() => {
                            history.push(
                              `/contribution/${data.uuid}`
                            )
                          }}
                        >
                          <Card
                            data={data}
                            form={false}
                            linesToShow={5}
                            hideEdit
                          />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                  <div className={`${styles.loadMore}`}>
                    <Button
                      className={`${styles.loadMoreBtn}`}
                      onClick={() => getQuestions()}
                      disabled={
                        !hasNextPage || isFetchingNextPage
                      }
                    >
                      {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
                    </Button>
                  </div>
                </>
              ) : null}
            </>
          )}
        </PageContentWrapper>
      )}
    </PageWrapper>
  )
}

export default MemberDashboard
