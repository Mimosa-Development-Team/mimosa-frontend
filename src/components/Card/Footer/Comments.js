import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import CommentIcon from 'assets/images/card/comment-bw.svg'
import CommentIconColored from 'assets/images/card/comments.svg'
import TooltipUi from 'components/Tooltip'
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
      <TooltipUi title="Comments">
        <Button
          disableRipple
          aria-label="comment"
          className={`${styles.metaButton}`}
          onClick={() => onMetaClick(1)}
        >
          <img
            src={
              comment && comment.count > 0
                ? CommentIconColored
                : CommentIcon
            }
            style={{ width: '15px' }}
            alt="commentimage"
          />
          {comment && comment.count !== undefined
            ? comment.count
            : 0}
          <span
            style={{
              textTransform: 'lowercase',
              marginLeft: '2px',
              color: '#4B4F5D'
            }}
          >
            comments
          </span>
        </Button>
      </TooltipUi>
      {/* <span className={`${styles.metaDivider}`}>·</span> */}
    </div>
  )
}

export default Comments
