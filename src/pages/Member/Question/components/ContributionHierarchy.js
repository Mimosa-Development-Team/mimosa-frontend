import React from 'react'
import PropTypes from 'prop-types'

import Card from 'components/Card'
import styles from './styles.module.scss'

const ContributionHierarchy = ({
  contribution,
  activeContribution,
  getContribution,
  showDraft,
  hasSession,
  onCardClick,
  user
}) => {
  const ListItem = ({ item }) => {
    let children = null
    if (item.children) {
      children = (
        <ul
          className={`${styles.wtree} ${styles.heirarchyList}`}
        >
          {item.children.map(i => (
            <ListItem item={i} key={i.id} />
          ))}
        </ul>
      )
    }
    return (
      <li
        className={`${styles.test} ${styles[item.category]} ${
          styles.contribution
        } ${
          activeContribution && item.id === activeContribution.id
            ? styles.active
            : ''
        }`}
      >
        <Card
          onCardClick={onCardClick}
          heirarchyList
          hasSession={hasSession}
          user={user}
          getContribution={getContribution}
          data={item}
          treeView
          isExpanded={
            activeContribution &&
            item.id === activeContribution.id
          }
          hideDetails={false}
          hideEdit={false}
          showDraft={showDraft}
        />
        {children}
      </li>
    )
  }

  return (
    <div className={`${styles.heirarchyWrapper}`}>
      <ul className={`${styles.heirarchyList}`}>
        {contribution &&
          [contribution].map(i => (
            <ListItem item={i} key={i.id} />
          ))}
      </ul>
    </div>
  )
}

ContributionHierarchy.propTypes = {
  contribution: PropTypes.object
  // activeContribution: PropTypes.number
}

export default ContributionHierarchy
