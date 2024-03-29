/* eslint-disable radix */
import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import { useQueryParams } from 'utils/html/queryParams'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import RightSidebar from 'components/RightSidebar'
import loader from 'assets/images/loader_loading.gif'
import { ROUTES, PRIVATE_ROUTES } from '../constants'
import ContributionHierarchy from './components/ContributionHierarchy'
import ContributionDetails from './components/ContributionDetails'
import { useContribution } from './hooks'
import styles from './styles.module.scss'

const Question = ({ user, hasSession }) => {
  const queryParams = useQueryParams()
  const id = parseInt(queryParams.get('list'))
  const active = parseInt(queryParams.get('active'))
  const {
    contribution,
    isLoading,
    remove,
    getContribution,
    singleRefetch
  } = useContribution(id, active)
  const [activeContribution, setActiveContribution] = useState(
    contribution
  )
  const contributionRef = useCallback(node => {
    if (node !== null) {
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [])

  const handleClick = contribution => {
    setActiveContribution(contribution)
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?list=7&active=${contribution.id}&from=home`
    window.history.pushState({ path: newurl }, '', newurl)
  }

  const location = useLocation()

  useEffect(() => {
    getContribution()
    singleRefetch().then(({ data }) => {
      setActiveContribution(data && data.data)
    })

    return () => {
      remove()
    }
  }, [getContribution, location, remove, id])

  return (
    <PageWrapper
      showNav
      links={hasSession ? PRIVATE_ROUTES : ROUTES}
      contribution={contribution}
      activeContribution={activeContribution}
      onTreeClick={handleClick}
      user={user}
      hasSession={hasSession}
    >
      {isLoading ? (
        <div className="loaderWrapper">
          <img src={loader} alt="Loading ..." />
        </div>
      ) : (
        <>
          <PageContentWrapper backNav>
            <Typography
              className={`${styles.title}`}
              variant="h1"
            >
              Question
            </Typography>
            <ContributionHierarchy
              showDraft={`${
                user && user.user && user.user.id
              } === ${contribution && contribution.userId}`}
              detailsClickable
              getContribution={getContribution}
              contribution={contribution}
              activeContribution={activeContribution}
              onCardClick={handleClick}
              contributionRef={contributionRef}
              hasSession={hasSession}
              user={user}
            />
          </PageContentWrapper>
          <Hidden smDown implementation="css">
            <RightSidebar>
              <ContributionDetails
                hasSession={hasSession}
                user={user}
                data={activeContribution}
                activeContribution={activeContribution}
              />
            </RightSidebar>
          </Hidden>
        </>
      )}
    </PageWrapper>
  )
}

export default Question
