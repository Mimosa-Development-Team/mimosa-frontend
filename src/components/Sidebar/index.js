import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import styles from './styles.module.scss'

const Sidebar = ({ children }) => {
  return (
    <Paper elevation={0} className={`${styles.sidebarWrapper}`}>
      {children}
    </Paper>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node
}

export default Sidebar
