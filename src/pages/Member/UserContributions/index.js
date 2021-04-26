/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import Card from 'components/Card'
import SortFilter from 'components/SortFilter'

import loader from 'assets/images/loader_loading.gif'

import { ROUTES } from '../constants'
import Dashboard from './components/Dashboard'

import styles from './styles.module.scss'

import { useQuestions } from './hooks'

const UserContributions = () => {
  const { user } = useGlobalState()
  const history = useHistory()
  const [orderBy, setOrderBy] = useState('DESC')
  const {
    questions,
    isLoading,
    refetch,
    getQuestions,
    hasNextPage,
    isFetchingNextPage
  } = useQuestions(orderBy, getRawData(user).user.id)

  const [sort, setSort] = useState('Most Recent')

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
          <Typography className="mb-20" variant="h1">
            My Contributions
          </Typography>
          {questions ? (
            <Dashboard
              question={questions.pages[0].questionCtr}
              hypothesis={questions.pages[0].hypothesisCtr}
              experiment={questions.pages[0].experimentCtr}
              data={questions.pages[0].dataCtr}
              analysis={questions.pages[0].analysisCtr}
            />
          ) : null}
          <>
            {questions ? (
              <>
                <div className={`${styles.paperListHeader}`}>
                  <Typography
                    className={`${styles.title}`}
                    variant="h5"
                  >
                    Contribution List
                    {` (${questions.pages[0].totalContributions})`}
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
                    {/* {JSON.stringify(group.contributions)} */}
                    {group.contributions.map(data => (
                      <div
                        className={`${styles.content}`}
                        onClick={() => {
                          history.push(
                            `/contribution/${
                              data.parentQuestionUuid ||
                              data.uuid
                            }`,
                            { state: data }
                          )
                        }}
                      >
                        <Card
                          data={data}
                          form={false}
                          linesToShow={5}
                          parentTitle={data.parentTitle}
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
                <div className={`${styles.loadMore}`}>
                  <Button
                    className={`${styles.loadMoreBtn}`}
                    onClick={() => getQuestions()}
                    disabled={!hasNextPage || isFetchingNextPage}
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
        </PageContentWrapper>
      )}
    </PageWrapper>
  )
}

export default UserContributions
