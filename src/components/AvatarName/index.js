import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import styles from './styles.module.scss'

const AvatarName = ({ name }) => {
  return (
    <div className={`${styles.avatarName}`}>
      <Avatar className={`${styles.avatar}`}>
        {name.charAt(0)}
      </Avatar>
      {name}
    </div>
  )
}

AvatarName.propTypes = {
  name: PropTypes.string.isRequired
}

export default AvatarName
