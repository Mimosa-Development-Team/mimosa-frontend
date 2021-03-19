import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Controls from 'components/controls/Controls'
import getRawData from 'utils/parsing/Proxy'
import { useForm } from 'react-hook-form'
import { Button, Grid, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './style.module.scss'

const schema = yup.object().shape({
  subject: yup.string().required('* Mandatory Field'),
  details: yup.string().required('* Mandatory Field')
})

function Form(props) {
  const {
    propsData,
    profile,
    type
    // contributionAction,
    // request
  } = props

  const [status, setStatus] = useState('publish')

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category:
        propsData && propsData.question
          ? propsData.question
          : 'question',
      subject:
        propsData && propsData.subject ? propsData.subject : '',
      details:
        propsData && propsData.details ? propsData.details : '',
      parentId: null,
      parentUuid: null
    }
  })

  const submitForm = data => {
    const formFields = {
      category: type,
      subject: data.subject,
      details: data.details,
      tags: [],
      author: [],
      userId: getRawData(profile).user.id,
      status,
      version: '1.0.0',
      parentId: null,
      parentUuid: null
    }
    console.log(formFields)
    // if (request === 'new') {
    //   contributionAction(formFields)
    // } else {
    //   contributionAction(formFields, propsData.uuid)
    // }

    // reset()
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className={`${styles.form}`}
    >
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <Grid item sm={12}>
          <Link to="/" className={`${styles.typography}`}>
            <Typography variant="h6" gutterBottom>
              <ArrowBackIcon /> Back
            </Typography>
          </Link>
        </Grid>
        <Grid item sm={12}>
          <Typography variant="subtitle1" gutterBottom>
            This contribution will fall under Question
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h1" gutterBottom>
            Publish Contribution
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography
            style={{ textAlign: 'right' }}
            variant="subtitle1"
          >
            Saved as Draft Nov. 20, 2020 10:30 AM
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h3" gutterBottom>
            Hypothesis
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Controls.Input
            type="text"
            name="subject"
            label="Hypothesis: What is your answer to this question?"
            control={control}
            asterisk
            placeholder="e.g. Sud ut perspiciatis unde omnis iste natus error sit voluptatem accusantum"
            {...(errors.subject && {
              error: true,
              helperText: errors.subject.message
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Quill
            name="details"
            asterisk
            control={control}
            label="Add some details about your research question"
            placeholder="e.g. Why do you think it's and interesting question? Are there any related resources to better understand the context of the question?"
            defaultValue=""
            errors={errors}
          />
        </Grid>
        <Grid item className={`${styles.btnContainer}`} xs={12}>
          <Button
            className={`${styles.addBtn}`}
            variant="outlined"
            onClick={() => setStatus('draft')}
          >
            ADD EXPERIMENT
          </Button>
          <Button
            type="submit"
            className={`${styles.publishBtn}`}
            variant="contained"
            id="submit"
          >
            PUBLISH NOW
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Form
