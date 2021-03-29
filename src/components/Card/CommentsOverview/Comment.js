import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import Actions from './Actions'
import styles from './styles.module.scss'

const Comment = ({ data, hasActions, onEdit, onDelete }) => {
  return (
    <div className={`${styles.comment}`}>
      <div className={`${styles.contentWrapper}`}>
        <Avatar className={`${styles.avatar}`}>
          {data.mmUser.fullName.charAt(0)}
        </Avatar>
        <div>
          <Typography className={`${styles.name}`}>
            {data.mmUser.fullName}
          </Typography>
          <Typography className={`${styles.details}`}>
            {data.comment}
          </Typography>
          <Typography className={`${styles.date}`}>
            {moment(data.updatedAt || data.createdAt).format(
              'MMM. D, YYYY hh:mm A'
            )}
          </Typography>
        </div>
      </div>
      {hasActions && (
        <Actions
          data={data}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  )
}

export default Comment
