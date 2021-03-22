import React from 'react'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import styles from './style.module.scss'

export default function Input(props) {
  const {
    name,
    control,
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
      <Controller
        render={({ onChange }) => (
          <Select
            size="small"
            variant="outlined"
            className={`${styles.input}`}
            onChange={onChange}
            {...propsList}
            control={control}
          >
            {data.map((x, i) => (
              <MenuItem value={x} key={i}>
                {x}
              </MenuItem>
            ))}
          </Select>
        )}
        name={name}
        control={control}
      />
    </div>
  )
}
