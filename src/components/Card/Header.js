import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Tags from './Tags'
import styles from './styles.module.scss'

const Header = ({
  type,
  title,
  questionTags,
  analysisTag,
  deprecated
}) => {
  return (
    <div>
      <Tags
        type={type}
        questionTags={questionTags}
        analysisTag={analysisTag}
        deprecated={deprecated}
      />
      <Typography variant="h2">
        <span className={`${styles.type} ${type}`}>
          {type}:{' '}
        </span>
        {title}
      </Typography>
    </div>
  )
}

Header.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  questionTags: PropTypes.array,
  analysisTag: PropTypes.string,
  deprecated: PropTypes.bool
}

export default Header
