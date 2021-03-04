import React from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import styles from './styles.module.scss'

const AnalysisTag = ({ variant }) => {
  let tagLabel
  let tagIcon
  if (variant === 'support') {
    tagLabel = 'Supports Hypothesis'
    tagIcon = (
      <ArrowDropUpIcon
        fontSize="small"
        style={{ color: '#12B255' }}
      />
    )
  }
  if (variant === 'refute') {
    tagLabel = 'Refutes Hypothesis'
    tagIcon = (
      <ArrowDropDownIcon
        fontSize="small"
        style={{ color: '#E50E56' }}
      />
    )
  }
  return (
    <Chip
      variant="outlined"
      label={tagLabel}
      icon={tagIcon}
      className={`${styles.chip} ${
        variant === 'support' ? styles.support : styles.refute
      }`}
    />
  )
}

AnalysisTag.propTypes = {
  variant: PropTypes.string.isRequired
}

export default AnalysisTag
