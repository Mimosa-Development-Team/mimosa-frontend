import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import Actions from './Actions'
import styles from './styles.module.scss'

const Comment = ({
  comment,
  datePosted,
  dateModified,
  username,
  hasActions
}) => {
  return (
    <div className={`${styles.comment}`}>
      <div className={`${styles.contentWrapper}`}>
        <Avatar className={`${styles.avatar}`}>T</Avatar>
        <div>
          <Typography className={`${styles.name}`}>
            {username}
          </Typography>
          <Typography className={`${styles.details}`}>
            {comment}
          </Typography>
          <Typography className={`${styles.date}`}>
            {moment(dateModified || datePosted).format(
              'MMM. D, YYYY hh:mm A'
            )}
          </Typography>
        </div>
      </div>
      {hasActions && <Actions />}
    </div>
  )
}

export default Comment
