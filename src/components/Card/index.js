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
  linesToShow,
  user,
  hasSession,
  hideEdit,
  getContribution
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
            <div className={`${styles.contentWrapper}`}>
              {!treeView &&
                data.category !== 'question' &&
                parentTitle && (
                  <ParentTitle
                    type={data.category}
                    title={parentTitle}
                  />
                )}
              <Header
                data={data}
                treeView={treeView}
                type={
                  data.draft
                    ? data.draft.category
                    : data.category
                }
                draft={data.draft}
                questionTags={
                  data.draft ? data.draft.tags : data.tags
                }
                analysisTag={
                  data.draft
                    ? data.draft.hypothesisStatus
                    : data.hypothesisStatus
                }
                deprecated={
                  data.draft
                    ? data.draft.status === 'deprecated'
                    : data.status === 'deprecated'
                }
                title={
                  data.draft ? data.draft.subject : data.subject
                }
              />
              {data.details && (
                <Content
                  content={
                    data && data.draft
                      ? data.draft.details
                      : data.details
                  }
                  isExpanded={isExpanded}
                  linesToShow={linesToShow}
                />
              )}
              <Footer
                user={user}
                hasSession={hasSession}
                getContribution={getContribution}
                data={data}
                userColor={
                  data.userColor || data.userColorPoster
                }
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
                hasSession={hasSession}
                user={user}
                userId={data.userId}
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
