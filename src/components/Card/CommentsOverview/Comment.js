import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Actions from './Actions'
import styles from './styles.module.scss'

const Comment = () => {
  return (
    <div className={`${styles.comment}`}>
      <div className={`${styles.contentWrapper}`}>
        <Avatar className={`${styles.avatar}`}>K</Avatar>
        <div>
          <Typography className={`${styles.name}`}>
            Chidi Anagonye
          </Typography>
          <Typography className={`${styles.details}`}>
            We dont have consensus on
          </Typography>
          <Typography className={`${styles.date}`}>
            Just now
          </Typography>
        </div>
      </div>
      <Actions />
    </div>
  )
}

export default Comment
