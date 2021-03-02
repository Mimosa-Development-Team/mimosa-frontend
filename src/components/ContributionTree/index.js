import React from 'react'
import Typography from '@material-ui/core/Typography'
import styles from './styles.module.scss'

const ContributionTree = () => {
  return (
    <div className={`${styles.contributionTree}`}>
      <Typography className={`${styles.title}`} variant="h5">
        Contribution Tree:
      </Typography>
      <ul className={`${styles.tree}`}>
        <li className="question">Q</li>
        <li>H</li>
        <li>E</li>
        <li>
          D
          <ul className={`${styles.subtree}`}>
            <li>A</li>
            <li>A</li>
            <li>A</li>
            <li>A</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default ContributionTree
