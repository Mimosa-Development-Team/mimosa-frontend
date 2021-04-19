import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import ShowMoreText from 'react-show-more-text'
// import LinesEllipsis from 'react-lines-ellipsis'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import parse from 'html-react-parser'
import styles from './styles.module.scss'

const Content = ({ content, isExpanded, linesToShow = 2 }) => {
  const [expanded, setExpanded] = useState(isExpanded)
  return (
    <div className={`${styles.bodyWrapper}`}>
      {expanded ? (
        <div className="cardBody">{parse(content)}</div>
      ) : (
        <div
          className="cardBody"
          onClick={() => setExpanded(true)}
        >
          <HTMLEllipsis
            unsafeHTML={content}
            maxLine={linesToShow}
            ellipsisHTML="...<span class='showMore'> Show more</span>"
            basedOn="letters"
          />
        </div>
      )}
    </div>
  )
}

Content.propTypes = {
  content: PropTypes.any
}

export default Content
