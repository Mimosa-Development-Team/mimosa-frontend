import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styles from './styles.module.scss'

function getParentType(type) {
  switch (type) {
    case 'hypothesis':
      return 'Q'
    case 'expirement':
      return 'H'
    case 'data':
      return 'E'
    case 'analysis':
      return 'D'
    default:
      return null
  }
}

const ParentTitle = ({ type, title }) => {
  return (
    <div className={`${styles.parentTitleWrapper}`}>
      <Typography className={`${styles.parentTitle}`}>
        <span>{getParentType(type)}: </span>
        {title}
      </Typography>
    </div>
  )
}

ParentTitle.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default ParentTitle
