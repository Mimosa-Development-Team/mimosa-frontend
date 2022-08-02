import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import styles from './styles.module.scss'

const DateMeta = ({ data }) => {
  return (
    <div className={`${styles.metaWrapper}`}>
      <Typography className={`${styles.meta}`} variant="span">
        {(data && data.draft && data.draft.updatedAt) ||
        data.status === 'draft'
          ? moment(
              data.updatedAt ||
                data.createdAt ||
                data.draft.updatedAt ||
                data.draft.createdAt
            ).format('MMM. D, YYYY')
          : moment(data.updatedAt || data.createdAt).format(
              'MMM. D, YYYY'
            )}
      </Typography>
    </div>
  )
}

DateMeta.propTypes = {
  data: PropTypes.object.isRequired
}

export default DateMeta
