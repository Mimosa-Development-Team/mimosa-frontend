/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
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
  content,
  header,
  method,
  submitLoading,
  submitSuccess,
  modal,
  setModal,
  data,
  onReset,
  status,
  reset,
  submit,
  url
}) {
  const submitForm = () => {
    submit(data)
    onReset()
  }

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
      open={modal}
      onClose={() => setModal(!modal)}
      disableBackdropClick
    >
      <div style={modalStyle} className={classes.paper}>
        <Typography variant="h1" align="center">
          {header}
        </Typography>
        <div className={classes.content}>
          <Typography
            variant="subtitle1"
            id="simple-modal-description"
            align="center"
          >
            {content}
          </Typography>
        </div>
        <div style={{ marginTop: '30px' }}>
          {submitSuccess ? (
            <Button
              variant="outlined ml-30 mt-30"
              className="btn outline"
              onClick={() => {
                setModal(!modal)
                url()
                onReset()
                reset()
              }}
              style={{ float: 'right' }}
            >
              CLOSE
            </Button>
          ) : (
            <>
              <Button
                className="btn outline mr-30 mt-30"
                variant="outlined"
                onClick={() => setModal(!modal)}
              >
                CLOSE
              </Button>
              <Button
                variant="contained"
                className="btn contained"
                style={{ float: 'right' }}
                disabled={submitLoading}
                onClick={() => {
                  submitForm()
                  onReset()
                }}
              >
                {method === 'new' && status === 'draft'
                  ? 'CONTINUE'
                  : method === 'new'
                  ? 'PUBLISH'
                  : 'UPDATE'}
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
