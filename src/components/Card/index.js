import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Footer from 'components/Card/Footer'
import Header from './Header'
import Content from './Content'
import ParentTitle from './ParentTitle'
import QuestionDetails from './QuestionDetails'
import styles from './styles.module.scss'

const Card = ({
  treeView,
  type,
  data,
  parentTitle,
  questionTags,
  analysisTag,
  deprecated,
  title,
  questionUuid,
  content,
  author,
  datePosted,
  dateModified,
  commentCount,
  relatedMediaCount
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleClick = () => {
    setShowDetails(!showDetails)
  }

  return (
    <Paper elevation={0} className={`${styles.paper}`}>
      {!treeView && type !== 'question' && parentTitle && (
        <ParentTitle type={type} title={parentTitle} />
      )}
      <div className={`${styles.contentWrapper}`}>
        <Header
          type={type}
          questionTags={questionTags}
          analysisTag={analysisTag}
          deprecated={deprecated}
          title={title}
        />
        {content && <Content content={content} />}
        <Footer
          data={data}
          questionUuid={questionUuid}
          author={author}
          datePosted={datePosted}
          dateModified={dateModified}
          commentCount={commentCount}
          relatedMediaCount={relatedMediaCount}
          onMetaClick={handleClick}
        />
      </div>
      {showDetails && (
        <QuestionDetails contributionId={data.id} />
      )}
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
  dateModified: PropTypes.string,
  commentCount: PropTypes.string,
  relatedMediaCount: PropTypes.string
}

export default Card
