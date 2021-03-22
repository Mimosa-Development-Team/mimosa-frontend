import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import styles from './styles.module.scss'

const Actions = () => {
  return (
    <div className={`${styles.actionsWrapper}`}>
      <IconButton
        className={`${styles.button}`}
        aria-label="actions"
        component="span"
      >
        <MoreHorizIcon />
      </IconButton>
    </div>
  )
}

export default Actions
