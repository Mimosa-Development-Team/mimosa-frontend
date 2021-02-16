import React from 'react'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@material-ui/core'
import { useUser } from './hooks'

const loginFormSchema = yup.object().shape({
  id: yup
    .string()
    .required('ORCID ID is required!')
    .default('100001'),
  name: yup
    .string()
    .required('Full Name is required!')
    .default('Angelo'),
  email: yup.string().email().default('angelo@offshorly.com'),
  role: yup
    .string()
    .required('Role is required!')
    .default('Regular')
})

const Login = () => {
  const { getUser, isLoading } = useUser()
  const { handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema)
  })

  const loginFormOnSubmit = data => {
    // For form validation example
    // eslint-disable-next-line
    console.log({ data })
    getUser()
  }
  return (
    <div>
      <form onSubmit={handleSubmit(loginFormOnSubmit)}>
        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
        >
          {isLoading ? 'Logging In...' : 'Login'}
          <FontAwesomeIcon icon={faCoffee} />
        </Button>
      </form>
    </div>
  )
}

Login.propTypes = {}

export default Login
