import React from 'react'
import { TextField, InputLabel } from '@material-ui/core'
import styles from './style.module.scss'

export default function Input(props) {
  const {
    name,
    control,
    type,
    label,
    asterisk,
    errors,
    value,
    onChange,
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
      <TextField
        size="small"
        type={type}
        onChange={onChange}
        className={`${styles.input}`}
        variant="outlined"
        value={value || ''}
        {...propsList}
      />
    </div>
  )
}
