import React from 'react'
import { TextareaAutosize, InputLabel } from '@material-ui/core'

export default function Input(props) {
  const {
    name,
    control,
    type,
    label,
    asterisk,
    errors,
    register,
    ...propsList
  } = props
  return (
    <div className="inputWrapper">
      <InputLabel className="label">
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
      </InputLabel>
      <TextareaAutosize
        size="small"
        type={type}
        className="textarea"
        ref={register}
        variant="outlined"
        rowsMin={3}
        {...propsList}
      />
    </div>
  )
}
