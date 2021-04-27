import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField, InputLabel } from '@material-ui/core'

export default function ControlledAutocomplete({
  options = [],
  label,
  control,
  defaultValue,
  asterisk,
  name,
  onChange,
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
    </div>
  )
}
