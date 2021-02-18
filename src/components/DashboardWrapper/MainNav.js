import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'
import { ReactComponent as Logo } from 'assets/images/logo.svg'
import NavLink from './NavLink'
import styles from './styles.module.scss'

const MainNav = props => {
  const { links } = props
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
        <Logo />
        <div className={`${styles.sideMenu}`}>
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

export default MainNav
