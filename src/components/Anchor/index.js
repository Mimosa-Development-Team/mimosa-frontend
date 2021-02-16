import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Anchor = ({ children, href = '#', ...rest }) => {
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  )
}

Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

export default Anchor
