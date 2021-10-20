import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField, InputLabel } from '@material-ui/core'

export default function ControlledAutocomplete({
  options = [],
  label,
  control,
  value,
  defaultValue,
  asterisk,
  name,
  error,
  onChange,
  helperText,
  ...propsList
}) {
  return (
    <div className="multiSelectWrapper">
      <InputLabel className="label">
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
      </InputLabel>
      <Autocomplete
        freeSolo
        multiple
        size="small"
        options={options}
        getOptionLabel={option => {
          return option.name ? option.name : option
        }}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        renderInput={params => (
          <TextField
            {...propsList}
            {...params}
            className="input"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <span
        style={{
          color: '#f44336',
          fontSize: '.75rem',
          marginLeft: '14px'
        }}
      >
        {helperText}
      </span>
    </div>
  )
}
