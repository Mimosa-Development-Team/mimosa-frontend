/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Controls from 'components/controls/Controls'
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
import ModalDialog from 'components/Dialog/formDialog'
import capitalizeText from 'utils/parsing/capitalize'
import styles from './style.module.scss'

function Form(props) {
  const history = useHistory()
  const {
    tagsData,
    userData,
    data,
    profile,
    type,
    method,
    updateIsLoadingContribution,
    addLoadingContribution,
    addContribution,
    updateContribution,
    addErrorContribution,
    updateErrorContribution,
    addIsSuccessContribution,
    updateIsSuccessContribution,
    addedData,
    questionUuid
  } = props

  const questionSchema = yup.object().shape({
    subject: yup.string().required('* Mandatory Field'),
    details: yup.string().required('* Mandatory Field'),
    tags: yup.array().min(1, 'Must be selected').required(),
    author: yup.array().min(1, 'Must be selected').required()
  })

  const contributionSchema = yup.object().shape({
    subject: yup.string().required('* Mandatory Field'),
    details: yup.string().required('* Mandatory Field')
  })

  const [status, setStatus] = useState('publish')
  const [relatedMediaList, setRelatedMediaList] = useState([])
  const [conferenceName, setconferenceName] = useState('')
  const [presentationDate, setpresentationDate] = useState('')
  const [startTime, setstartTime] = useState('')
  const [endTime, setendTime] = useState('')
  const [mediaTitle, setmediaTitle] = useState('')
  const [mediaLink, setmediaLink] = useState('')

  useEffect(() => {
    // if (props.relatedMedia) {
    //   props.relatedMedia.map(x => {
    //     return setRelatedMediaList(prevArry => [
    //       ...prevArry,
    //       {
    //         conferenceName: x.conferenceName,
    //         presentationDate:
    //           x.conferenceDateDetails.presentationDetails,
    //         startTime: x.conferenceDateDetails.startTime,
    //         endTime: x.conferenceDateDetails.endTime,
    //         mediaTitle: x.mediaDetails.mediaTitle,
    //         mediaLink: x.mediaDetails.mediaLink
    //       }
    //     ])
    //   })
    // }
  }, [])

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(
      type === 'question' ? questionSchema : contributionSchema
    ),
    defaultValues: {
      category:
        data && data.category && method === 'update'
          ? data.category
          : '',
      subject:
        data && data.subject && method === 'update'
          ? data.subject
          : '',
      details:
        data && data.details && method === 'update'
          ? data.details
          : '',
      tags:
        data && data.tags && method === 'update'
          ? data.tags
          : [],
      author:
        data && data.author && method === 'update'
          ? data.author
          : [
              {
                id: profile.id,
                name: `${profile.firstName} ${profile.lastName}`
              }
            ],
      userId: profile.id,
      status: 'publish',
      version: '1.0.0',
      parentId: null,
      parentUuid: null
    }
  })

  const submitForm = val => {
    const formFields = {
      category: type,
      subject: val.subject,
      details: val.details,
      tags: val.tags ? val.tags : [],
      author: val.author ? val.author : [],
      userId: profile.id,
      status,
      version: '1.0.0',
      parentId:
        method === 'new'
          ? data && data.id
            ? data.id
            : 0
          : data.parentId,
      parentUuid:
        method === 'new'
          ? questionUuid
          : data && data.uuid
          ? data.uuid
          : 0,
      hypothesisStatus: '',
      relatedMedia: relatedMediaList
    }
    if (method === 'new') {
      addContribution(formFields)
    } else {
      formFields.id = data.id
      updateContribution(formFields)
    }
  }

  const setHeader = () => {
    switch (method) {
      case 'new':
        return `Creating new ${capitalizeText(type)}`
      case 'update':
        return `Updating ${capitalizeText(type)}`
      case 'delete':
        return `Delete a ${capitalizeText(type)}`
      default:
        return ''
    }
  }

  const setContent = () => {
    switch (method) {
      case 'new':
        return `Thank you for submitting new ${capitalizeText(
          type
        )} as ${capitalizeText(status)}`
      case 'update':
        return `Your request to update ${capitalizeText(
          type
        )} is submitted as ${capitalizeText(status)}.`
      case 'delete':
        return `Are you sure you want to delete the ${capitalizeText(
          type
        )} as ${capitalizeText(status)}`
      default:
        return ''
    }
  }

  const getUrl = () => {
    let url = ''
    if (type === 'question' && status === 'draft') {
      url = history.push('/contribution-form/hypothesis/new', {
        type: 'new',
        data: addedData.data,
        questionUuid: addedData.data.uuid
      })
    }

    return url
  }

  const addRelatedMedia = () => {
    setRelatedMediaList(prevArry => [
      ...prevArry,
      {
        conferenceName,
        presentationDate,
        startTime,
        endTime,
        mediaTitle,
        mediaLink
      }
    ])
    setconferenceName('')
    setpresentationDate('')
    setstartTime('')
    setendTime('')
    setmediaTitle('')
    setmediaLink('')
  }

  const updateFieldChanged = (name, index, value) => {
    const newArr = relatedMediaList.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: value }
      }
      return item
    })
    setRelatedMediaList(newArr)
  }

  return (
    <>
      <ModalDialog
        header={setHeader()}
        content={setContent()}
        loading={
          addLoadingContribution || updateIsLoadingContribution
        }
        success={
          addIsSuccessContribution || updateIsSuccessContribution
            ? `Success`
            : ''
        }
        data={addedData}
        error={
          addErrorContribution || updateErrorContribution
            ? 'An unexpected error has occured. Please try again.'
            : false
        }
        errorHeader="Error"
        onClose={() => getUrl()}
        method={method}
      />
      <form
        onSubmit={handleSubmit(submitForm)}
        className={`${styles.form}`}
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item sm={12}>
            <div
              onClick={() => history.goBack()}
              className={`${styles.typography}`}
            >
              <Typography variant="h6" gutterBottom>
                <ArrowBackIcon /> Back
              </Typography>
            </div>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h1" gutterBottom>
              {method === 'new' ? 'Add' : 'Edit'}{' '}
              {capitalizeText(type)}
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
          <Grid item sm={12}>
            <Controls.Input
              type="text"
              name="subject"
              label="In one sentence, what is your research question?"
              control={control}
              asterisk
              placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
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
              placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
              errors={errors}
            />
          </Grid>
          {type === 'question' ? (
            <>
              <Grid item sm={12}>
                <Typography variant="h1" gutterBottom>
                  Related Media
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Controls.CustomInput
                  type="text"
                  name="conferenceName"
                  label="Conference name"
                  onChange={e => {
                    setconferenceName(e.target.value)
                  }}
                  value={conferenceName}
                  placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                  {...(errors.conferenceName && {
                    error: true,
                    helperText: errors.conferenceName.message
                  })}
                />
              </Grid>
              <Grid item sm={2}>
                <Controls.CustomInput
                  type="date"
                  name="presentationDate"
                  label="Presentation Date"
                  onChange={e => {
                    setpresentationDate(e.target.value)
                  }}
                  value={presentationDate}
                  {...(errors.presentationDate && {
                    error: true,
                    helperText: errors.presentationDate.message
                  })}
                />
              </Grid>
              <Grid item sm={2}>
                <Controls.CustomInput
                  type="time"
                  name="startTime"
                  label="Start Time"
                  onChange={e => setstartTime(e.target.value)}
                  value={startTime}
                  control={control}
                  {...(errors.startTime && {
                    error: true,
                    helperText: errors.startTime.message
                  })}
                />
              </Grid>
              <Grid item sm={2}>
                <Controls.CustomInput
                  type="time"
                  name="endTime"
                  label="End Time"
                  onChange={e => setendTime(e.target.value)}
                  value={endTime}
                  control={control}
                  {...(errors.endTime && {
                    error: true,
                    helperText: errors.endTime.message
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item sm={12}>
                <Controls.CustomInput
                  type="text"
                  name="mediaTitle"
                  label="Medial Title"
                  onChange={e => setmediaTitle(e.target.value)}
                  value={mediaTitle}
                  placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                  control={control}
                  {...(errors.mediaTitle && {
                    error: true,
                    helperText: errors.mediaTitle.message
                  })}
                />
              </Grid>
              <Grid item sm={12}>
                <Controls.CustomInput
                  type="text"
                  name="mediaLink"
                  label="Medial Link"
                  onChange={e => setmediaLink(e.target.value)}
                  value={mediaLink}
                  placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
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
                  onClick={() => addRelatedMedia()}
                >
                  ADD MEDIA
                </Button>
              </Grid>
              {relatedMediaList.map((x, index) => {
                return (
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    key={index}
                  >
                    <Grid item sm={12}>
                      <Controls.CustomInput
                        type="text"
                        label="Conference name"
                        onChange={e => {
                          updateFieldChanged(
                            'conferenceName',
                            index,
                            e.target.value
                          )
                        }}
                        value={x.conferenceName}
                        placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                      />
                    </Grid>
                    <Grid item sm={2}>
                      <Controls.CustomInput
                        type="date"
                        label="Presentation Date"
                        onChange={e => {
                          updateFieldChanged(
                            'presentationDate',
                            index,
                            e.target.value
                          )
                        }}
                        value={x.presentationDate}
                      />
                    </Grid>
                    <Grid item sm={2}>
                      <Controls.CustomInput
                        type="time"
                        label="Start Time"
                        onChange={e => {
                          updateFieldChanged(
                            'startTime',
                            index,
                            e.target.value
                          )
                        }}
                        value={x.startTime}
                        control={control}
                      />
                    </Grid>
                    <Grid item sm={2}>
                      <Controls.CustomInput
                        type="time"
                        label="End Time"
                        onChange={e => {
                          updateFieldChanged(
                            'endTime',
                            index,
                            e.target.value
                          )
                        }}
                        value={x.endTime}
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item sm={12}>
                      <Controls.CustomInput
                        type="text"
                        label="Medial Title"
                        onChange={e => {
                          updateFieldChanged(
                            'mediaTitle',
                            index,
                            e.target.value
                          )
                        }}
                        value={x.mediaTitle}
                        placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <Controls.CustomInput
                        type="text"
                        name="mediaLink"
                        label="Medial Link"
                        onChange={e => {
                          updateFieldChanged(
                            'mediaLink',
                            index,
                            e.target.value
                          )
                        }}
                        value={x.mediaLink}
                        placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                      />
                    </Grid>
                  </Grid>
                )
              })}
              <Grid item xs={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={12}>
                <Controls.MultiSelect
                  control={control}
                  name="tags"
                  asterisk
                  label="Add tags to help people find your contribution"
                  placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
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
                  placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                  options={userData || []}
                  {...(errors.author && {
                    error: true,
                    helperText: errors.author.message
                  })}
                  defaultValue={[]}
                />
              </Grid>
            </>
          ) : null}
          <Grid
            item
            className={`${styles.btnContainer}`}
            xs={12}
          >
            {method === 'new' ? (
              type !== 'analysis' ? (
                <Button
                  className={`${styles.addBtn}`}
                  variant="outlined"
                  onClick={() => setStatus('draft')}
                  type="submit"
                >
                  ADD {type === 'question' ? 'Hypothesis' : ''}
                  {type === 'hypothesis' ? 'Experiment' : ''}
                  {type === 'experiment' ? 'Data' : ''}
                  {type === 'data' ? 'Analysis' : ''}
                </Button>
              ) : null
            ) : null}
            {method === 'update' ? (
              <Button
                className={`${styles.deleteBtn}`}
                variant="outlined"
                onClick={() => setStatus('draft')}
                type="submit"
              >
                DELETE
              </Button>
            ) : null}
            <Button
              type="submit"
              className={`${styles.publishBtn}`}
              onClick={() => setStatus('publish')}
              variant="contained"
              id="submit"
            >
              {method === 'new' ? 'PUBLISH NOW' : 'UPDATE'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default Form
