import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Footer from 'components/Card/Footer'
import Header from './Header'
import Content from './Content'
import ParentTitle from './ParentTitle'
import styles from './styles.module.scss'

const Card = ({
  treeView,
  type,
  parentTitle,
  questionTags,
  analysisTag,
  deprecated,
  title,
  content,
  author,
  datePosted,
  dateModified
}) => {
  return (
    <Paper elevation={0} className={`${styles.paper}`}>
      {!treeView && type !== 'question' && parentTitle && (
        <ParentTitle type={type} title={parentTitle} />
      )}
      <Header
        type={type}
        questionTags={questionTags}
        analysisTag={analysisTag}
        deprecated={deprecated}
        title={title}
      />
      {content && <Content content={content} />}
      <Footer
        author={author}
        datePosted={datePosted}
        dateModified={dateModified}
      />
    </Paper>
  )
}

Card.propTypes = {
  treeView: PropTypes.bool,
  type: PropTypes.string.isRequired,
  questionTags: PropTypes.array,
  analysisTag: PropTypes.any,
  deprecated: PropTypes.bool,
  title: PropTypes.string.isRequired,
  content: PropTypes.any,
  author: PropTypes.string,
  datePosted: PropTypes.string.isRequired,
  dateModified: PropTypes.string
}

export default Card
