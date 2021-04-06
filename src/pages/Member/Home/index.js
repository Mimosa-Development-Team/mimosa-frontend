/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from 'components/Card'
import LeftSidebar from 'components/LeftSidebar'
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
import { useQuestions } from './hooks'

const MemberDashboard = () => {
  const history = useHistory()
  const {
    questions,
    isLoading,
    getQuestions,
    hasNextPage,
    isFetchingNextPage
  } = useQuestions()
  const [search, setSearch] = useState('')

  const handleKeyPress = e => {
    setSearch(e.target.value)
    if (e.key === 'Enter' && e.target.value) {
      history.push(`/search=${e.target.value}`)
    }
  }

  const handleClick = () => {
    if (search) {
      history.push(`/search=${search}`)
    }
  }

  // useEffect(() => {
  //   getQuestions()
  // }, [getQuestions])

  return (
    <PageWrapper>
      <LeftSidebar showNav links={ROUTES} />
      {isLoading ? (
        <div className="loaderWrapper">
          <img src={loader} alt="Loading ..." />
        </div>
      ) : (
        <PageContentWrapper>
          <div className={`${styles.groupHeader}`}>
            <SearchField
              inputChange={handleKeyPress}
              inputSubmit={handleClick}
              // search={search}
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

export default MemberDashboard
