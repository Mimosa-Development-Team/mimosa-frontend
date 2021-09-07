import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'assets/images/logo-main.svg'
import { useHistory, useLocation } from 'react-router-dom'
import Popper from '@material-ui/core/Popper'
import Switch from '@material-ui/core/Switch'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
// import ContributionTree from 'components/ContributionTree'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import NotificationIcon from 'assets/images/icons/notification-icon.svg'
import NavLink from './NavLink'
import AccountDropdown from './AccountDropdown'
import styles from './styles.module.scss'

const MainNav = ({
  links,
  // contribution,
  // activeContribution,
  // onTreeClick,
  user,
  hasSession
}) => {
  const { user: proxyUser } = useGlobalState()
  const location = useLocation()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [placement, setPlacement] = React.useState()

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget)
    setOpen(prev => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
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
        {/* {contribution && (
          <ContributionTree
            contribution={contribution}
            activeContribution={activeContribution}
            onTreeClick={onTreeClick}
          />
        )} */}
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
          onClick={handleClick('right-end')}
        >
          <img src={NotificationIcon} alt="" />
          Notifications
        </h1>
        <Popper
          style={{ marginLeft: '42px' }}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{ width: '300px' }}>
                <div style={{ padding: '20px', width: '100%' }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <h1>Notifications</h1>
                    </Grid>
                    <Grid item xs={12}>
                      <span>
                        {getRawData(proxyUser) &&
                          getRawData(proxyUser).user.email}
                      </span>
                      <Switch
                        style={{ alignContent: 'right' }}
                        checked
                        name="notif"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Avatar color="blue">A</Avatar>
                    </Grid>
                    <Grid item xs={9}>
                      <b>Cloyd Alcantara</b> commented on your
                      <span style={{ color: '#35B255' }}>
                        {' '}
                        Experiment
                      </span>{' '}
                      contributions.
                    </Grid>
                    <Grid item xs={3}>
                      <Avatar color="blue">A</Avatar>
                    </Grid>
                    <Grid item xs={9}>
                      <b>Cloyd Alcantara</b> commented on your
                      <span style={{ color: '#35B255' }}>
                        {' '}
                        Experiment
                      </span>{' '}
                      contributions.
                    </Grid>
                    <Grid item xs={3}>
                      <Avatar color="blue">A</Avatar>
                    </Grid>
                    <Grid item xs={9}>
                      <b>Cloyd Alcantara</b> commented on your
                      <span style={{ color: '#35B255' }}>
                        {' '}
                        Experiment
                      </span>{' '}
                      contributions.
                    </Grid>
                    <Grid item xs={3}>
                      <Avatar color="blue">A</Avatar>
                    </Grid>
                    <Grid item xs={9}>
                      <b>Cloyd Alcantara</b> commented on your
                      <span style={{ color: '#35B255' }}>
                        {' '}
                        Experiment
                      </span>{' '}
                      contributions.
                    </Grid>
                    <Grid item xs={3}>
                      <Avatar color="blue">A</Avatar>
                    </Grid>
                    <Grid item xs={9}>
                      <b>Cloyd Alcantara</b> commented on your
                      <span style={{ color: '#35B255' }}>
                        {' '}
                        Experiment
                      </span>{' '}
                      contributions.
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Fade>
          )}
        </Popper>
        <AccountDropdown user={user} hasSession={hasSession} />
      </div>
    </div>
  )
}

MainNav.propTypes = {
  links: PropTypes.array.isRequired,
  contribution: PropTypes.object,
  activeContribution: PropTypes.number
}

export default MainNav
