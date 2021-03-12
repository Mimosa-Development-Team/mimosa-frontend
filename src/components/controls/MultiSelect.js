import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField, Chip } from '@material-ui/core'

export default function MultiSelect(props) {
  const {
    name,
    label,
    value,
    data,
    placeholder,
    error = null,
    onChange
  } = props
  return (
    <div>
      <Autocomplete
        multiple
        id="tags-filled"
        name={name}
        options={data}
        getOptionLabel={option => {
          return option.name ? option.name : option
        }}
        defaultValue={value}
        freeSolo
        onChange={(e, values) => {
          if (typeof values === 'object' && values !== null) {
            onChange(name, values)
          } else {
            onChange(name, { name: values })
          }

          onChange(
            name,
            values.map(val => {
              let obj = {}
              if (data.some(field => field.name)) {
                if (typeof val === 'object' && val !== null) {
                  obj = val
                } else {
                  obj.name = val
                }
              } else {
                return val
              }
              return obj
            })
          )
        }}
        renderTags={(value, getProps) => {
          return value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.name ? option.name : option}
              {...getProps({ index })}
            />
          ))
        }}
        renderInput={params => (
          <TextField
            name={name}
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            {...(error && { error: true, helperText: error })}
          />
        )}
      />
    </div>
  )
}
