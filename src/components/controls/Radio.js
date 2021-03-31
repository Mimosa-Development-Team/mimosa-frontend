import React from 'react'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel
} from '@material-ui/core'
import { Controller } from 'react-hook-form'
import styles from './style.module.scss'

export default function RadioControl(props) {
  const {
    name,
    control,
    // type,
    label,
    asterisk
    // ...propsList
  } = props
  return (
    <div className={`${styles.radioControl}`}>
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
        defaultValue="supports"
        render={({ onChange, value }) => (
          <RadioGroup
            aria-label="hypothesisStatus"
            onChange={onChange}
            value={value || ''}
            error
            row
          >
            <FormControlLabel
              value="supports"
              className={`${
                value === 'supports'
                  ? styles.radioActive
                  : styles.radio
              }`}
              control={
                <Radio
                  style={{
                    display: 'none'
                  }}
                />
              }
              label="SUPPORTS HYPOTHESIS"
            />
            <FormControlLabel
              value="refutes"
              className={`${
                value === 'refutes'
                  ? styles.radioActive
                  : styles.radio
              }`}
              control={
                <Radio
                  style={{
                    display: 'none'
                  }}
                />
              }
              label="REFUTES HYPOTHESIS"
            />
            <FormControlLabel
              value="unclear"
              className={`${
                value === 'unclear'
                  ? styles.radioActive
                  : styles.radio
              }`}
              control={
                <Radio
                  style={{
                    display: 'none'
                  }}
                />
              }
              label="UNCLEAR"
            />
          </RadioGroup>
        )}
      />
    </div>
  )
}
