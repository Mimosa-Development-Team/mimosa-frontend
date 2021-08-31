import React from 'react'
import Popper from '@material-ui/core/Popper'
import PopupState, {
  bindToggle,
  bindPopper
} from 'material-ui-popup-state'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import Avatar from '@material-ui/core/Avatar'
import { useHistory } from 'react-router-dom'
import ArrowIcon from 'assets/images/icons/arrow-down-white.png'
import LogoutIcon from 'assets/images/icons/log-out.png'
import GuestIcon from 'assets/images/guest.svg'
import localForage from 'localforage'
import capitalizeText from 'utils/parsing/capitalize'
import styles from './styles.module.scss'

const AccountDropdown = ({ user, hasSession }) => {
  const history = useHistory()
  const logout = () => {
    localForage
      .clear()
      .then(() => {
        window.location.replace('/')
      })
      .catch(err => {
        return err
      })
    localStorage.clear()
  }

  return (
    <PopupState variant="popper" popupId="account-popper">
      {popupState => (
        <div className={`${styles.accountDropdown}`}>
          <Paper
            elevation={0}
            component="button"
            className={`${styles.button}`}
            {...bindToggle(popupState)}
          >
            {hasSession ? (
              <Avatar
                className={`${styles.avatar}`}
                style={{
                  backgroundColor: user.user.userColor
                }}
              >
                {user.user.firstName.charAt(0)}
              </Avatar>
            ) : (
              <img
                src={GuestIcon}
                className={`${styles.guest}`}
              />
            )}
            {hasSession
              ? capitalizeText(user.user.firstName)
              : capitalizeText('guest')}
            <img
              alt="arrow down"
              src={ArrowIcon}
              className={`${styles.icon}`}
            />
          </Paper>
          <Popper
            placement="top"
            disablePortal
            className={`${styles.popper}`}
            {...bindPopper(popupState)}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={0}>
                {hasSession ? (
                  <Paper
                    elevation={0}
                    component="button"
                    className={`${styles.popperButton}`}
                    onClick={() => logout()}
                  >
                    <img
                      alt="logout"
                      src={LogoutIcon}
                      className={`${styles.icon}`}
                    />
                    Logout
                  </Paper>
                ) : (
                  <Paper
                    elevation={0}
                    component="button"
                    className={`${styles.popperButton}`}
                    onClick={() => history.push('/login')}
                  >
                    <img
                      alt="login"
                      src={LogoutIcon}
                      className={`${styles.icon}`}
                    />
                    Login
                  </Paper>
                )}
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  )
}

export default AccountDropdown
