import React from 'react'
import Typography from '@material-ui/core/Typography'
import CalendarIcon from 'assets/images/icons/calendar.svg'
import TimeIcon from 'assets/images/icons/time.svg'
import styles from './styles.module.scss'

const Conference = () => {
  return (
    <div className={`${styles.conference}`}>
      <Typography variant="h4">Conference Name</Typography>
      <div className={`${styles.metaWrapper}`}>
        <Typography className={`${styles.meta}`}>
          <span className={`${styles.icon}`}>
            <img src={CalendarIcon} alt="" />
          </span>
          29 January 2021
        </Typography>
        <Typography className={`${styles.meta}`}>
          <span className={`${styles.icon}`}>
            <img src={TimeIcon} alt="" />
          </span>
          7:00 - 12:00 am
        </Typography>
      </div>
    </div>
  )
}

export default Conference
