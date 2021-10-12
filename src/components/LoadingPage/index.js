import React from 'react'
import Typography from '@material-ui/core/Typography'
import NoResultsIcon from 'assets/images/no-results.svg'
import styles from './styles.module.scss'

const Loading = () => {
  return (
    <div className={`${styles.noResults}`}>
      <img src={NoResultsIcon} alt="No Results" />
      <Typography variant="h1" className={`${styles.title}`}>
        Searching please wait . . .
      </Typography>
    </div>
  )
}

export default Loading
