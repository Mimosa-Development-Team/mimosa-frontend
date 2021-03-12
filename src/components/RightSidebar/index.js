import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import styles from './styles.module.scss'

const RightSidebar = ({ children }) => {
  return (
    <Paper elevation={0} className={`${styles.sidebarWrapper}`}>
      {children}
    </Paper>
  )
}

RightSidebar.propTypes = {
  children: PropTypes.node
}

export default RightSidebar
