import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Logo from 'assets/images/logo-main.svg'
import { useHistory, useLocation } from 'react-router-dom'
import ContributionTree from 'components/ContributionTree'
// import { useGlobalState } from 'store/state'
// import getRawData from 'utils/parsing/Proxy'
import NotificationIcon from 'assets/images/icons/notification-icon.svg'
import Notification from './Notification'
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
  // const { user: proxyUser } = useGlobalState()
  const location = useLocation()
  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

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
              child={link.child}
              url={link.url}
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
              child={link.child}
              url={link.url}
              title={link.title}
              icon={link.icon}
              active={location.pathname === link.to}
            />
          ))}
        <h1
          style={{ fontWeight: 'normal', cursor: 'pointer' }}
          className={`${styles.navLink}`}
          onClick={handleClick}
        >
          <img src={NotificationIcon} alt="" />
          Notifications
        </h1>
        <Notification
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
        <AccountDropdown user={user} hasSession={hasSession} />
      </div>
    </div>
  )
}

MainNav.propTypes = {
  links: PropTypes.array.isRequired
  // contribution: PropTypes.object,
  // activeContribution: PropTypes.number
}

export default MainNav
