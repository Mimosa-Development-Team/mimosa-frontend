import React from 'react'
import PropTypes from 'prop-types'

import Anchor from 'components/Anchor'

const NavLink = ({ title, to }) => {
  return <Anchor href={to}>{title}</Anchor>
}

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default NavLink
