/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'

import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import Card from 'components/Card'
import SortFilter from 'components/SortFilter'
import InfiniteScroll from 'react-infinite-scroll-component'

import loader from 'assets/images/loader_loading.gif'

import { ROUTES, PRIVATE_ROUTES } from '../constants'
import Dashboard from './components/Dashboard'

import styles from './styles.module.scss'

import { useUserContributions } from './hooks'

const UserContributions = ({ user, hasSession }) => {
  const history = useHistory()
  const [orderBy, setOrderBy] = useState('DESC')
  const {
    userContributions,
    isLoading,
    refetch,
    getUserContributions,
    hasNextPage
  } = useUserContributions(
    orderBy,
    hasSession ? user.user.id : null
  )

  const [sort, setSort] = useState('Most Recent')

  const dataLength = userContributions
    ? userContributions.pages.reduce((counter, page) => {
        return counter + page.contributions.length
      }, 0)
    : ''

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
          <InfiniteScroll
            dataLength={dataLength}
            next={getUserContributions}
            hasMore={hasNextPage}
            loader={
              <div className={`${styles.loadingLabel}`}>
                Loading...
              </div>
            }
            scrollableTarget="scrollableList"
          >
            <Typography className="mb-20" variant="h1">
              User Profile
            </Typography>
            {userContributions ? (
              <Dashboard
                question={userContributions.pages[0].questionCtr}
                hypothesis={
                  userContributions.pages[0].hypothesisCtr
                }
                experiment={
                  userContributions.pages[0].experimentCtr
                }
                data={userContributions.pages[0].dataCtr}
                analysis={userContributions.pages[0].analysisCtr}
              />
            ) : null}
            <>
              {userContributions ? (
                <>
                  <div className={`${styles.paperListHeader}`}>
                    <Typography
                      className={`${styles.title}`}
                      variant="h5"
                    >
                      Contribution List
                      {` (${userContributions.pages[0].totalContributions})`}
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
                  {userContributions.pages.map((group, i) => (
                    <React.Fragment key={i}>
                      {/* {JSON.stringify(group.contributions)} */}
                      {(group.contributions || []).map(
                        (data, index) => (
                          <div
                            key={index}
                            className={`${styles.content}`}
                            data-tut={`${
                              i === 0 && 'reactour__state'
                            }`}
                          >
                            <Card
                              click={() => {
                                history.push(
                                  `/contribution?list=${
                                    data.mainParentId || data.id
                                  }&active=${
                                    data.id
                                  }&from=profile`,
                                  {
                                    state: data,
                                    from: 'my-contribution'
                                  }
                                )
                              }}
                              showDraft={
                                `${user && user.user.id}` ===
                                `${data && data.userId}`
                              }
                              detailsClickable
                              data={data}
                              form={false}
                              linesToShow={5}
                              parentTitle={data.parentTitle}
                              hideEdit
                            />
                          </div>
                        )
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : null}
            </>
          </InfiniteScroll>
        </PageContentWrapper>
      )}
    </PageWrapper>
  )
}

export default UserContributions
