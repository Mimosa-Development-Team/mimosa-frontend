import React from 'react'
import { TextField, InputLabel } from '@material-ui/core'

export default function Input(props) {
  const {
    name,
    control,
    type,
    label,
    asterisk,
    errors,
    value,
    onChange,
    ...propsList
  } = props
  return (
    <div className="inputWrapper">
      <InputLabel className="label">
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
      </InputLabel>
      <TextField
        size="small"
        type={type}
        onChange={onChange}
        className="input"
        variant="outlined"
        value={value || ''}
        {...propsList}
      />
    </div>
  )
}
