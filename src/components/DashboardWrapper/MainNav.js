import React from 'react'
import { withStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'
import { ReactComponent as Logo } from './logo.svg'
import NavLink from './NavLink'

const drawerWidth = 300

const style = {
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#121a35',
    padding: '40px 45px'
  },
  sideMenu: {
    marginTop: '30px'
  }
}

const MainNav = props => {
  const { classes, links } = props
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Logo />
        <div className={classes.sideMenu}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              title={link.title}
            />
          ))}
        </div>
      </Drawer>
    </div>
  )
}

MainNav.propTypes = {
  links: PropTypes.array.isRequired
}

export default withStyles(style)(MainNav)
