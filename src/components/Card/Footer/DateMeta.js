import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import styles from './styles.module.scss'

const DateMeta = ({ date }) => {
  return (
    <div className={`${styles.metaWrapper}`}>
      <Typography className={`${styles.meta}`} variant="h5">
        Last modified {moment(date).format('MMM. D, YYYY')}
      </Typography>
      <span className={`${styles.metaDivider}`}>·</span>
    </div>
  )
}

DateMeta.propTypes = {
  date: PropTypes.string.isRequired
}

export default DateMeta
