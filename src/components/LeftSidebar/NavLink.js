/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import HomeIcon from 'assets/images/icons/home.svg'
import HomeActiveIcon from 'assets/images/icons/home-active.svg'
import ContribIcon from 'assets/images/icons/contributions.svg'
import ContribActiveIcon from 'assets/images/icons/contributions-active.svg'
import BookmarksIcon from 'assets/images/icons/bookmarks.svg'
import BookmarksActiveIcon from 'assets/images/icons/bookmarks-active.svg'
import FaqIcon from 'assets/images/icons/faq.svg'
import FaqActiveIcon from 'assets/images/icons/faq-active.svg'
import AboutIcon from 'assets/images/icons/about.svg'
import AboutActiveIcon from 'assets/images/icons/about-active.svg'
import NotificationIcon from 'assets/images/icons/notification-icon.svg'
import NotificationActiveIcon from 'assets/images/icons/notification-icon-active.svg'
import HowToIcon from 'assets/images/icons/how-to.svg'
import HowToActiveIcon from 'assets/images/icons/how-to-col.svg'
import styles from './styles.module.scss'

const NavLink = ({
  title,
  icon,
  active,
  child,
  to,
  url,
  ...rest
}) => {
  const icons = {
    home: HomeIcon,
    contributions: ContribIcon,
    bookmarks: BookmarksIcon,
    faq: FaqIcon,
    about: AboutIcon,
    notification: NotificationIcon,
    howto: HowToIcon
  }
  const activeIcons = {
    home: HomeActiveIcon,
    contributions: ContribActiveIcon,
    bookmarks: BookmarksActiveIcon,
    faq: FaqActiveIcon,
    about: AboutActiveIcon,
    notification: NotificationActiveIcon,
    howto: HowToActiveIcon
  }

  return (
    <>
      <Link
        className={`${styles.navLink} ${
          active ? styles.active : ''
        }`}
        to={to}
        {...rest}
      >
        {active ? (
          <img src={activeIcons[icon]} alt="" />
        ) : (
          <img src={icons[icon]} alt="" />
        )}
        {title}
      </Link>
    </>
  )
}

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

export default NavLink
