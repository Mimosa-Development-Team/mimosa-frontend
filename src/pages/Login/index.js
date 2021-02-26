import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import { useUser } from './hooks'

const Login = () => {
  const { addToDo, isLoading } = useUser()

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
    <div>
      <Button
        disabled={isLoading}
        onClick={() => {
          window.location.assign(
            `https://sandbox.orcid.org/oauth/authorize?client_id=APP-YB0Q0XIMHL5MYS0B&response_type=token&scope=openid&redirect_uri=${window.location.href}`
          )
        }}
      >
        {isLoading ? 'Logging In...' : 'Login'}
        <FontAwesomeIcon icon={faCoffee} />
      </Button>
    </div>
  )
}

Login.propTypes = {}

export default Login
