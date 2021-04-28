import React from 'react'
import { TextareaAutosize, InputLabel } from '@material-ui/core'
import { Controller } from 'react-hook-form'

export default function Input(props) {
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
          <TextareaAutosize
            size="small"
            type={type}
            className="textarea"
            onChange={onChange}
            variant="outlined"
            value={value || ''}
            rowsMin={3}
            {...propsList}
          />
        )}
      />
    </div>
  )
}
