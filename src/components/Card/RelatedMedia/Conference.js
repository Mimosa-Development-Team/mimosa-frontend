import React from 'react'
import Typography from '@material-ui/core/Typography'
import styles from './styles.module.scss'

const Conference = () => {
  return (
    <div className={`${styles.conference}`}>
      <Typography variant="h4">Conference Name</Typography>
      <div className={`${styles.metaWrapper}`}>
        <Typography className={`${styles.meta}`}>
          29 January 2021
        </Typography>
        <Typography className={`${styles.meta}`}>
          7:00 - 12:00 am
        </Typography>
      </div>
    </div>
  )
}

export default Conference
