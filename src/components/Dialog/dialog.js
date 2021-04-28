/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import {
  Modal,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

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
  content,
  header,
  method,
  submitLoading,
  submitSuccess,
  modal,
  setModal,
  data,
  status,
  reset,
  submit,
  url
}) {
  const submitForm = () => {
    submit(data)
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
          {submitSuccess ? (
            <div>
              <CheckCircleOutlineIcon className={classes.icon} />
              <p>Succcess</p>
            </div>
          ) : (
            header
          )}
        </Typography>
        <div className={classes.content}>
          <Typography
            variant="subtitle1"
            id="simple-modal-description"
            align="center"
            color="success"
          >
            {submitSuccess
              ? method === 'new' && status === 'publish'
                ? 'Your contribution has been successfully published'
                : status === 'draft'
                ? 'Your contribution has been saved as draft'
                : 'Changes have been published successfully'
              : content}
          </Typography>
        </div>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          {submitSuccess ? (
            <Button
              variant="outlined ml-30 mt-30"
              className="btn contained"
              onClick={() => {
                setModal(!modal)
                url()
                reset()
              }}
            >
              OK
            </Button>
          ) : (
            <>
              <Button
                className="btn outline mr-30 mt-30"
                variant="outlined"
                onClick={() => {
                  if (method === 'new' && status === 'draft') {
                    console.log('here')
                    url()
                  } else if (method === 'new') {
                    setModal(false)
                  } else {
                    url()
                  }
                }}
              >
                CANCEL
              </Button>
              <Button
                variant="contained"
                className="btn contained"
                style={{ float: 'right' }}
                disabled={submitLoading}
                onClick={() => {
                  submitForm()
                }}
              >
                {(method === 'new' && status === 'draft') ||
                (method === 'update' && status === 'draft')
                  ? 'SAVE AS DRAFT'
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
