import React from 'react'
import { TextField, InputLabel } from '@material-ui/core'
import { Controller } from 'react-hook-form'

export default function CustomInput(props) {
  const {
    name,
    control,
    type,
    label,
    asterisk,
    errors,
    ...propsList
  } = props
  return (
    <div className="inputWrapper">
      <InputLabel className="label">
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        label={label}
        render={({ onChange, value }) => (
          <TextField
            size="small"
            type={type}
            className="input"
            onChange={onChange}
            variant="outlined"
            value={value || ''}
            {...propsList}
          />
        )}
      />
    </div>
  )
}
