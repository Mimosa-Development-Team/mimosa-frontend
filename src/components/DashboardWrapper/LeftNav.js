import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core'

import Anchor from 'components/Anchor'

const NavLink = ({ icon, title, to }) => {
  return (
    <Anchor href={to}>
      <span>{icon}</span>
      {title}
    </Anchor>
  )
}

NavLink.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

const style = {
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '320px',
    height: '100%',
    backgroundColor: '#253053',
    color: 'white'
  }
}

const LeftNav = props => {
  const { classes, links } = props
  return (
    <div className={classes.sideMenu}>
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          title={link.title}
          icon={<FontAwesomeIcon icon={faCoffee} />}
        />
      ))}
    </div>
  )
}

LeftNav.propTypes = {
  links: PropTypes.array.isRequired
}

export default withStyles(style)(LeftNav)
