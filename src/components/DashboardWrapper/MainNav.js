import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'
import { ReactComponent as Logo } from 'assets/images/logo.svg'
import { useLocation } from 'react-router-dom'
import ContributionTree from 'components/ContributionTree'
import styles from './styles.module.scss'
import NavLink from './NavLink'
import AccountDropdown from './AccountDropdown'

const MainNav = ({ links }) => {
  const location = useLocation()
  return (
    <div className={`${styles.drawerWrapper}`}>
      <Drawer
        className={`${styles.drawer}`}
        variant="permanent"
        anchor="left"
        classes={{
          paper: `${styles.drawerPaper}`
        }}
      >
        <div>
          <Logo />
          {links
            .filter(link => link.location === 'top')
            .map(link => (
              <NavLink
                key={link.id}
                to={link.to}
                title={link.title}
                icon={link.icon}
                active={location.pathname === link.to}
              />
            ))}
          <ContributionTree />
        </div>
        <div>
          {links
            .filter(link => link.location === 'bottom')
            .map(link => (
              <NavLink
                key={link.id}
                to={link.to}
                title={link.title}
                icon={link.icon}
                active={location.pathname === link.to}
              />
            ))}
          <AccountDropdown />
        </div>
      </Drawer>
    </div>
  )
}

MainNav.propTypes = {
  links: PropTypes.array.isRequired
}

export default MainNav
