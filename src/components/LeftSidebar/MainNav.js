import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'assets/images/logo.png'
import { useHistory, useLocation } from 'react-router-dom'
import ContributionTree from 'components/ContributionTree'
import NavLink from './NavLink'
import AccountDropdown from './AccountDropdown'
import styles from './styles.module.scss'

const MainNav = ({
  links,
  contribution,
  activeContribution,
  onTreeClick,
  user,
  hasSession
}) => {
  const location = useLocation()
  const history = useHistory()
  return (
    <div className={`${styles.mainNav}`}>
      <div>
        <img
          className={`${styles.logo}`}
          src={Logo}
          onClick={() => {
            history.push(`/`)
          }}
        />
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
        {contribution && (
          <ContributionTree
            contribution={contribution}
            activeContribution={activeContribution}
            onTreeClick={onTreeClick}
          />
        )}
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
        <AccountDropdown user={user} hasSession={hasSession} />
      </div>
    </div>
  )
}

MainNav.propTypes = {
  links: PropTypes.array.isRequired,
  contribution: PropTypes.object,
  activeContribution: PropTypes.object
}

export default MainNav
