import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import MediaIcon from 'assets/images/icons/media.svg'
import CommentIcon from 'assets/images/icons/comment.svg'
import BookmarkIcon from 'assets/images/icons/bookmark.svg'
import styles from './styles.module.scss'

const Footer = ({ author, date }) => {
  return (
    <div className={`${styles.footer}`}>
      {author && (
        <Typography
          className={`${styles.meta} ${styles.author}`}
          variant="h5"
        >
          <Avatar className={`${styles.avatar}`}>
            {author.charAt(0)}
          </Avatar>
          {author}
          <span className={`${styles.metaDivider}`}>·</span>
        </Typography>
      )}
      <Typography className={`${styles.meta}`} variant="h5">
        Last modified {date}
      </Typography>
      <span className={`${styles.metaDivider}`}>·</span>
      {/* temp: make 3 buttons a separate component @k */}
      <Button
        disableRipple="true"
        aria-label="media"
        className={`${styles.metaButton}`}
      >
        <img src={MediaIcon} alt="" />1
      </Button>
      <span className={`${styles.metaDivider}`}>·</span>
      <Button
        disableRipple="true"
        aria-label="comment"
        className={`${styles.metaButton}`}
      >
        <img src={CommentIcon} alt="" />
        30
      </Button>
      <span className={`${styles.metaDivider}`}>·</span>
      <Button
        disableRipple="true"
        aria-label="bookmark"
        className={`${styles.metaButton}`}
      >
        <img src={BookmarkIcon} alt="" />
      </Button>
    </div>
  )
}

Footer.propTypes = {
  author: PropTypes.string,
  date: PropTypes.any.isRequired
}

export default Footer
