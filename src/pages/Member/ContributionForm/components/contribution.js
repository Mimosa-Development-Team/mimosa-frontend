/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Controls from 'components/controls/Controls'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import {
  Button,
  Divider,
  Grid,
  Typography,
  Card,
  CardContent
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ModalDialog from 'components/Dialog/dialog'
import ModalDelete from 'components/Dialog/delete'
import capitalizeText from 'utils/parsing/capitalize'
import ContributionHeader from './contribution-header'
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
    questionUuid,
    relatedMediaData,
    deleteContribution,
    deleteIsLoadingContribution,
    // deleteErrorContribution,
    deleteMutate
  } = props

  const [status, setStatus] = useState('publish')
  const [relatedMediaList, setRelatedMediaList] = useState([])
  const [deleteForm, setDeleteForm] = useState(false)

  useEffect(() => {
    setRelatedMediaList(relatedMediaData || [])
  }, [relatedMediaData])

  const questionSchema = yup.object().shape({
    subject: yup.string().required('* Mandatory Field'),
    details: yup.string().required('* Mandatory Field'),
    tags: yup.array().min(1, 'Must be selected').required(),
    author: yup.array().min(1, 'Must be selected').required(),
    presentationDate: yup.string().when('conferenceName', {
      is: value => !!value,
      then: yup.string().required('* Mandatory Field')
    }),
    startTime: yup.string().when('conferenceName', {
      is: value => !!value,
      then: yup.string().required('* Mandatory Field')
    }),
    endTime: yup.string().when('conferenceName', {
      is: value => !!value,
      then: yup.string().required('* Mandatory Field')
    }),
    mediaLink: yup.string().when('mediaTitle', {
      is: value => !!value,
      then: yup.string().required('* Mandatory Field')
    })
  })

  const contributionSchema = yup.object().shape({
    subject: yup.string().required('* Mandatory Field'),
    details: yup.string().required('* Mandatory Field')
  })

  const {
    handleSubmit,
    errors,
    control,
    getValues,
    setValue
  } = useForm({
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
      status: method === 'update' ? 'deprecated' : status,
      version: '1.0.0',
      parentId:
        method === 'new'
          ? data && data.id
            ? data.id
            : 0
          : data.parentId,
      parentUuid:
        data && data.parentQuestionId
          ? data.parentQuestionId
          : questionUuid || 0,
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

    if (type === 'question' && status === 'publish') {
      url = history.goBack()
    }

    if (type === 'hypothesis' && status === 'draft') {
      url = history.push('/contribution-form/experiment/new', {
        type: 'new',
        data: addedData.data,
        questionUuid
      })
    }

    if (type === 'hypothesis' && status === 'publish') {
      url = history.push(`/contribution/${questionUuid}`)
    }

    if (type === 'experiment' && status === 'draft') {
      url = history.push('/contribution-form/data/new', {
        type: 'new',
        data: addedData.data,
        questionUuid
      })
    }

    if (type === 'experiment' && status === 'publish') {
      url = history.push(`/contribution/${questionUuid}`)
    }

    if (type === 'data' && status === 'draft') {
      url = history.push('/contribution-form/analysis/new', {
        type: 'new',
        data: addedData.data,
        questionUuid
      })
    }
    if (type === 'data' && status === 'publish') {
      url = history.push(`/contribution/${questionUuid}`)
    }

    if (type === 'analysis' && status === 'publish') {
      url = history.push(`/contribution/${questionUuid}`)
    }

    return url
  }

  const addRelatedMedia = () => {
    setRelatedMediaList(prevArry => [
      ...prevArry,
      {
        conferenceName: getValues('conferenceName'),
        presentationDate: getValues('presentationDate'),
        startTime: getValues('startTime'),
        endTime: getValues('endTime'),
        mediaTitle: getValues('mediaTitle'),
        mediaLink: getValues('mediaLink')
      }
    ])
    setValue('conferenceName', '')
    setValue('presentationDate', '')
    setValue('startTime', '')
    setValue('endTime', '')
    setValue('mediaTitle', '')
    setValue('mediaLink', '')
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

  const getSubjectLabel = val => {
    switch (val) {
      case 'question':
        return 'In one sentence, what is your research question?'
      case 'hypothesis':
        return 'Hypothesis: What is your answer to this question?'
      case 'experiment':
        return 'What is experiment testing?'
      case 'data':
        return 'Data'
      case 'analysis':
        return 'Data'
      default:
        return null
    }
  }

  const getDetailsLabel = val => {
    switch (val) {
      case 'question':
        return 'Add some details about your research question'
      case 'hypothesis':
        return 'Add some details to you reasoning'
      case 'experiment':
        return 'Experimental Protocol: describe how to perform this experiment'
      case 'data':
        return 'Data'
      case 'analysis':
        return 'Data'
      default:
        return null
    }
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
      <ModalDelete
        header={`Delete a ${
          data ? capitalizeText(data.category) : ''
        }`}
        content={`Are you sure you want to delete this ${
          data ? capitalizeText(data.category) : ''
        }`}
        deleteContribution={deleteContribution}
        deleteIsLoadingContribution={deleteIsLoadingContribution}
        deleteMutate={deleteMutate}
        id={data ? data.id : null}
        deleteForm={deleteForm}
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
              {data && data.status === 'draft'
                ? moment(new Date(data.updatedAt)).format('lll')
                : null}
            </Typography>
          </Grid>
          {type !== 'question' && method === 'new' ? (
            <Grid item sm={12}>
              <ContributionHeader
                data={data}
                type={capitalizeText(type)}
              />
            </Grid>
          ) : null}
          <Grid item sm={12}>
            <Controls.Input
              type="text"
              name="subject"
              label={getSubjectLabel(type)}
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
              label={getDetailsLabel(type)}
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
                <Controls.Input
                  type="text"
                  name="conferenceName"
                  label="Conference name"
                  control={control}
                  placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                  {...(errors.conferenceName && {
                    error: true,
                    helperText: errors.conferenceName.message
                  })}
                />
              </Grid>
              <Grid item sm={2}>
                <Controls.Input
                  type="date"
                  name="presentationDate"
                  label="Presentation Date"
                  control={control}
                  {...(errors.presentationDate && {
                    error: true,
                    helperText: errors.presentationDate.message
                  })}
                />
              </Grid>
              <Grid item sm={2}>
                <Controls.Input
                  type="time"
                  name="startTime"
                  label="Start Time"
                  control={control}
                  {...(errors.startTime && {
                    error: true,
                    helperText: errors.startTime.message
                  })}
                />
              </Grid>
              <Grid item sm={2}>
                <Controls.Input
                  type="time"
                  name="endTime"
                  label="End Time"
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
                <Controls.Input
                  type="text"
                  name="mediaTitle"
                  label="Medial Title"
                  placeholder="sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
                  control={control}
                  {...(errors.mediaTitle && {
                    error: true,
                    helperText: errors.mediaTitle.message
                  })}
                />
              </Grid>
              <Grid item sm={12}>
                <Controls.Input
                  type="text"
                  name="mediaLink"
                  label="Medial Link"
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

              {relatedMediaList && relatedMediaList.length > 0
                ? relatedMediaList.map((x, index) => {
                    return (
                      <Card
                        style={{
                          width: '100%',
                          marginTop: '1em'
                        }}
                      >
                        <CardContent>
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
                        </CardContent>
                      </Card>
                    )
                  })
                : null}
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
                onClick={() => setDeleteForm(true)}
              >
                DELETE
              </Button>
            ) : null}
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
    </>
  )
}

export default Form
