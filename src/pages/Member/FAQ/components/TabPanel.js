import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'react-uuid'
import styles from './styles.module.scss'

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      className={`${styles.tabPanel}`}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${uuid()}`}
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
