import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Popper from '@material-ui/core/Popper'
import PopupState, {
  bindToggle,
  bindPopper
} from 'material-ui-popup-state'
import Fade from '@material-ui/core/Fade'
import EditIcon from 'assets/images/icons/edit.png'
// import DeleteIcon from 'assets/images/icons/delete.svg'
import styles from './styles.module.scss'

const Actions = ({ ...propsList }) => {
  return (
    <div className={`${styles.actionsWrapper}`}>
      <PopupState variant="popper" popupId="actions-popper">
        {popupState => (
          <>
            <IconButton
              className={`${styles.button}`}
              aria-label="actions"
              component="span"
              {...bindToggle(popupState)}
            >
              <MoreHorizIcon />
            </IconButton>
            <Popper
              placement="bottom"
              disablePortal
              className={`${styles.popper}`}
              {...bindPopper(popupState)}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={0}>
                  <>
                    <IconButton
                      disableRipple="true"
                      aria-label="edit"
                      className={`${styles.actionButton}`}
                      {...propsList}
                    >
                      <img src={EditIcon} alt="" />
                      Edit
                    </IconButton>
                  </>
                </Fade>
              )}
            </Popper>
          </>
        )}
      </PopupState>
    </div>
  )
}

export default Actions
