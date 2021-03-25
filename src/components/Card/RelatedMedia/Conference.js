import React from 'react'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import CalendarIcon from 'assets/images/icons/calendar.svg'
import TimeIcon from 'assets/images/icons/time.svg'
import styles from './styles.module.scss'

const Conference = ({ conference }) => {
  return (
    <>
      {(conference || []).map(data => {
        return (
          <div className={`${styles.conference}`}>
            <Typography variant="h4">
              {data.conferenceName}
            </Typography>
            <div className={`${styles.metaWrapper}`}>
              <Typography className={`${styles.meta}`}>
                <span className={`${styles.icon}`}>
                  <img src={CalendarIcon} alt="" />
                </span>
                {moment(
                  data.conferenceDateDetails.presentationDetails
                ).format('D MMMM YYYY')}
              </Typography>
              <Typography className={`${styles.meta}`}>
                <span className={`${styles.icon}`}>
                  <img src={TimeIcon} alt="" />
                </span>
                {data.conferenceDateDetails.startTime}
                {' - '}
                {data.conferenceDateDetails.endTime}
              </Typography>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Conference
