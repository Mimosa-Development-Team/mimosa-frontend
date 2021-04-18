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
  deprecated,
  draft
}) => {
  return (
    <div>
      <Tags
        type={type}
        questionTags={questionTags}
        analysisTag={analysisTag}
        deprecated={deprecated}
      />
      {draft && draft.subject && (
        <div>
          <Typography
            variant="subtitle2"
            className={`${styles.draft}`}
          >
            D: {draft.subject}
          </Typography>
        </div>
      )}
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
  questionTags: PropTypes.node,
  analysisTag: PropTypes.any,
  deprecated: PropTypes.bool
}

export default Header
