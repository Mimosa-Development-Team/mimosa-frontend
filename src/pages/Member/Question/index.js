import React, { useEffect } from 'react'
import LeftSidebar from 'components/LeftSidebar'
import PageContentWrapper from 'components/PageContentWrapper'
import RightSidebar from 'components/RightSidebar'
import Typography from '@material-ui/core/Typography'
import { ROUTES } from '../constants'
import ContributionHeirarchy from './components/ContributionHeirarchy'
import styles from './styles.module.scss'
import { useContribution } from './hooks'

const Question = () => {
  const { contribution, getContribution } = useContribution()

  useEffect(() => {
    getContribution()
  }, [getContribution])

  return (
    <>
      <LeftSidebar showNav links={ROUTES} />
      <PageContentWrapper>
        <Typography className={`${styles.title}`} variant="h1">
          Question
        </Typography>
        <ContributionHeirarchy contributions={contribution} />
      </PageContentWrapper>
      <RightSidebar />
    </>
  )
}

export default Question
