import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import styles from './styles.module.scss'

const DateMeta = ({ datePosted, dateModified }) => {
  return (
    <div className={`${styles.metaWrapper}`}>
      <Typography className={`${styles.meta}`} variant="h5">
        {dateModified ? 'Last modified ' : ''}
        {moment(dateModified || datePosted).format(
          'MMM. D, YYYY'
        )}
      </Typography>
      <span className={`${styles.metaDivider}`}>·</span>
    </div>
  )
}

DateMeta.propTypes = {
  datePosted: PropTypes.string.isRequired,
  dateModified: PropTypes.string
}

export default DateMeta
