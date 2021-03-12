import React from 'react'
import { TextField } from '@material-ui/core'

export default function Input(props) {
  const {
    name,
    type,
    label,
    value,
    error = null,
    onChange
  } = props
  return (
    <div>
      <TextField
        variant="outlined"
        type={type}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...(error && { error: true, helperText: error })}
      />
    </div>
  )
}
