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
  },
  icon: {
    fontSize: '93px',
    color: 'green'
  },
  success: {
    fontWeight: 'bold'
  }
}))

export default function ModalDialog({
  modal,
  setModal,
  submit,
  message,
  subcontent,
  proceed,
  cancel
}) {
  const submitForm = async () => {
    await submit()
    setModal(false)
    setButtonDisabled(false)
  }
  const [buttonDisabled, setButtonDisabled] = useState(false)

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
    >
      <div style={modalStyle} className={classes.paper}>
        <div className={classes.content}>
          <Typography
            variant="subtitle1"
            id="simple-modal-description"
            align="center"
            color="success"
          >
            {message}
            <br />
            {subcontent}
          </Typography>
        </div>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Button
            className="btn outline mr-30 mt-30"
            variant="outlined"
            onClick={() => {
              setModal(!modal)
              if (cancel) {
                cancel()
              }
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            className="btn contained"
            style={{ float: 'right' }}
            disabled={buttonDisabled}
            onClick={() => {
              setButtonDisabled(true)
              submitForm()
            }}
          >
            {proceed ? 'Proceed' : 'Publish'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
