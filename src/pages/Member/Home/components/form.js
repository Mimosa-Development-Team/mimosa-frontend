import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Grid, Button } from '@material-ui/core'
import Controls from 'components/controls/Control'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object().shape({
  nameV: yup
    .string()
    .required('Name Validation Field is Required'),
  selV: yup
    .string()
    .required('Select Validation Field is Required'),
  selAutoV: yup
    .array()
    .required('Multi Select Validation Field required'),
  txtDateV: yup
    .date()
    .typeError('Mui Date field must be a date')
    .required('Mui Date field is required')
})

const FormAction = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { handleSubmit, errors } = methods

  const onSubmit = data => {
    alert('data', data)
  }

  const numberData = [
    {
      id: '10',
      label: 'Ten'
    },
    {
      id: '20',
      label: 'Twenty'
    },
    {
      id: '30',
      label: 'Thirty'
    }
  ]

  const radioGroupOptions = [
    {
      value: 'female',
      label: 'Female'
    },
    {
      value: 'male',
      label: 'Male'
    },
    {
      value: 'other',
      label: 'Other'
    }
  ]

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controls.FormInput
                  variant="outlined"
                  name="name"
                  label="Name"
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.FormInput
                  variant="outlined"
                  name="nameV"
                  label="Name with Validation"
                  required
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.FormSelect
                  variant="outlined"
                  name="sel"
                  label="Numbers"
                  options={numberData}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.FormSelect
                  variant="outlined"
                  name="selV"
                  label="Numbers with Validation"
                  options={numberData}
                  required
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.FormDatePicker
                  variant="outlined"
                  name="txtDate"
                  label="Mui Date"
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.FormDatePicker
                  variant="outlined"
                  name="txtDateV"
                  label="Mui Date Validation"
                  required
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.FormRadio
                  variant="outlined"
                  name="gender"
                  label="Gender"
                  options={radioGroupOptions}
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                SUBMIT
              </Button>
            </Grid>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

FormAction.propTypes = {}

export default FormAction
