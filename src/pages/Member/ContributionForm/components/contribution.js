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
  Typography
} from '@material-ui/core'
import BackIcon from 'assets/images/icons/back.svg'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ModalDialog from 'components/Dialog/dialog'
import ModalDelete from 'components/Dialog/delete'
import DeleteIcon from 'assets/images/icons/delete.svg'
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
  const [openForm, setOpenForm] = useState(false)
  const [formData, setFormData] = useState(false)

  useEffect(() => {
    setRelatedMediaList(
      relatedMediaData || [
        {
          conferenceName: '',
          presentationDate: '',
          startTime: '',
          endTime: '',
          title: '',
          link: ''
        }
      ]
    )
  }, [relatedMediaData])

  const questionSchema = yup.object().shape({
    subject: yup.string().required('* Mandatory Field'),
    author: yup.array().min(1, 'Must be selected').required()
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
    setValue,
    reset
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
      hypothesisStatus: val.hypothesisStatus,
      relatedMedia: []
    }

    if (
      val.conferenceName &&
      val.presentationDate &&
      val.startTime &&
      val.endTime
    ) {
      formFields.relatedMedia.push({
        conferenceName: val.conferenceName,
        conferenceDateDetails: {
          presentationDetails: val.presentationDetails,
          startTime: val.startTime,
          endTime: val.endTime
        },
        mediaDetails: null,
        userId: profile.id
      })
    }

    for (let i = 0; i < relatedMediaList.length; i++) {
      if (relatedMediaList[i].title) {
        formFields.relatedMedia.push(relatedMediaList[i])
      }
    }
    if (data) {
      formFields.id = data.id
    }

    setFormData(formFields)
    setOpenForm(true)
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
        conferenceName: '',
        presentationDate: '',
        startTime: '',
        endTime: '',
        title: getValues('title'),
        link: getValues('link')
      }
    ])
    setValue('title', '')
    setValue('link', '')
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
        type={capitalizeText(type)}
        header={
          method === 'new'
            ? 'Publish Contribution'
            : 'Update Contribution'
        }
        content={
          method === 'new'
            ? `Are you sure you want to publish this ${capitalizeText(
                type
              )}?`
            : `Do you want to publish changes to this ${capitalizeText(
                type
              )}?`
        }
        method={method}
        submitLoading={
          method === 'new'
            ? addLoadingContribution
            : updateIsLoadingContribution
        }
        submitSuccess={
          method === 'new'
            ? addIsSuccessContribution
            : updateIsSuccessContribution
        }
        submit={
          method === 'new' ? addContribution : updateContribution
        }
        modal={openForm}
        data={formData}
        onReset={() => reset()}
        submitError={
          method === 'new'
            ? addErrorContribution
            : updateErrorContribution
        }
        url={() => getUrl()}
      />
      <ModalDelete
        header={`Delete a ${
          data ? capitalizeText(data.category) : ''
        }`}
        content={`Are you sure you want to delete this ${
          data ? capitalizeText(data.category) : ''
        }`}
        deleteItem={deleteContribution}
        deleteIsLoadingContribution={deleteIsLoadingContribution}
        deleteMutate={deleteMutate}
        url={() => {
          return type === 'question'
            ? history.push('/')
            : history.push(
                `/contribution/${data.parentQuestionId}`
              )
        }}
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
              onClick={() => getUrl()}
              className={`${styles.backNav}`}
            >
              <Typography
                className={`${styles.back}`}
                variant="h4"
              >
                <span className={`${styles.icon}`}>
                  <img src={BackIcon} alt="back" />
                </span>
                Back
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
              {...(errors.subject && {
                error: true,
                helperText: errors.subject.message
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Quill
              name="details"
              control={control}
              label={getDetailsLabel(type)}
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
                  label="Conference Name"
                  control={control}
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
              {relatedMediaList && relatedMediaList.length > 0
                ? relatedMediaList.map((x, index) => {
                    return (
                      <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                        key={index}
                      >
                        <Grid item xs={12}>
                          <Divider variant="middle" />
                        </Grid>
                        {index > 0 ? (
                          <div className={`${styles.list}`}>
                            <Typography
                              className={`${styles.typography}`}
                              align="right"
                              onClick={() => {
                                setRelatedMediaList(list =>
                                  list.filter(
                                    (value, i) => i !== index
                                  )
                                )
                              }}
                            >
                              <img
                                src={DeleteIcon}
                                className={`${styles.deleteIcon}`}
                              />{' '}
                              Remove Media
                            </Typography>
                          </div>
                        ) : null}
                        <Grid item sm={12}>
                          <Controls.CustomInput
                            type="text"
                            label="Media Title"
                            onChange={e => {
                              updateFieldChanged(
                                'title',
                                index,
                                e.target.value
                              )
                            }}
                            value={x.title}
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <Controls.CustomInput
                            type="text"
                            name="link"
                            label="Media Link"
                            onChange={e => {
                              updateFieldChanged(
                                'link',
                                index,
                                e.target.value
                              )
                            }}
                            value={x.link}
                          />
                        </Grid>
                      </Grid>
                    )
                  })
                : null}
              <Grid item xs={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={`${styles.addMedia}`}
                  variant="outlined"
                  onClick={() => addRelatedMedia()}
                  disabled={
                    relatedMediaList.length &&
                    !relatedMediaList[
                      relatedMediaList.length - 1
                    ].title
                  }
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
                  label="Add tags to help people find your contribution"
                  placeholder="Press Enter to add tag"
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
                  placeholder="Press Enter to add author"
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
          {type === 'analysis' ? (
            <Grid item sm={12}>
              <Controls.RadioControl
                name="hypothesisStatus"
                label="What is the verdict of your analysis?"
                asterisk
                control={control}
                {...(errors.presentationDate && {
                  error: true,
                  helperText: errors.presentationDate.message
                })}
              />
            </Grid>
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
              onClick={() => setStatus('publish')}
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