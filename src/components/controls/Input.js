import React from 'react'
import { TextField, InputLabel } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import styles from './style.module.scss'

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
    <div className={`${styles.inputControl}`}>
      <InputLabel className={`${styles.label}`}>
        {label}{' '}
        {asterisk ? (
          <span className={`${styles.required}`}>*</span>
        ) : null}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        label={label}
        render={({ onChange, value }) => (
          <TextField
            size="small"
            type={type}
            className={`${styles.input}`}
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
