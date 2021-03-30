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
  data,
  parentTitle,
  isExpanded,
  hideDetails,
  hideEdit
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
    <>
      {data ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper elevation={0} className={`${styles.paper}`}>
            {!treeView &&
              data.category !== 'question' &&
              parentTitle && (
                <ParentTitle
                  type={data.category}
                  title={parentTitle}
                />
              )}
            <div className={`${styles.contentWrapper}`}>
              <Header
                type={data.category}
                questionTags={data.tags}
                analysisTag={data.hypothesisStatus}
                deprecated={data.status === 'deprecated'}
                title={data.subject}
              />
              {hideDetails !== true && data.details && (
                <Content
                  content={data.details}
                  isExpanded={isExpanded}
                />
              )}
              <Footer
                data={data}
                author={treeView ? null : data.postedBy}
                datePosted={data.createdAt}
                dateModified={data.updatedAt}
                onMetaClick={handleClick}
                parentQuestionId={data.parentQuestionId}
                hideEdit={hideEdit}
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
      ) : null}
    </>
  )
}

Card.propTypes = {
  data: PropTypes.any,
  treeView: PropTypes.bool,
  isExpanded: PropTypes.bool
}

export default Card
