import React from 'react'
import Button from '@material-ui/core/Button'
import BookmarkIcon from 'assets/images/icons/bookmark.svg'
import styles from './styles.module.scss'

const Bookmark = () => {
  return (
    <div>
      <Button
        disableRipple
        aria-label="bookmark"
        className={`${styles.metaButton}`}
      >
        <img src={BookmarkIcon} alt="bookmark" />
      </Button>
    </div>
  )
}

export default Bookmark
