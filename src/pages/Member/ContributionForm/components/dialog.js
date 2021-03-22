import React, { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { useHistory } from 'react-router-dom'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import styles from './style.module.scss'

export default function DialogNotification({
  updateIsLoadingContribution,
  addLoadingContribution,
  reset,
  status,
  type,
  addedData
}) {
  const history = useHistory()
  const [dialogStatus, setDialogStatus] = useState(false)
  useEffect(() => {
    if (addLoadingContribution) {
      setDialogStatus(true)
    }
    if (updateIsLoadingContribution) {
      setDialogStatus(true)
    }
  }, [addLoadingContribution, updateIsLoadingContribution])
  //   const [dialog, setDialog] = useState(true)
  return (
    <Dialog
      open={dialogStatus}
      //   onClose={dialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Contribution Form
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {addLoadingContribution || updateIsLoadingContribution
            ? 'Submitting Contribution . . .'
            : 'Your Contribution has been submitted!'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button color="primary" onClick={() => setDialog(false)}>
          Disagree
        </Button> */}
        <Button
          className={`${styles.button}`}
          variant="contained"
          onClick={() => {
            reset()
            setDialogStatus(!dialogStatus)
            if (status === 'draft') {
              history.push(`/contribution-form/${type}/new`, {
                type: 'new',
                data: addedData
              })
            }
          }}
          autoFocus
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
