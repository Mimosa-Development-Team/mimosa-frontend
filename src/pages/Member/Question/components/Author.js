import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import styles from './styles.module.scss'

const Author = ({ author }) => {
  return (
    <div className={`${styles.avatarName} ${styles.author}`}>
      {author.id && (
        <Avatar
          className={`${styles.avatar}`}
          style={{ backgroundColor: '#ee4f31' }}
        >
          {author.name.charAt(0)}
        </Avatar>
      )}
      {author.name}
    </div>
  )
}

export default Author
