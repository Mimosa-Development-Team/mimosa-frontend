/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { isEmpty } from 'lodash'
// import getRawData from 'utils/parsing/Proxy'
import Card from 'components/Card'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import { Button } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Typography from '@material-ui/core/Typography'
import loader from 'assets/images/loader_loading.gif'
import SortFilter from 'components/SortFilter'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoginModal from 'components/Dialog/login'
import { ROUTES, PRIVATE_ROUTES } from '../constants'
import styles from './style.module.scss'
import Banner from './components/Banner'
import SearchResults from './components/SearchResults'
import { useQuestions, useResults } from './hooks'

const MemberDashboard = ({ user, hasSession }) => {
  // const { user } = useGlobalState()
  const history = useHistory()
  const [orderBy, setOrderBy] = useState('DESC')
  const {
    questions,
    isLoading,
    refetch,
    getQuestions,
    hasNextPage
  } = useQuestions(orderBy, !isEmpty(user) ? user.user.id : null)
  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)
  const { results, getResults } = useResults(search)
  const [sort, setSort] = useState('Most Recent')
  const [modal, setModal] = useState(false)

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

  const handleSubmit = () => {
    if (search) {
      getResults(search)
      setShowResults(true)
    }
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

  const dataLength = questions
    ? questions.pages.reduce((counter, page) => {
        return counter + page.data.length
      }, 0)
    : ''

  useEffect(() => {
    refetch()
  }, [refetch])

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
      <LoginModal modal={modal} setModal={setModal} />
      {isLoading ? (
        <div className="loaderWrapper">
          <img src={loader} alt="Loading ..." />
        </div>
      ) : (
        <PageContentWrapper>
          <InfiniteScroll
            dataLength={dataLength}
            next={getQuestions}
            hasMore={hasNextPage}
            loader={
              <div className={`${styles.loadingLabel}`}>
                Loading...
              </div>
            }
            scrollableTarget="scrollableList"
          >
            <div className={`${styles.groupHeader}`}>
              <SearchField
                inputChange={handleKeyPress}
                inputClear={handleCancel}
                inputSubmit={handleSubmit}
                search={search}
                className={`${styles.searchBox}`}
              />
              <Button
                className="btn primary"
                size="large"
                variant="contained"
                onClick={() => {
                  if (hasSession) {
                    history.push(
                      '/contribution-form/question/new',
                      {
                        type: 'new'
                      }
                    )
                  } else {
                    setModal(true)
                  }
                }}
              >
                <AddBoxIcon /> NEW QUESTION
              </Button>
            </div>
            {showResults ? (
              <SearchResults
                searchTerm={search}
                data={results}
              />
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
                    <div id="test">
                      {questions.pages.map((group, i) => (
                        <React.Fragment key={i}>
                          {group.draftQuestions.map(data => (
                            <div
                              className={`${styles.content}`}
                              onClick={() => {
                                history.push(
                                  `/contribution/${
                                    data.category === 'question'
                                      ? data.uuid
                                      : data.parentQuestionUuid
                                  }`,
                                  {
                                    state: data,
                                    from: 'home'
                                  }
                                )
                              }}
                            >
                              <Card
                                data={data}
                                form={false}
                                linesToShow={5}
                                hideEdit
                                user={user}
                                hasSession={hasSession}
                              />
                            </div>
                          ))}
                          {group.data.map(data => (
                            <div
                              className={`${styles.content}`}
                              onClick={() => {
                                history.push(
                                  `/contribution/${data.uuid}`,
                                  {
                                    state: data,
                                    from: 'home'
                                  }
                                )
                              }}
                            >
                              <Card
                                data={data}
                                form={false}
                                linesToShow={5}
                                hideEdit
                                user={user}
                                hasSession={hasSession}
                              />
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
              </>
            )}
          </InfiniteScroll>
        </PageContentWrapper>
      )}
    </PageWrapper>
  )
}

export default MemberDashboard
