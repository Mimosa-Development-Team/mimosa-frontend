/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'

import Typography from '@material-ui/core/Typography'

import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import Card from 'components/Card'
import SortFilter from 'components/SortFilter'
import InfiniteScroll from 'react-infinite-scroll-component'

import loader from 'assets/images/loader_loading.gif'

import { ROUTES } from '../constants'
import Dashboard from './components/Dashboard'

import styles from './styles.module.scss'

import { useUserContributions } from './hooks'

const UserContributions = () => {
  const { user } = useGlobalState()
  const history = useHistory()
  const [orderBy, setOrderBy] = useState('DESC')
  const {
    userContributions,
    isLoading,
    refetch,
    getUserContributions,
    hasNextPage
  } = useUserContributions(orderBy, getRawData(user).user.id)

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
    <PageWrapper showNav links={ROUTES}>
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
              My Contributions
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
                      {(group.contributions || []).map(data => (
                        <div
                          className={`${styles.content}`}
                          onClick={() => {
                            history.push(
                              `/contribution/${data.parentQuestionUuid}`,
                              { state: data }
                            )
                          }}
                        >
                          <Card
                            data={data}
                            form={false}
                            linesToShow={5}
                            parentTitle={data.parentTitle}
                            hideEdit
                          />
                        </div>
                      ))}
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
