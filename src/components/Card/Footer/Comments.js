import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import CommentIcon from 'assets/images/icons/comment.svg'
import styles from './styles.module.scss'
import { useQuestionForm } from './hooks'

const Comments = ({ onMetaClick, contributionId }) => {
  const { comment, getCommentCount } = useQuestionForm(
    contributionId
  )
  useEffect(() => {
    getCommentCount()
  }, [getCommentCount])
  return (
    <div>
      <span className={`${styles.metaDivider}`}>·</span>
      <Button
        disableRipple
        aria-label="comment"
        className={`${styles.metaButton}`}
        onClick={() => onMetaClick(1)}
      >
        <img src={CommentIcon} alt="" />
        {comment && comment.count !== undefined
          ? comment.count
          : 0}
      </Button>
      {/* <span className={`${styles.metaDivider}`}>·</span> */}
    </div>
  )
}

export default Comments
