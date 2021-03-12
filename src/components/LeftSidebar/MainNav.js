import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Logo } from 'assets/images/logo.svg'
import { useLocation } from 'react-router-dom'
import ContributionTree from 'components/ContributionTree'
import NavLink from './NavLink'
import AccountDropdown from './AccountDropdown'
import styles from './styles.module.scss'

const MainNav = ({ links }) => {
  const location = useLocation()
  return (
    <div className={`${styles.mainNav}`}>
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
    </div>
  )
}

MainNav.propTypes = {
  links: PropTypes.array.isRequired
}

export default MainNav
