/* eslint-disable react/jsx-indent */
import React from 'react'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import CalendarIcon from 'assets/images/icons/calendar.svg'
import TimeIcon from 'assets/images/icons/time.svg'
import styles from './styles.module.scss'

const Conference = ({ conference }) => {
  return (
    <>
      {(conference && conference.length > 0
        ? conference
        : [] || []
      ).map((data, index) => {
        return Object.keys(data.conferenceDateDetails).length >
          0 ? (
          <div className={`${styles.conference}`} key={index}>
            <Typography variant="h4">
              {data.conferenceName}
            </Typography>
            <div className={`${styles.metaWrapper}`}>
              <Typography className={`${styles.meta}`}>
                <span className={`${styles.icon}`}>
                  <img src={CalendarIcon} alt="Calendar" />
                </span>
                {moment(
                  data.conferenceDateDetails.presentationDetails
                ).format('D MMMM YYYY')}
              </Typography>
              <Typography className={`${styles.meta}`}>
                <span className={`${styles.icon}`}>
                  <img src={TimeIcon} alt="Time" />
                </span>
                {data.conferenceDateDetails.startTime}
                {' - '}
                {data.conferenceDateDetails.endTime}
              </Typography>
            </div>
          </div>
        ) : null
      })}
    </>
  )
}

export default Conference
