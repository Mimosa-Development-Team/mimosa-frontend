import React from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import {
  usePopupState,
  bindToggle,
  bindPopper
} from 'material-ui-popup-state/hooks'
import Fade from '@material-ui/core/Fade'
import styles from '../style.module.scss'

const SortFilter = ({ sortFilter, onClick, ...propsList }) => {
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'actionsPopper'
  })

  return (
    <ClickAwayListener onClickAway={popupState.close}>
      <div className={`${styles.actionsWrapper}`}>
        <Button
          disableRipple
          className={`${styles.button}`}
          aria-label="sort filter"
          component="span"
          {...bindToggle(popupState)}
        >
          {sortFilter}
        </Button>
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
                <Button
                  disableRipple
                  aria-label=""
                  className={`${styles.actionButton} mb-10`}
                  {...propsList}
                  onClick={() => onClick('DESC')}
                >
                  Most Recent
                </Button>
                <Button
                  disableRipple
                  aria-label="oldest"
                  className={`${styles.actionButton}`}
                  {...propsList}
                  onClick={() => onClick('ASC')}
                >
                  Oldest
                </Button>
              </>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default SortFilter
