import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Controls from 'components/controls/Controls'
import getRawData from 'utils/parsing/Proxy'
import { useForm } from 'react-hook-form'
import {
  Button,
  Divider,
  Grid,
  Typography
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './style.module.scss'

const schema = yup.object().shape({
  subject: yup.string().required('* Mandatory Field'),
  details: yup.string().required('* Mandatory Field'),
  author: yup.array().min(1, 'Must be selected').required()
})

function Form(props) {
  const {
    tagsData,
    userData,
    propsData,
    profile
    // contributionAction
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
      tags: propsData && propsData.tags ? propsData.tags : [],
      author:
        propsData && propsData.author
          ? propsData.author
          : [
              {
                id: getRawData(profile).user.id,
                name: `${getRawData(profile).user.firstName} ${
                  getRawData(profile).user.lastName
                }`
              }
            ],
      userId:
        propsData && propsData.userId ? propsData.userId : null,
      status:
        propsData && propsData.status
          ? propsData.status
          : 'publish',
      version: '1.0.0',
      parentId: null,
      parentUuid: null
    }
  })

  const submitForm = data => {
    const formFields = {
      category: '',
      subject: data.subject,
      details: data.details,
      tags: data.tags,
      author: data.author,
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
        <Grid item sm={6}>
          <Typography variant="h1" gutterBottom>
            Add Question
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
        <Grid item sm={12}>
          <Controls.Input
            type="text"
            name="subject"
            label="In one sentence, what is your research question?"
            defaultValue=""
            control={control}
            asterisk
            placeholder="e.g. Can an algorithm distinguish living organisms from non-living this?"
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
        <Grid item sm={12}>
          <Typography variant="h1" gutterBottom>
            Related Media
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Controls.Input
            type="text"
            name="conferenceName"
            label="Conference name"
            defaultValue=""
            control={control}
            placeholder="Conference title"
            {...(errors.conferenceName && {
              error: true,
              helperText: errors.conferenceName.message
            })}
          />
        </Grid>
        <Grid item sm={3}>
          <Controls.Input
            type="date"
            name="presentationDate"
            label="Presentation Date"
            defaultValue=""
            control={control}
            {...(errors.presentationDate && {
              error: true,
              helperText: errors.presentationDate.message
            })}
          />
        </Grid>
        <Grid item sm={3}>
          <Controls.Input
            type="time"
            name="startTime"
            label="Start Time"
            defaultValue=""
            control={control}
            {...(errors.startTime && {
              error: true,
              helperText: errors.startTime.message
            })}
          />
        </Grid>
        <Grid item sm={3}>
          <Controls.Input
            type="time"
            name="endTime"
            label="End Time"
            defaultValue=""
            control={control}
            {...(errors.endTime && {
              error: true,
              helperText: errors.endTime.message
            })}
          />
        </Grid>
        <Grid item sm={3}>
          <Controls.Input
            type="text"
            name="mediaTitle"
            label="Medial Title"
            placeholder="Files Title"
            defaultValue=""
            control={control}
            {...(errors.mediaTitle && {
              error: true,
              helperText: errors.mediaTitle.message
            })}
          />
        </Grid>
        <Grid item sm={3}>
          <Controls.Input
            type="text"
            name="mediaLink"
            label="Medial Link"
            placeholder="e.g. Link to video presentation or conference paper"
            defaultValue=""
            control={control}
            {...(errors.mediaLink && {
              error: true,
              helperText: errors.mediaLink.message
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={`${styles.addMedia}`}
            variant="outlined"
          >
            ADD MEDIA
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12}>
          <Controls.MultiSelect
            control={control}
            name="tags"
            asterisk
            label="Add tags to help people find your contribution"
            placeholder="Add tag"
            options={tagsData || []}
            {...(errors.tags && {
              error: true,
              helperText: errors.tags.message
            })}
            defaultValue={[]}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.MultiSelect
            control={control}
            name="author"
            asterisk
            label="Authors"
            placeholder="Add Author"
            options={userData || []}
            {...(errors.author && {
              error: true,
              helperText: errors.author.message
            })}
            defaultValue={[]}
          />
        </Grid>
        <Grid item className={`${styles.btnContainer}`} xs={12}>
          <Button
            className={`${styles.addBtn}`}
            variant="outlined"
            onClick={() => setStatus('draft')}
          >
            ADD HYPOTHESIS
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
