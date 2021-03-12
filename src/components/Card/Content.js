import React from 'react'
import PropTypes from 'prop-types'
import ShowMoreText from 'react-show-more-text'
import styles from './styles.module.scss'

const Content = ({ content }) => {
  return (
    <div className={`${styles.bodyWrapper}`}>
      <ShowMoreText
        lines={2}
        more="See more"
        less="Show less"
        className={`${styles.body}`}
        anchorClass={`${styles.anchor}`}
        expanded={false}
      >
        {content}
      </ShowMoreText>
    </div>
  )
}

Content.propTypes = {
  content: PropTypes.any
}

export default Content
