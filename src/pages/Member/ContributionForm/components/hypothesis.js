import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Controls from 'components/controls/Controls'
import { useForm } from 'react-hook-form'
import {
  Button,
  Grid,
  Typography,
  Paper
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DialogNotification from './dialog'
import styles from './style.module.scss'

const schema = yup.object().shape({
  subject: yup.string().required('* Mandatory Field'),
  details: yup.string().required('* Mandatory Field')
})

function Form(props) {
  const {
    data,
    profile,
    type,
    method,
    updateIsLoadingContribution,
    addLoadingContribution,
    addContribution,
    updateContribution
  } = props

  const [status, setStatus] = useState('publish')
  const { handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: '',
      subject: method === 'new' ? '' : data.subject,
      details: method === 'new' ? '' : data.details,
      userId: null,
      status: 'publish',
      version: '1.0.0'
    }
  })

  const submitForm = val => {
    const formFields = {
      category: type,
      subject: val.subject,
      details: val.details,
      tags: [],
      author: [
        {
          name: `${profile.firstName} ${profile.lastName}`,
          id: profile.uuid
        }
      ],
      userId: profile.id,
      status,
      version: '1.0.0',
      parentId: method === 'new' ? data.id : data.parentId,
      parentUuid: method === 'new' ? data.uuid : data.parentUuid,
      hypothesisStatus: ''
    }
    if (method === 'new') {
      addContribution(formFields)
    } else {
      formFields.id = data.id
      updateContribution(formFields)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className={`${styles.form}`}
    >
      <DialogNotification
        updateIsLoadingContribution={updateIsLoadingContribution}
        addLoadingContribution={addLoadingContribution}
        reset={reset}
      />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <Grid item sm={12}>
          <Link
            to="/contribution"
            className={`${styles.typography}`}
          >
            <Typography variant="h6" gutterBottom>
              <ArrowBackIcon /> Back
            </Typography>
          </Link>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h1" gutterBottom>
            {method === 'new' ? 'Publish' : 'Update'}{' '}
            Contribution
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography
            style={{ textAlign: 'right' }}
            variant="subtitle1"
          >
            {/* // Saved as Draft Nov. 20, 2020 10:30 AM */}
          </Typography>
        </Grid>
        {method === 'new' ? (
          <Grid item sm={12}>
            <Typography variant="subtitle1" gutterBottom>
              This contribution will fall under Question
            </Typography>
            <Paper
              style={{
                paddingLeft: '10px',
                paddingTop: '10px',
                paddingBottom: '10px'
              }}
            >
              <span style={{ color: '#F8DA88' }}>Question</span>:
              {data.subject}
            </Paper>
          </Grid>
        ) : null}
        <Grid item sm={6}>
          <Typography
            style={{ color: '#EC8A2A', fontWeight: 'bold' }}
            variant="h3"
            gutterBottom
          >
            Hypothesis
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Controls.Input
            type="text"
            name="subject"
            label="What is your answer to this question?"
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
            label="Add some details to your reasoning"
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
            {method === 'new' ? 'PUBLISH NOW' : 'UPDATE'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Form
