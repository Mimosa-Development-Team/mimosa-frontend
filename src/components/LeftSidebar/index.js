import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import MainNav from './MainNav'
import styles from './styles.module.scss'

const LeftSidebar = ({ showNav, links }) => {
  return (
    <Drawer
      className={`${styles.drawer}`}
      variant="permanent"
      anchor="left"
      classes={{
        paper: `${styles.drawerPaper}`
      }}
    >
      {showNav && <MainNav links={links} />}
    </Drawer>
  )
}

LeftSidebar.propTypes = {
  showNav: PropTypes.bool,
  links: PropTypes.array
}

export default LeftSidebar
