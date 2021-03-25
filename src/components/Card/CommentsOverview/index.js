import React, { useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Controls from 'components/controls/Controls'
import { useForm } from 'react-hook-form'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import Comment from './Comment'
import { useComments } from './hooks'
import styles from './styles.module.scss'

const CommentsOverview = ({ contributionId }) => {
  const { user } = useGlobalState()

  const {
    comments,
    getComments,
    addComment,
    addedComment,
    addLoadingComment,
    addErrorComment
  } = useComments(contributionId)

  const { handleSubmit, control } = useForm({
    defaultValues: {
      comment: ''
    }
  })

  const onSubmit = data => {
    const formFields = {
      comment: data.comment,
      contributionId,
      userId: getRawData(user).user.id
    }
    addComment(formFields)
  }

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <div className={`${styles.commentsWrapper}`}>
      <div className={`${styles.commentField}`}>
        <Avatar className={`${styles.avatar}`}>
          {getRawData(user).user.firstName.charAt(0)}
        </Avatar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controls.Input
            className={`${styles.input}`}
            name="comment"
            control={control}
            placeholder="Write a comment..."
            background="offwhite"
            addedComment={addedComment}
            addLoadingComment={addLoadingComment}
            addErrorComment={addErrorComment}
          />
        </form>
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
