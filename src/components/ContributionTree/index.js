import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styles from './styles.module.scss'

const ContributionTree = ({
  contribution,
  activeContribution,
  onTreeClick
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
            <li
              className={`${styles[data.category]} ${
                data.id === activeContribution
                  ? styles.active
                  : ''
              }`}
              onClick={() => onTreeClick(data.id)}
            >
              {data.category && data.category.charAt(0)}
            </li>
            <ConditionalWrapper
              condition={data.children.length > 1}
              wrapper={children => (
                <ul className={`${styles.subtree}`}>
                  {children}
                </ul>
              )}
            >
              {(data.children || []).map((data, index) => {
                return (
                  <CategoryWrapper key={index} data={data} />
                )
              })}
            </ConditionalWrapper>
          </>
        ) : null}
      </>
    )
  }
  return (
    <div className={`${styles.contributionTree}`}>
      <Typography className={`${styles.title}`} variant="h5">
        Contribution Tree:
      </Typography>
      <ul className={`${styles.tree}`}>
        <CategoryWrapper data={contribution} />
      </ul>
    </div>
  )
}

ContributionTree.propTypes = {
  contribution: PropTypes.object,
  activeContribution: PropTypes.number
}

export default ContributionTree
