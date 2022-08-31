import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import {
  usePopupState,
  bindToggle,
  bindPopper
} from 'material-ui-popup-state/hooks'
import Fade from '@material-ui/core/Fade'
import EditIcon from 'assets/images/icons/edit.png'
import DeleteIcon from 'assets/images/icons/delete.svg'
import styles from './styles.module.scss'

const Actions = ({
  data,
  onEdit,
  onDelete,
  role,
  raw,
  ...propsList
}) => {
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'actionsPopper'
  })

  return (
    <ClickAwayListener onClickAway={popupState.close}>
      <div className={`${styles.actionsWrapper}`}>
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
                {raw.orcidId === data.mmUser.orcidId ? (
                  <IconButton
                    disableRipple
                    aria-label="edit"
                    className={`${styles.actionButton} mb-10`}
                    {...propsList}
                    onClick={() => onEdit(data)}
                  >
                    <img src={EditIcon} alt="edit icon" />
                    Edit
                  </IconButton>
                ) : null}
                {raw.role === 'admin' ||
                raw.orcidId === data.mmUser.orcidId ? (
                  <IconButton
                    disableRipple
                    aria-label="delete"
                    className={`${styles.actionButton}`}
                    {...propsList}
                    onClick={() => onDelete(data)}
                  >
                    <img src={DeleteIcon} alt="delete" />
                    Delete
                  </IconButton>
                ) : null}
              </>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default Actions
