import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
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
  isExpanded
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const handleClick = newValue => {
    setShowDetails(true)
    setActiveTab(newValue)
  }

  const handleClickAway = () => {
    setShowDetails(false)
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
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
          {content && (
            <Content content={content} isExpanded={isExpanded} />
          )}
          <Footer
            data={data}
            questionUuid={questionUuid}
            author={author}
            datePosted={datePosted}
            dateModified={dateModified}
            onMetaClick={handleClick}
          />
        </div>
        {showDetails && (
          <QuestionDetails
            contributionId={data.id}
            activeTab={activeTab}
            handleTabChange={handleChange}
          />
        )}
      </Paper>
    </ClickAwayListener>
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
