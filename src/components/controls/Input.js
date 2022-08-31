import React from 'react'
import { TextField, InputLabel } from '@material-ui/core'

export default function Input(props) {
  const { label, asterisk, register, labelFor, ...rest } = props
  return (
    <div className="inputWrapper">
      <InputLabel className="label" for={labelFor}>
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
      </InputLabel>
      <TextField
        size="small"
        className="input"
        variant="outlined"
        ref={register}
        {...rest}
      />
    </div>
  )
}
