import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'
import styles from './styles.module.scss'

const ContributionHeirarchy = ({ contributions }) => {
  const ConditionalWrapper = ({
    condition,
    wrapper,
    children
  }) => (condition ? wrapper(children) : children)

  const CategoryWrapper = ({ data }) => {
    return (
      <>
        <CardWrapper data={data} />
        <ConditionalWrapper
          condition={data.children.length > 1}
          wrapper={children => (
            <ul
              className={`${styles[data.children[0].category]} ${
                styles.childWrapper
              }`}
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
    )
  }
  const CardWrapper = ({ data }) => {
    return (
      <li
        className={`${styles[data.category]} ${
          styles.contribution
        }`}
      >
        <Card
          treeView
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
        {(contributions || []).map(data => {
          return <CategoryWrapper data={data} />
        })}
      </ul>
    </div>
  )
}

ContributionHeirarchy.propTypes = {
  contributions: PropTypes.array
}

export default ContributionHeirarchy
