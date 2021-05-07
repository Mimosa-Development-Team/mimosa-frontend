import React, { useState } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'

import LeftSidebar from 'components/LeftSidebar'
import styles from './styles.module.scss'

const PageWrapper = ({
  children,
  showNav,
  links,
  contribution,
  activeContribution,
  onTreeClick,
  hasSession,
  user
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <div className={`${styles.wrapper}`}>
      <Hidden mdUp implementation="css">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          className={`${styles.mobileMenuBtn}`}
        >
          <MenuIcon
            fontSize="inherit"
            style={{ color: '#FFF' }}
          />
        </IconButton>
      </Hidden>
      <div className={`${styles.appMain}`}>
        <LeftSidebar
          showNav={showNav}
          links={links}
          hasSession={hasSession}
          user={user}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          contribution={contribution}
          activeContribution={activeContribution}
          onTreeClick={onTreeClick}
        />
        {children}
      </div>
    </div>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node
}

export default PageWrapper
