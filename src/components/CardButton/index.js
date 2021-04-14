import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from 'assets/images/icons/delete.svg'
import EditIcon from 'assets/images/icons/edit.png'
import ContributeIcon from 'assets/images/icons/contribute.svg'
import styles from './styles.module.scss'

const CardButton = ({ action, ...propsList }) => {
  const icons = {
    edit: EditIcon,
    delete: DeleteIcon,
    contribute: ContributeIcon
  }
  return (
    <div className={`${styles.wrapper}`}>
      {action !== 'contribute' && (
        <span className={`${styles.metaDivider}`}>·</span>
      )}
      <IconButton
        disableRipple="true"
        aria-label={action}
        className={`${styles.cardButton} ${styles[action]}`}
        {...propsList}
      >
        <img src={icons[action]} alt="" />
        {action}
      </IconButton>
    </div>
  )
}

CardButton.propTypes = {
  action: PropTypes.string.isRequired
}

export default CardButton
