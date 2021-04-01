import React from 'react'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel
} from '@material-ui/core'
import { Controller } from 'react-hook-form'

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
    <div className="radioWrapper">
      <InputLabel className="label">
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
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
                  ? 'radio supports active'
                  : 'radio'
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
                  ? 'radio refutes active'
                  : 'radio'
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
                  ? 'radio unclear active'
                  : 'radio'
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
