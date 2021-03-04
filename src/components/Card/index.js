import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import ParentTitle from './ParentTitle'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
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
  date
}) => {
  return (
    <Paper elevation={0} className={`${styles.paper}`}>
      {!treeView && type !== 'question' && (
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
      <Footer author={author} date={date} />
    </Paper>
  )
}

Card.propTypes = {
  treeView: PropTypes.bool,
  type: PropTypes.string.isRequired,
  questionTags: PropTypes.array,
  analysisTag: PropTypes.string,
  deprecated: PropTypes.bool,
  title: PropTypes.string.isRequired,
  content: PropTypes.any,
  author: PropTypes.string,
  date: PropTypes.any
}

export default Card
