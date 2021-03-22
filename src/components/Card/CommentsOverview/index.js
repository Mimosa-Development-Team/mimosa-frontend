import React, { useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
// import Controls from 'components/controls/Controls'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import Comment from './Comment'
import { useComments } from './hooks'
import styles from './styles.module.scss'

const CommentsOverview = ({ contributionId }) => {
  const { user } = useGlobalState()

  const { comments, getComments } = useComments(contributionId)

  useEffect(() => {
    getComments()
  }, [getComments])

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
      {(comments || []).map(data => {
        return (
          <Comment
            comment={data.comment}
            date={data.updatedAt}
          />
        )
      })}
    </div>
  )
}

export default CommentsOverview
