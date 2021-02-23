import React from 'react'
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

export default Tags
