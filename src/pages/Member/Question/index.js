import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Sidebar from 'components/Sidebar'
import ContributionHeirarchy from './components/ContributionHeirarchy'
import styles from './styles.module.scss'
import { useContribution } from './hooks'

const Question = () => {
  const { contribution, getContribution } = useContribution()

  useEffect(() => {
    getContribution()
  }, [getContribution])

  return (
    <div className={`${styles.questionWrapper}`}>
      <div className={`${styles.contentWrapper}`}>
        <Typography variant="h1">Question</Typography>
        <ContributionHeirarchy data={contribution} />
      </div>
      <Sidebar />
    </div>
  )
}

export default Question
