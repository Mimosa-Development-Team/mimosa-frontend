import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'
import styles from './styles.module.scss'

const ContributionHeirarchy = ({
  contribution,
  activeContribution,
  getContribution,
  onCardClick,
  contributionRef
}) => {
  const ConditionalWrapper = ({
    condition,
    wrapper,
    children
  }) => (condition ? wrapper(children) : children)

  const CategoryWrapper = ({ data, getContribution }) => {
    return (
      <>
        {data ? (
          <>
            <CardWrapper
              getContribution={getContribution}
              data={data}
            />{' '}
            <ConditionalWrapper
              condition={
                data.children.length > 1 ||
                data.category === 'data'
              }
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
              {(data.children || []).map(data => {
                return <CategoryWrapper data={data} />
              })}
            </ConditionalWrapper>
          </>
        ) : null}
      </>
    )
  }
  const CardWrapper = ({ data, getContribution }) => {
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
          getContribution={getContribution}
          data={data}
          treeView
          isExpanded={data === activeContribution}
          hideDetails={false}
          hideEdit={false}
        />
      </li>
    )
  }
  return (
    <div className={`${styles.heirarchyWrapper}`}>
      <ul className={`${styles.heirarchyList}`}>
        <CategoryWrapper
          getContribution={getContribution}
          data={contribution}
        />
      </ul>
    </div>
  )
}

ContributionHeirarchy.propTypes = {
  contribution: PropTypes.object,
  activeContribution: PropTypes.object
}

export default ContributionHeirarchy
