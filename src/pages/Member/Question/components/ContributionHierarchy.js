import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'
import styles from './styles.module.scss'

const ContributionHierarchy = ({
  contribution,
  activeContribution,
  getContribution,
  onCardClick,
  showDraft,
  // what is that
  contributionRef,
  hasSession,
  user
}) => {
  const ConditionalWrapper = ({
    condition,
    wrapper,
    children
  }) => (condition ? wrapper(children) : children)

  const CategoryWrapper = ({
    data,
    getContribution,
    user,
    hasSession
  }) => {
    const finalSession = hasSession
    const finalUser = user
    return (
      <>
        {data ? (
          <>
            <CardWrapper
              getContribution={getContribution}
              data={data}
              hasSession={finalSession}
              user={finalUser}
              showDraft={showDraft}
            />{' '}
            <ConditionalWrapper
              condition={data.children.length > 1}
              wrapper={children => (
                <ul
                  className={`${
                    styles[
                      data && data.children.length > 0
                        ? data.children[0].category
                        : null
                    ]
                  } ${styles.childWrapper}`}
                >
                  {children}
                </ul>
              )}
            >
              {(data.children || []).map((data, index) => {
                if (data.status !== 'draft' || showDraft) {
                  return (
                    <CategoryWrapper key={index} data={data} />
                  )
                }
                return null
              })}
            </ConditionalWrapper>
          </>
        ) : null}
      </>
    )
  }
  const CardWrapper = ({
    data,
    getContribution,
    user,
    hasSession,
    showDraft
  }) => {
    return (
      <li
        className={`${styles[data.category]} ${
          styles.contribution
        } ${
          data.id === activeContribution ? styles.active : ''
        }`}
        key={data.id}
        ref={
          data.id === activeContribution ? contributionRef : null
        }
        onClick={() => onCardClick(data.id)}
      >
        <Card
          hasSession={hasSession}
          user={user}
          getContribution={getContribution}
          data={data}
          treeView
          isExpanded={data.id === activeContribution}
          hideDetails={false}
          hideEdit={false}
          showDraft={showDraft}
        />
      </li>
    )
  }
  return (
    <div className={`${styles.heirarchyWrapper}`}>
      <ul className={`${styles.heirarchyList}`}>
        <CategoryWrapper
          user={user}
          hasSession={hasSession}
          getContribution={getContribution}
          data={contribution}
          showDraft={showDraft}
        />
      </ul>
    </div>
  )
}

ContributionHierarchy.propTypes = {
  contribution: PropTypes.object,
  activeContribution: PropTypes.number
}

export default ContributionHierarchy
