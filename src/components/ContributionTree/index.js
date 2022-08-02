/* eslint-disable react/no-children-prop */
import { Typography } from '@material-ui/core'
import React from 'react'
import capitalizeText from 'utils/parsing/capitalize'
import styles from './styles.module.scss'

const ContributionTree = ({
  contribution,
  activeContribution,
  onTreeClick
}) => {
  const ListItem = ({ item }) => {
    let children = null
    if (item.children) {
      children = (
        <ul
          className={`${
            item.category === 'question'
              ? styles.wtree
              : styles.uitree
          } ${styles.heirarchyList}`}
        >
          {item.children.map(i => (
            <ListItem item={i} key={i.id} />
          ))}
        </ul>
      )
    }
    return (
      <li style={{ listStyle: 'none' }}>
        <span
          className={`${styles.listtree} ${
            styles[item.category]
          } ${
            activeContribution &&
            item.id === activeContribution.id
              ? styles.active
              : ''
          }`}
          onClick={() => onTreeClick(item)}
        >
          {capitalizeText(item.category.charAt(0))}
        </span>
        {children}
      </li>
    )
  }

  return (
    <div className={`${styles.main}`}>
      <Typography className={`${styles.h5style}`} variant="span">
        Contribution Tree:
      </Typography>
      <div className={`${styles.heirarchyWrapper}`}>
        <ul
          className={`${styles.questionUl} ${styles.question}`}
        >
          {contribution &&
            [contribution].map(i => (
              <ListItem item={i} key={i.id} />
            ))}
        </ul>
      </div>
    </div>
  )
}

export default ContributionTree
