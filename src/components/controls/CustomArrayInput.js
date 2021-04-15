import React from 'react'
import { TextField, InputLabel } from '@material-ui/core'

export default function Input(props) {
  const { label, asterisk, ...propsList } = props
  return (
    <div className="inputWrapper">
      <InputLabel className="label">
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
      </InputLabel>
      <TextField
        size="small"
        className="input"
        variant="outlined"
        {...propsList}
      />
    </div>
  )
}
