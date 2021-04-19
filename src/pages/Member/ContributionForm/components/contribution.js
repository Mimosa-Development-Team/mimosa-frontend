/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Controls from 'components/controls/Controls'
import {
  useForm,
  useFieldArray,
  Controller
} from 'react-hook-form'
import moment from 'moment'
import {
  Button,
  Divider,
  Grid,
  // TextField,
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

const regexUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

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
    resetAdd,
    resetUpdate,
    addedData,
    questionUuid,
    relatedMediaData,
    deleteContribution,
    deleteIsLoadingContribution,
    deleteRelatedMediaMutate,
    // deleteErrorContribution,
    resetMediaDelete,
    deletedRelatedMedia,
    deleteIsLoadingRelatedMedia,
    deleteMutate
  } = props

  const [status, setStatus] = useState('publish')
  const [deleteForm, setDeleteForm] = useState(false)
  const [deleteMedia, setDeleteMedia] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [back, setBack] = useState(false)
  const [formData, setFormData] = useState(null)
  const [conferenceId, setConferenceId] = useState(null)
  const [deleteMediaId, setDeleteMediaId] = useState(null)
  const [mediaIndex, setMediaIndex] = useState(null)

  const questionSchema = yup.object().shape(
    {
      subject: yup.string().required('* Mandatory Field'),
      author: yup.array().min(1, 'Must be selected').required(),
      startTime: yup.string().when('conferenceName', {
        is: value => !!value,
        then: yup.string().required('* Mandatory Field')
      }),
      conferenceName: yup.string().when('startTime', {
        is: value => !!value,
        then: yup.string().required('* Mandatory Field')
      }),
      endTime: yup.string().when('conferenceName', {
        is: value => !!value,
        then: yup.string().required('* Mandatory Field')
      }),
      hypothesisStatus: yup.string().when(type, {
        is: 'analysis',
        then: yup.string().required('* Mandatory Field')
      })
    },
    ['conferenceName', 'startTime']
  )

  const contributionSchema = yup.object().shape({
    subject: yup.string().required('* Mandatory Field')
  })

  const {
    handleSubmit,
    errors,
    control,
    reset,
    setValue,
    getValues,
    // trigger
    formState
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(
      type === 'question' ? questionSchema : contributionSchema
    ),
    defaultValues: {
      relatedmedia: [{ title: '', link: '' }],
      category:
        data && data.category && method === 'update'
          ? data.draft && data.draft.id
            ? data.draft.category
            : data.category
          : '',
      subject:
        data && data.subject && method === 'update'
          ? data.draft && data.draft.id
            ? data.draft.subject
            : data.subject
          : '',
      details:
        data && data.details && method === 'update'
          ? data.draft && data.draft.id
            ? data.draft.details
            : data.details
          : '',
      tags:
        data && data.tags && method === 'update'
          ? data.draft && data.draft.id
            ? data.draft.tags
            : data.tags
          : [],
      author:
        data && data.author && method === 'update'
          ? data.draft && data.draft.id
            ? data.draft.author
            : data.author
          : [
              {
                id: profile.id,
                name: `${profile.firstName} ${profile.lastName}`,
                userColor: profile.userColor
              }
            ],
      userId: profile.id,
      status: 'publish',
      conferenceId: conferenceId || null,
      version: '1.0.0',
      parentId: null,
      parentUuid: null
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'relatedmedia',
    defaultValue: {}
  })

  useEffect(() => {
    if (relatedMediaData) {
      const media = []
      for (let i = 0; i < relatedMediaData.length; i++) {
        if (relatedMediaData[i].conferenceName) {
          setValue(
            'conferenceName',
            relatedMediaData[i].conferenceName
          )
          setValue(
            'endTime',
            moment(relatedMediaData[i].endTime, 'HH:mm').format(
              'HH:mm'
            )
          )
          setValue(
            'presentationDetails',
            moment(
              relatedMediaData[i].presentationDetails
            ).format('YYYY-MM-DD')
          )
          setConferenceId(relatedMediaData[i].id)
          setValue(
            'startTime',
            moment(
              relatedMediaData[i].startTime,
              'HH:mm'
            ).format('HH:mm')
          )
        } else if (relatedMediaData[i].link) {
          media.push({
            id: relatedMediaData[i].id,
            link: relatedMediaData[i].link,
            title: relatedMediaData[i].title
          })
        }
      }
      reset({ ...getValues(), relatedmedia: media })
    }
  }, [relatedMediaData, setValue, reset, getValues])

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
        data && data.parentQuestionId
          ? data.parentQuestionId
          : questionUuid || 0,
      hypothesisStatus: val.hypothesisStatus,
      relatedMedia: [],
      conferenceDetails: null
    }

    if (
      val.conferenceName &&
      val.presentationDetails &&
      val.startTime &&
      val.endTime &&
      method === 'new'
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

    if (
      val.conferenceName &&
      val.presentationDetails &&
      val.startTime &&
      val.endTime &&
      method === 'update'
    ) {
      formFields.relatedMedia.push({
        conferenceName: val.conferenceName,
        conferenceDateDetails: {
          presentationDetails: val.presentationDetails,
          startTime: val.startTime,
          endTime: val.endTime
        },
        id: conferenceId,
        mediaDetails: null,
        userId: profile.id
      })
    }

    if (status === 'draft') {
      if (data && data.draft && data.draft.id) {
        formFields.contributionId = data.draft.contributionId
      }
    }

    if (val.relatedmedia) {
      for (let i = 0; i < val.relatedmedia.length; i++) {
        if (
          (val.relatedmedia[i].link ||
            val.relatedmedia[i].title) &&
          !regexUuid.test(val.relatedmedia[i].id)
        ) {
          formFields.relatedMedia.push(val.relatedmedia[i])
        } else if (
          val.relatedmedia[i].link ||
          val.relatedmedia[i].title
        ) {
          formFields.relatedMedia.push({
            title: val.relatedmedia[i].title,
            link: val.relatedmedia[i].link
          })
        }
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

    if (status === 'draft') {
      switch (type) {
        case 'question':
          url = history.push(
            '/contribution-form/hypothesis/new',
            {
              type: 'new',
              data: addedData.data,
              questionUuid: addedData.data.uuid
            }
          )
          break
        case 'hypothesis':
          url = history.push(
            '/contribution-form/experiment/new',
            {
              type: 'new',
              data: addedData.data,
              questionUuid
            }
          )
          break
        case 'experiment':
          url = history.push('/contribution-form/data/new', {
            type: 'new',
            data: addedData.data,
            questionUuid
          })
          break
        case 'data':
          url = history.push('/contribution-form/analysis/new', {
            type: 'new',
            data: addedData.data,
            questionUuid
          })
          break
        default:
          url = history.goBack()
      }
    } else if (status === 'publish') {
      switch (type) {
        case 'question':
          url = history.push(`/`)
          break
        case 'hypothesis':
          url = history.push(`/contribution/${questionUuid}`)
          break
        case 'experiment':
          url = history.push(`/contribution/${questionUuid}`)
          break
        case 'data':
          url = history.push(`/contribution/${questionUuid}`)
          break
        default:
          url = history.push(`/contribution/${questionUuid}`)
      }
    } else if (back) {
      if (data || addedData) {
        url = history.push(
          `/contribution/${questionUuid || addedData.data.uuid}`
        )
      } else {
        url = history.push('/')
      }
    }

    return url
  }

  const getSubjectLabel = val => {
    switch (val) {
      case 'question':
        return 'In one sentence, what is your research question?'
      case 'hypothesis':
        return 'Hypothesis: What is your answer to this question?'
      case 'experiment':
        return 'What is this experiment testing?'
      case 'data':
        return 'What is this dataset about?'
      case 'analysis':
        return 'In one sentence, what is the conclusion fo your analysis? '
      default:
        return null
    }
  }

  const getDetailsLabel = val => {
    switch (val) {
      case 'question':
        return 'Add some details about your research question'
      case 'hypothesis':
        return 'Add some details to your reasoning'
      case 'experiment':
        return 'Experimental Protocol: describe how to perform this experiment'
      case 'data':
        return 'Describe your data'
      case 'analysis':
        return 'Add some details to your reasoning'
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
            ? `Are you sure you want to ${status} this ${capitalizeText(
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
        setModal={setOpenForm}
        data={formData}
        onReset={reset}
        reset={method === 'new' ? resetAdd : resetUpdate}
        submitError={
          method === 'new'
            ? addErrorContribution
            : updateErrorContribution
        }
        url={() => getUrl()}
        status={status}
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
                `/contribution/${
                  data.parentQuestionId || questionUuid
                }`
              )
        }}
        id={data ? data.id : null}
        deleteForm={deleteForm}
        setDeleteForm={setDeleteForm}
        subContent="This will delete all child contributions attached to this question."
      />
      <ModalDelete
        header="Delete Related Media"
        content="Are you sure you want to delete this Related Media?"
        deleteItem={deletedRelatedMedia}
        deleteIsLoadingContribution={deleteIsLoadingRelatedMedia}
        deleteMutate={deleteRelatedMediaMutate}
        url={() => {
          remove(mediaIndex)
          resetMediaDelete()
        }}
        id={deleteMediaId}
        setDeleteForm={setDeleteMedia}
        deleteForm={deleteMedia}
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
          <Grid item xs={12} sm={12}>
            {formState.isDirty ? (
              <button
                onClick={() => {
                  setStatus('draft')
                  setBack(true)
                }}
                type="submit"
                className={`${styles.btnBack}`}
              >
                <div className={`${styles.backNav}`}>
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
              </button>
            ) : (
              <div
                onClick={() => {
                  if (
                    (data && data.parentQuestionId) ||
                    questionUuid
                  ) {
                    history.push(
                      `/contribution/${
                        data.parentQuestionId || questionUuid
                      }`
                    )
                  } else {
                    history.goBack()
                  }
                }}
                className={`${styles.btnBack}`}
              >
                <div className={`${styles.backNav}`}>
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
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h1" gutterBottom>
              {method === 'new' ? 'Add' : 'Edit'}{' '}
              {capitalizeText(type)}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            {data && data.status === 'draft' && (
              <Typography
                className={`${styles.draftText}`}
                variant="subtitle1"
              >
                Saved as Draft{' '}
                {moment(new Date(data.updatedAt)).format('lll')}
              </Typography>
            )}
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
                  name="presentationDetails"
                  label="Presentation Date"
                  control={control}
                  {...(errors.presentationDetails && {
                    error: true,
                    helperText:
                      errors.presentationDetails.message
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
              {fields.map((item, index) => {
                return (
                  <div key={item.id} style={{ width: '100%' }}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      style={{ padding: '.9em' }}
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <div className={`${styles.list}`}>
                        <Typography
                          className={`${styles.typography}`}
                          align="right"
                          style={{
                            cursor: 'pointer',
                            float: 'right'
                          }}
                          onClick={() => {
                            if (!regexUuid.test(item.id)) {
                              setDeleteMedia(true)
                              setDeleteMediaId(item.id)
                              setMediaIndex(index)
                            } else {
                              remove(index)
                            }
                          }}
                        >
                          <img
                            src={DeleteIcon}
                            className={`${styles.deleteIcon}`}
                          />
                          Remove Media
                        </Typography>
                      </div>
                      <Grid item sm={12}>
                        <Controller
                          as={
                            <Controls.CustomArrayInput
                              style={{ display: 'none' }}
                            />
                          }
                          name={`relatedmedia[${index}].id`}
                          control={control}
                          defaultValue={item.id} // make sure to set up defaultValue
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <Controller
                          as={<Controls.CustomArrayInput />}
                          label="Media Title"
                          name={`relatedmedia[${index}].title`}
                          control={control}
                          {...(errors.endTime && {
                            error: true,
                            helperText: errors.endTime.message
                          })}
                          defaultValue={item.title} // make sure to set up defaultValue
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <Controller
                          type="url"
                          label="Media Link"
                          as={<Controls.CustomArrayInput />}
                          name={`relatedmedia[${index}].link`}
                          control={control}
                          {...(errors.endTime && {
                            error: true,
                            helperText: errors.endTime.message
                          })}
                          defaultValue={item.link} // make sure to set up defaultValue
                        />
                      </Grid>
                    </Grid>
                  </div>
                )
              })}
              <Grid item xs={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="btn secondary padding-lr25"
                  variant="outlined"
                  onClick={() => {
                    append({
                      title: '',
                      link: ''
                    })
                  }}
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
                {...(errors.hypothesisStatus && {
                  error: true,
                  helperText: errors.hypothesisStatus.message
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
                  className="btn secondary submitBtn mr-30 mb-15m"
                  variant="outlined"
                  onClick={() => {
                    setStatus('draft')
                  }}
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
                className="btn delete submitBtn mr-30 mb-15m"
                variant="outlined"
                onClick={() => {
                  setDeleteForm(true)
                }}
              >
                DELETE
              </Button>
            ) : null}
            {(profile.role === 'admin' &&
              data &&
              data.userId === profile.id) ||
            (profile.role !== 'admin' &&
              data &&
              data.userId === profile.id) ||
            (data && data.userId === profile.id) ||
            method === 'new' ? (
              <Button
                type="submit"
                className="btn primary submitBtn"
                variant="contained"
                // disabled={}
                onClick={() => {
                  setStatus('publish')
                }}
              >
                {method === 'new' ? 'PUBLISH NOW' : 'UPDATE'}
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default Form
