/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import {
  Modal,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 500,
    // height: 300,
    borderRadius: '1em',
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none'
  },
  content: {
    marginTop: '35px'
  },
  buttonDiv: {
    padding: theme.spacing(4)
  },
  buttonCancel: {
    padding: '1em',
    width: '40%',
    borderRadius: '2em',
    color: '#ef8c20',
    height: '3em',
    borderColor: '#ef8c20'
  },
  buttonClose: {
    padding: '1em',
    width: '40%',
    float: 'right',
    borderRadius: '2em',
    color: '#ef8c20',
    height: '3em',
    borderColor: '#ef8c20'
  },
  buttonSubmit: {
    width: '40%',
    float: 'right',
    borderRadius: '2em',
    backgroundColor: '#ef8c20',
    height: '3em',
    color: 'white'
  }
}))

export default function ModalDialog({
  header,
  content,
  loading,
  error,
  onClose,
  method,
  onDelete,
  errorHeader
  // success
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (loading) {
      setOpen(true)
    }
  }, [loading, setOpen])

  function getModalStyle() {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    }
  }

  const [modalStyle] = useState(getModalStyle)
  const classes = useStyles()

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={() => setOpen(!open)}
      disableBackdropClick
    >
      <div style={modalStyle} className={classes.paper}>
        <Typography
          variant="h1"
          align="center"
          color={method === 'delete' || error ? 'error' : ''}
        >
          {error ? errorHeader : header}
        </Typography>
        <div className={classes.content}>
          <Typography
            variant="subtitle1"
            id="simple-modal-description"
            align="center"
          >
            {error || content}
          </Typography>
        </div>
        {method === 'delete' ? (
          <div className={classes.buttonDiv}>
            <Button
              className={classes.buttonCancel}
              variant="outlined"
              onClick={() => {
                setOpen(!open)
                onClose()
              }}
            >
              CLOSE
            </Button>
            <Button
              variant="contained"
              className={classes.buttonSubmit}
              onClick={onDelete}
            >
              DELETE
            </Button>
          </div>
        ) : (
          <div className={classes.buttonDiv}>
            <Button
              variant="outlined"
              className={classes.buttonClose}
              disabled={loading}
              onClick={() => {
                setOpen(!open)
                onClose()
              }}
            >
              CLOSE
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
