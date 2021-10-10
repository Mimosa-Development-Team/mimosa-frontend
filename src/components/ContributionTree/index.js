import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import capitalizeText from 'utils/parsing/capitalize'
import styles from './styles.module.scss'

const ContributionTree = ({
  contribution,
  activeContribution,
  onTreeClick
}) => {
  const CategoryWrapper = ({ data }) => {
    let children = null
    if (data.children) {
      children = (
        <ul
          className={`${
            data.category === 'question' && styles.wtree
          } ${styles.heirarchyList}`}
        >
          {data.children.map(i => {
            return <CategoryWrapper data={i} key={i.id} />
          })}
        </ul>
      )
    }

    return (
      <ul className={`${styles.heirarchyList}`}>
        <li
          className={`${styles[data.category]} ${
            styles.contribution
          } ${
            activeContribution &&
            data.id === activeContribution.id
              ? styles.active
              : ''
          }`}
          style={{ listStyle: 'none' }}
          onClick={() => {
            onTreeClick(data)
          }}
        >
          {capitalizeText(
            data.category && data.category.charAt(0)
          )}
          {children}
        </li>
      </ul>
    )
  }
  return (
    <div className={`${styles.heirarchyWrapper}`}>
      <Typography className={`${styles.title}`} variant="h5">
        Contribution Tree:
      </Typography>
      {[contribution].map(i => {
        return <CategoryWrapper data={i} key={i.id} />
      })}
    </div>
  )
}

ContributionTree.propTypes = {
  contribution: PropTypes.object
}

export default ContributionTree
