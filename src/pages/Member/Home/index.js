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
import TooltipUi from '../../../components/Tooltip'
import { ROUTES, PRIVATE_ROUTES } from '../constants'
import styles from './style.module.scss'
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
  const {
    results,
    getResults,
    isLoading: resultLoading
  } = useResults(search)
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
    getResults()
  }, [refetch, getResults])

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
              <TooltipUi
                title="Create new Question"
                style={{ padding: '10px' }}
                arrow
              >
                <Button
                  className="btn primary questionClass"
                  size="large"
                  variant="contained"
                  onClick={() => {
                    if (hasSession) {
                      history.push(
                        '/contribution-form/question/new'
                      )
                    } else {
                      setModal(true)
                    }
                  }}
                >
                  <AddBoxIcon /> NEW QUESTION
                </Button>
              </TooltipUi>
            </div>
            {showResults ? (
              <SearchResults
                resultLoading={resultLoading}
                searchTerm={search}
                data={results}
              />
            ) : (
              <>
                {questions ? (
                  <>
                    <div className={`${styles.paperListHeader}`}>
                      <Typography
                        className={`${styles.title}`}
                        variant="h5"
                      >
                        Paper List
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
                    <div id="test" className="test">
                      {questions.pages.map((group, i) => (
                        <React.Fragment key={i}>
                          {group.draftQuestions.map(
                            (data, index) => (
                              <div
                                key={index}
                                className={`${styles.content} cardlist`}
                              >
                                <Card
                                  click={() => {
                                    history.push(
                                      `/contribution?list=${data.id}&active=${data.id}&from=home`,
                                      {
                                        state: data,
                                        from: 'home'
                                      }
                                    )
                                  }}
                                  data={data}
                                  form={false}
                                  linesToShow={5}
                                  hideEdit
                                  showDraft={
                                    user &&
                                    user.user &&
                                    user.user.id === data.userId
                                  }
                                  user={user}
                                  hasSession={hasSession}
                                />
                              </div>
                            )
                          )}
                          {group?.data.map((data, index) => (
                            <div
                              key={index}
                              className={`${
                                styles.content
                              } ${`test`}`}
                            >
                              <Card
                                click={() => {
                                  history.push(
                                    `/contribution?list=${data.id}&active=${data.id}&from=home`,
                                    {
                                      state: data,
                                      from: 'home'
                                    }
                                  )
                                }}
                                showDraft={
                                  user &&
                                  user.user &&
                                  user.user.id === data.userId
                                }
                                detailsClickable={false}
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
