import React from 'react'
import Avatar from '@material-ui/core/Avatar'
// import Controls from 'components/controls/Controls'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import Comment from './Comment'
import styles from './styles.module.scss'

const CommentsOverview = () => {
  const { user } = useGlobalState()
  return (
    <div className={`${styles.commentsWrapper}`}>
      <div className={`${styles.commentField}`}>
        <Avatar className={`${styles.avatar}`}>
          {getRawData(user).user.firstName.charAt(0)}
        </Avatar>
        {/* <Controls.Input
          className={`${styles.input}`}
          name="comment"
          placeholder="Write a comment..."
          background="offwhite"
        /> */}
      </div>
      <Comment />
    </div>
  )
}

export default CommentsOverview
