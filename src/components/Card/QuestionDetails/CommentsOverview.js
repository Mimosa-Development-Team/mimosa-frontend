import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Controls from 'components/controls/Controls'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import styles from './styles.module.scss'

const CommentsOverview = () => {
  const { user } = useGlobalState()
  return (
    <div className={`${styles.commentsWrapper}`}>
      <Avatar className={`${styles.avatar}`}>
        {getRawData(user).user.firstName.charAt(0)}
      </Avatar>
      <Controls.Input
        className={`${styles.input}`}
        name="comment"
        label="Write a comment..."
      />
    </div>
  )
}

export default CommentsOverview
