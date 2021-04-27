import React from 'react'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import styles from './style.module.scss'

export default function Input(props) {
  const {
    name,
    type,
    label,
    asterisk,
    data,
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
      <Select
        size="small"
        variant="outlined"
        className={`${styles.input}`}
        {...propsList}
      >
        {data.map((x, i) => (
          <MenuItem value={x} key={i}>
            {x}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}
