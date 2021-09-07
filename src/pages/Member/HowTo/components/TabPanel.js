import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      className={`${styles.tabPanel}`}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

export default TabPanel
