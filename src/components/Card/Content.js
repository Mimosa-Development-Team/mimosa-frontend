import React from 'react'
import PropTypes from 'prop-types'
import ShowMoreText from 'react-show-more-text'
import parse from 'html-react-parser'
import styles from './styles.module.scss'

const Content = ({ content, isExpanded }) => {
  return (
    <div className={`${styles.bodyWrapper}`}>
      <ShowMoreText
        lines={2}
        more="See more"
        less=""
        className={`${styles.body}`}
        anchorClass={`${styles.anchor}`}
        expanded={isExpanded}
      >
        {parse(content)}
      </ShowMoreText>
    </div>
  )
}

Content.propTypes = {
  content: PropTypes.any
}

export default Content
