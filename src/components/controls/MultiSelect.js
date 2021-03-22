import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField, InputLabel } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import styles from './style.module.scss'

export default function ControlledAutocomplete({
  options = [],
  label,
  control,
  defaultValue,
  asterisk,
  name,
  ...propsList
}) {
  return (
    <div className={`${styles.multiSelectControl}`}>
      <InputLabel className={`${styles.label}`}>
        {label}{' '}
        {asterisk ? (
          <span className={`${styles.required}`}>*</span>
        ) : null}
      </InputLabel>
      <Controller
        render={({ onChange, ...props }) => (
          <Autocomplete
            freeSolo
            multiple
            size="small"
            options={options}
            getOptionLabel={option => {
              return option.name ? option.name : option
            }}
            renderInput={params => (
              <TextField
                className={`${styles.input}`}
                {...params}
                placeholder={label}
                {...propsList}
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, values) => {
              if (
                typeof values === 'object' &&
                values !== null
              ) {
                onChange(values)
              } else {
                onChange({ name: values })
              }

              onChange(
                values.map(val => {
                  let obj = {}
                  if (options.some(field => field.name)) {
                    if (
                      typeof val === 'object' &&
                      val !== null
                    ) {
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
            {...props}
          />
        )}
        onChange={([, data]) => data}
        defaultValue={defaultValue}
        name={name}
        control={control}
      />
    </div>
  )
}
