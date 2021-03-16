import React from 'react'
import Popper from '@material-ui/core/Popper'
import PopupState, {
  bindToggle,
  bindPopper
} from 'material-ui-popup-state'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import Avatar from '@material-ui/core/Avatar'
import ArrowIcon from 'assets/images/icons/arrow-down-white.png'
import LogoutIcon from 'assets/images/icons/log-out.png'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import localForage from 'localforage'
import styles from './styles.module.scss'

const AccountDropdown = () => {
  const { user } = useGlobalState()

  const logout = () => {
    localForage
      .clear()
      .then(() => {
        window.location.replace('/')
      })
      .catch(err => {
        return err
      })
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
            <Avatar className={`${styles.avatar}`}>
              {getRawData(user).user.firstName.charAt(0)}
            </Avatar>
            {getRawData(user).user.firstName}
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
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  )
}

export default AccountDropdown
