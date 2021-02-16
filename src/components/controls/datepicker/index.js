import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

const MuiDatePicker = props => {
  const { name, required, errorobj } = props
  let isError = false
  let errorMessage = ''
  if (errorobj && errorobj[name]) {
    isError = true
    errorMessage = errorobj[name].message
  }
  return (
    <KeyboardDatePicker
      format="DD-MM-YYYY"
      fullWidth
      InputLabelProps={{
        className: required ? 'required-label' : '',
        required: required || false
      }}
      error={isError}
      helperText={errorMessage}
      {...props}
    />
  )
}

function FormDatePicker(props) {
  const { control } = useFormContext()
  const { name, label } = props

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Controller
        as={MuiDatePicker}
        name={name}
        control={control}
        label={label}
        defaultValue={null}
        {...props}
      />
    </MuiPickersUtilsProvider>
  )
}

export default FormDatePicker
