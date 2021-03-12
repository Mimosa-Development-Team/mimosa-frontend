import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

export function useForm(
  initialFValues,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(initialFValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    if (typeof e === 'object' && e !== null) {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
      if (validateOnChange) validate({ [name]: value })
    } else {
      setValues({
        ...values,
        details: e
      })
      if (validateOnChange) validate({ details: e })
    }
  }

  const handleMultipleInput = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
    if (validateOnChange) validate({ [name]: value })
  }

  const resetForm = () => {
    setValues(initialFValues)
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleMultipleInput,
    resetForm
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1)
    }
  }
}))

export function Form(props) {
  const classes = useStyles()
  const { children, ...other } = props
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  )
}
