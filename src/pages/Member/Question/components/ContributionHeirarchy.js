import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'
import styles from './styles.module.scss'

const ContributionHeirarchy = ({
  contribution,
  activeContribution,
  onCardClick,
  contributionRef,
  questionUuid
}) => {
  const ConditionalWrapper = ({
    condition,
    wrapper,
    children
  }) => (condition ? wrapper(children) : children)

  const CategoryWrapper = ({ data }) => {
    return (
      <>
        {data ? (
          <>
            <CardWrapper data={data} />{' '}
            <ConditionalWrapper
              condition={data.children.length > 1}
              wrapper={children => (
                <ul
                  className={`${
                    styles[data.children[0].category]
                  } ${styles.childWrapper}`}
                >
                  {children}
                </ul>
              )}
            >
              {(data.children || []).map(data => {
                return <CategoryWrapper data={data} />
              })}
            </ConditionalWrapper>
          </>
        ) : null}
      </>
    )
  }
  const CardWrapper = ({ data }) => {
    return (
      <li
        className={`${styles[data.category]} ${
          styles.contribution
        } ${data === activeContribution ? styles.active : ''}`}
        key={data.id}
        ref={
          data === activeContribution ? contributionRef : null
        }
        onClick={() => onCardClick(data)}
      >
        <Card
          data={data}
          treeView
          questionUuid={questionUuid}
          type={data.category}
          title={data.subject}
          content={data.details}
          questionTags={data.tags}
          analysisTag={data.hypothesisStatus}
          datePosted={data.createdAt}
          dateModified={data.updatedAt}
        />
      </li>
    )
  }
  return (
    <div className={`${styles.heirarchyWrapper}`}>
      <ul className={`${styles.heirarchyList}`}>
        <CategoryWrapper data={contribution} />
      </ul>
    </div>
  )
}

ContributionHeirarchy.propTypes = {
  contribution: PropTypes.object,
  activeContribution: PropTypes.object
}

export default ContributionHeirarchy
