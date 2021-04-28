import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import RightSidebar from 'components/RightSidebar'
import loader from 'assets/images/loader_loading.gif'
import { ROUTES } from '../constants'
import ContributionHeirarchy from './components/ContributionHeirarchy'
import ContributionDetails from './components/ContributionDetails'
import { useContribution } from './hooks'
import styles from './styles.module.scss'

const Question = () => {
  const {
    contribution,
    isLoading,
    getContribution
  } = useContribution()

  const [activeContribution, setActiveContribution] = useState(0)

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
  }

  const location = useLocation()

  useEffect(() => {
    if (location.state)
      setActiveContribution(location.state.state)
  }, [location])

  useEffect(() => {
    getContribution()
    if (contribution && location.state === undefined) {
      setActiveContribution(contribution)
    }
  }, [contribution, getContribution])

  return (
    <PageWrapper
      showNav
      links={ROUTES}
      contribution={contribution}
      activeContribution={activeContribution}
      onTreeClick={handleClick}
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
            <ContributionHeirarchy
              getContribution={getContribution}
              contribution={contribution}
              activeContribution={activeContribution}
              onCardClick={handleClick}
              contributionRef={contributionRef}
            />
          </PageContentWrapper>
          <Hidden smDown implementation="css">
            <RightSidebar>
              <ContributionDetails
                authors={activeContribution.author}
                poster={activeContribution.postedBy}
                posterColor={
                  activeContribution.userColorPoster
                    ? activeContribution.userColorPoster
                    : activeContribution.userColor
                }
                datePosted={activeContribution.createdAt}
                dateModified={activeContribution.updatedAt}
              />
            </RightSidebar>
          </Hidden>
        </>
      )}
    </PageWrapper>
  )
}

export default Question
