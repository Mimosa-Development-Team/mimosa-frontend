import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import Actions from './Actions'
import styles from './styles.module.scss'

const Comment = ({
  data,
  hasActions,
  onEdit,
  onDelete,
  role,
  raw
}) => {
  return (
    <div className={`${styles.comment}`}>
      <div className={`${styles.contentWrapper}`}>
        <Avatar
          className={`${styles.avatar}`}
          style={{ backgroundColor: data.mmUser.userColor }}
        >
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
      {raw.role === 'admin' || hasActions ? (
        <Actions
          raw={raw}
          role={role}
          data={data}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : null}
    </div>
  )
}

export default Comment
