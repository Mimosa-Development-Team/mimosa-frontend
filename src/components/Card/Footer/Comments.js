import React from 'react'
import Button from '@material-ui/core/Button'
import CommentIcon from 'assets/images/icons/comment.svg'
import styles from './styles.module.scss'

const Comments = () => {
  return (
    <div>
      <Button
        disableRipple="true"
        aria-label="comment"
        className={`${styles.metaButton}`}
      >
        <img src={CommentIcon} alt="" />
        30
      </Button>
      {/* <span className={`${styles.metaDivider}`}>·</span> */}
    </div>
  )
}

export default Comments
