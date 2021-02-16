import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import { StyledInputLabel } from '../styles'

const MuiSelect = props => {
  const { label, name, options, required, errorobj } = props
  let isError = false
  let errorMessage = ''
  if (errorobj && errorobj[name]) {
    isError = true
    errorMessage = errorobj[name].message
  }

  return (
    <FormControl fullWidth error={isError}>
      <StyledInputLabel htmlFor={name}>
        {label}{' '}
        {required ? <span className="req-label">*</span> : null}
      </StyledInputLabel>
      <Select id={name} {...props}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  )
}

function FormSelect(props) {
  const { control } = useFormContext()
  const { name, label } = props
  return (
    <Controller
      as={MuiSelect}
      control={control}
      name={name}
      label={label}
      defaultValue=""
      {...props}
    />
  )
}

export default FormSelect
