import React, { useEffect } from 'react'
import {
  Button,
  CssBaseline,
  Container,
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useUser } from './hooks'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    backgroundColor: 'yellowgreen',
    color: 'white'
  },
  h1: {
    color: 'white'
  }
}))

const Login = () => {
  const { addToDo, isLoading } = useUser()
  const classes = useStyles()
  useEffect(() => {
    if (window.location.hash) {
      const params = window.location.hash.substr(1).split('&')
      for (let i = 0; i < params.length; i++) {
        const a = params[i].split('=')
        // Now every parameter from the hash is beind handled this way
        if (a[0] === 'id_token' && a[1]) {
          const token = a[1]
          addToDo({ token })
        }
      }
    }
  }, [addToDo])

  return (
    <Container component="main" maxWidth="xs">
      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', minWidth: '100vh' }}
      >
        <Grid lg={6} />
        <Grid lg={6}>
          <CssBaseline />
          <div className={classes.paper}>
            <h2
              component="h1"
              className={classes.h1}
              variant="h5"
            >
              Welcome back
            </h2>
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={() => {
                window.location.assign(
                  `https://sandbox.orcid.org/oauth/authorize?client_id=APP-YB0Q0XIMHL5MYS0B&response_type=token&scope=openid&redirect_uri=${window.location.href}`
                )
              }}
            >
              {isLoading ? 'Logging In...' : 'Log in with ORCID'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

Login.propTypes = {}

export default Login
