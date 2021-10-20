/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import capitalizeText from 'utils/parsing/capitalize'
import styles from './styles.module.scss'

const ContributionTree = ({
  contribution,
  activeContribution,
  onTreeClick
}) => {
  const [data, setData] = useState([])
  useEffect(() => {
    setData([contribution])
  }, [])
  const TreeNode = ({ node, children }) => {
    let nodes
    if (children) {
      nodes = children.map(i => (
        <TreeNode node={i} children={i.children} />
      ))
    }
    return (
      <li
        style={{ zIndex: node.id + 1 }}
        className={`${styles[node.category]} ${
          activeContribution && node.id === activeContribution.id
            ? styles.active
            : ''
        }`}
        onClick={() => {
          onTreeClick(node)
        }}
      >
        {capitalizeText(node.category.charAt(0))}
        <ul className={`${styles.childul}`}>{nodes}</ul>
      </li>
    )
  }

  return (
    <div className={`${styles.heirarchyWrapper}`}>
      <Typography className={`${styles.title}`} variant="h5">
        Contribution Tree:
      </Typography>
      <ul className={`${styles.mainul}`}>
        {data.map(i => (
          <TreeNode node={i} children={i.children} />
        ))}
      </ul>
    </div>
  )
}

export default ContributionTree
