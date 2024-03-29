/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import styles from './styles.module.scss'

const AnalysisTag = ({ variant }) => {
  let tagLabel
  let tagIcon
  if (variant === 'supports') {
    tagLabel = 'Supports Hypothesis'
    tagIcon = (
      <ArrowDropUpIcon
        fontSize="small"
        style={{ color: '#12B255' }}
      />
    )
  }
  if (variant === 'refutes') {
    tagLabel = 'Refutes Hypothesis'
    tagIcon = (
      <ArrowDropDownIcon
        fontSize="small"
        style={{ color: '#E50E56' }}
      />
    )
  }
  if (variant === 'unclear') {
    tagLabel = 'UNCLEAR'
    tagIcon = (
      <ArrowDropDownIcon
        fontSize="small"
        style={{ color: 'orange' }}
      />
    )
  }
  return (
    <Chip
      variant="outlined"
      label={tagLabel}
      icon={tagIcon}
      className={`${styles.chip} ${
        variant === 'supports'
          ? styles.support
          : variant === 'refutes'
          ? styles.refute
          : styles.unclear
      }`}
    />
  )
}

AnalysisTag.propTypes = {
  variant: PropTypes.oneOf(['supports', 'refutes'])
}

export default AnalysisTag
