import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import styles from './styles.module.scss'

const AuthorMeta = ({ userColor, author }) => {
  return (
    // temp: adjust data to poster when data from api is available @k
    <div>
      <Typography
        className={`${styles.meta} ${styles.author}`}
        variant="h5"
      >
        <Avatar
          className={`${styles.avatar}`}
          style={{ backgroundColor: userColor }}
        >
          {author.charAt(0)}
        </Avatar>
        {author}
        <span className={`${styles.metaDivider}`}>·</span>
      </Typography>
    </div>
  )
}

AuthorMeta.propTypes = {
  author: PropTypes.string.isRequired
}

export default AuthorMeta
