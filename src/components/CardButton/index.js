import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from 'assets/images/icons/edit.png'
import styles from './styles.module.scss'

const CardButton = ({ action }) => {
  const icons = {
    edit: EditIcon
  }
  return (
    <IconButton
      disableRipple="true"
      aria-label={action}
      className={`${styles.cardButton}`}
    >
      <img src={icons[action]} alt="" />
      {action}
    </IconButton>
  )
}

CardButton.propTypes = {
  action: PropTypes.string.isRequired
}

export default CardButton
