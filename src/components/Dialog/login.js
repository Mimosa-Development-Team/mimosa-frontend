/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import {
  Modal,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'
import OrcidLogo from 'assets/images/login/orcid.png'
import dotenv from 'global/environment'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 600,
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
  },
  buttonLogin: {
    boxShadow: 'none',
    background: '#a6d120',
    color: 'white',
    borderRadius: '12px',
    textTransform: 'none',
    height: '45px',
    width: '220px'
  },
  img: {
    width: '22px',
    marginRight: '7px'
  },
  link: {
    color: '#ec8a21'
  }
}))

export default function ModalDialog({ modal, setModal }) {
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
      onBackdropClick={() => setModal(!modal)}
    >
      <div style={modalStyle} className={classes.paper}>
        <Typography variant="h1" align="center">
          Login
        </Typography>
        <div className={classes.content}>
          <Typography
            variant="subtitle1"
            id="simple-modal-description"
            align="center"
            color="success"
          >
            You need to be logged in to add contributions and
            comments.
            <br />
            By continuing, you agree to our{' '}
            <a
              href="/terms-and-conditions"
              className={classes.link}
            >
              Terms and Conditions.
            </a>
          </Typography>
        </div>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            className={`${classes.buttonLogin}`}
            onClick={() => {
              window.location.assign(
                `${dotenv.orcidUrl}${window.location.href}login`
              )
            }}
          >
            <img className={classes.img} src={OrcidLogo} />
            Log in with ORCID
          </Button>
        </div>
      </div>
    </Modal>
  )
}
