import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import MainNav from './MainNav'
import styles from './styles.module.scss'

const LeftSidebar = ({
  showNav,
  links,
  contribution,
  activeContribution,
  onTreeClick,
  mobileOpen,
  handleDrawerToggle,
  user,
  hasSession
}) => {
  return (
    <>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: `${styles.drawerPaper}`
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {showNav && (
            <MainNav
              user={user}
              hasSession={hasSession}
              links={links}
              contribution={contribution}
              activeContribution={activeContribution}
              onTreeClick={onTreeClick}
            />
          )}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          className={`${styles.drawer}`}
          variant="permanent"
          anchor="left"
          classes={{
            paper: `${styles.drawerPaper}`
          }}
        >
          {showNav && (
            <MainNav
              user={user}
              hasSession={hasSession}
              links={links}
              contribution={contribution}
              activeContribution={activeContribution}
              onTreeClick={onTreeClick}
            />
          )}
        </Drawer>
      </Hidden>
    </>
  )
}

LeftSidebar.propTypes = {
  showNav: PropTypes.bool,
  links: PropTypes.array,
  contribution: PropTypes.object,
  activeContribution: PropTypes.number
}

export default LeftSidebar
