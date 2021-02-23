import React from 'react'
import PropTypes from 'prop-types'
import Anchor from 'components/Anchor'
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

const NavLink = ({ title, to, icon, active }) => {
  const icons = {
    home: HomeIcon,
    contributions: ContribIcon,
    bookmarks: BookmarksIcon,
    faq: FaqIcon,
    about: AboutIcon
  }
  const activeIcons = {
    home: HomeActiveIcon,
    contributions: ContribActiveIcon,
    bookmarks: BookmarksActiveIcon,
    faq: FaqActiveIcon,
    about: AboutActiveIcon
  }
  return (
    <Anchor
      className={`navLink ${active ? 'active' : ''}`}
      href={to}
    >
      {active ? (
        <img src={activeIcons[icon]} alt="" />
      ) : (
        <img src={icons[icon]} alt="" />
      )}
      {title}
    </Anchor>
  )
}

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
}

export default NavLink
