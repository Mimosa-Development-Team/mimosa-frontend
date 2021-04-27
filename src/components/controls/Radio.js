import React from 'react'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel
} from '@material-ui/core'

export default function RadioControl(props) {
  const {
    name,
    control,
    // type,
    label,
    asterisk,
    value,
    ...propsList
  } = props
  return (
    <div className="radioWrapper">
      <InputLabel className="label">
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
      </InputLabel>
      <RadioGroup
        className="ml-15"
        aria-label="hypothesisStatus"
        {...propsList}
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
    </div>
  )
}
