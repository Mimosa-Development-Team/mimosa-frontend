import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import LeftSidebar from 'components/LeftSidebar'
import PageContentWrapper from 'components/PageContentWrapper'
// import RightSidebar from 'components/RightSidebar'
import { ROUTES } from '../constants'
import ContributionHeirarchy from './components/ContributionHeirarchy'
// import ContributionDetails from './components/ContributionDetails'
import { useContribution } from './hooks'
import styles from './styles.module.scss'

const Question = () => {
  const {
    contribution,
    isLoading,
    getContribution
  } = useContribution()

  useEffect(() => {
    getContribution()
  }, [getContribution])
  return (
    <>
      <LeftSidebar showNav links={ROUTES} />
      {isLoading ? (
        'Loading ...'
      ) : (
        <>
          <PageContentWrapper>
            <Typography
              className={`${styles.title}`}
              variant="h1"
            >
              Question
            </Typography>
            {/* {JSON.stringify(contribution)} */}
            <ContributionHeirarchy contribution={contribution} />
          </PageContentWrapper>
          {/* <RightSidebar>
            {JSON.stringify(activeContribution)}
          </RightSidebar> */}
          {/* <RightSidebar>
            <ContributionDetails
              authors={activeContribution.author}
              poster={activeContribution.postedBy}
              datePosted={activeContribution.createdAt}
              dateModified={activeContribution.updatedAt}
            />
          </RightSidebar> */}
        </>
      )}
    </>
  )
}

export default Question
