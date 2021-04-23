import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

import Tags from './Tags'
import styles from './styles.module.scss'

const Header = ({
  treeView,
  type,
  title,
  questionTags,
  analysisTag,
  deprecated
}) => {
  const fullTitle = `<h2 class=${styles.title}><span class='${styles.type} ${type}'>${type}: </span>${title}</h2>`
  return (
    <div>
      <Tags
        type={type}
        questionTags={questionTags}
        analysisTag={analysisTag}
        deprecated={deprecated}
      />
      {treeView ? (
        <Typography variant="h2">
          <span className={`${styles.type} ${type}`}>
            {type}:{' '}
          </span>
          {title}
        </Typography>
      ) : (
        <HTMLEllipsis
          unsafeHTML={fullTitle}
          maxLine="5"
          ellipsisHTML="..."
          basedOn="letters"
        />
      )}
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
