/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react'
import {
  Modal,
  Typography,
  Button,
  makeStyles,
  Grid
} from '@material-ui/core'
import { Formik, Form } from 'formik'
import Controls from 'components/controls/Controls'
import * as yup from 'yup'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import { useEmail } from './hooks'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 440,
    // height: 300,
    borderRadius: '1em',
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none'
  },
  content: {
    marginTop: '15px'
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
    background: '#ef8c1f',
    color: 'white',
    borderRadius: '24px',
    textTransform: 'none',
    height: '45px',
    width: '180px'
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
  const { updateEmail } = useEmail()

  function getModalStyle() {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    }
  }
  const { user } = useGlobalState()
  const profile = getRawData(user).user
  const formikRef = useRef()
  const schema = yup.object().shape({
    email: yup.string().email().required('* Mandatory Field')
  })

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
        <Typography variant="h1" align="left">
          Register
        </Typography>
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={{
            email: ''
          }}
          defaultValue={{
            email: ''
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            const data = {
              id: profile.id,
              email: values.email
            }
            updateEmail(data)
            setTimeout(() => {
              setSubmitting(false)
              setModal(!modal)
            }, 1000)
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Form
              onSubmit={handleSubmit}
              style={{ marginTop: '15px' }}
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
              >
                <Grid item sm={12} className="text2">
                  <Controls.Input
                    type="text"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    {...(errors &&
                      errors.email && {
                        error: true,
                        helperText: errors.email
                      })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    className="btn primary submitBtn"
                    variant="contained"
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        {/* <div className={classes.content}>
          <Typography
            variant="subtitle1"
            id="simple-modal-description"
            align="left"
            color="success"
          >
            Email Address
          </Typography>
        </div>
        <TextField
          size="small"
          className="input"
          variant="outlined"
          placeholder="Your Email"
          style={{ width: '100%' }}
          type="email"
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <div style={{ marginTop: '30px', textAlign: 'right' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            className={`${classes.buttonLogin}`}
            onClick={() => submit()}
          >
            Register
          </Button>
        </div> */}
      </div>
    </Modal>
  )
}
