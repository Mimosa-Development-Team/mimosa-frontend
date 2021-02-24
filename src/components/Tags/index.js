import React from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import styles from './styles.module.scss'

const Tags = ({ data }) => {
  return (
    <ul className={`${styles.root}`}>
      {(data || []).map((data, key) => {
        return (
          <li key={key}>
            <Chip
              variant="outlined"
              label={data}
              className={`${styles.chip}`}
            />
          </li>
        )
      })}
    </ul>
  )
}

Tags.propTypes = {
  data: PropTypes.array.isRequired
}

export default Tags
