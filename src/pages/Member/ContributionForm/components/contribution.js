/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react'
import Controls from 'components/controls/Controls'
import { useHistory } from 'react-router-dom'
import { Formik, FieldArray, Form } from 'formik'
import {
  Button,
  Grid,
  Typography,
  Divider
} from '@material-ui/core'
import * as yup from 'yup'
import ModalDialog from 'components/Dialog/dialog'
import ModalDelete from 'components/Dialog/delete'
import moment from 'moment'
import FormikErrorFocus from 'formik-error-focus'
import BackIcon from 'assets/images/icons/back.svg'
import capitalizeText from 'utils/parsing/capitalize'
import DeleteIcon from 'assets/images/icons/delete.svg'
import ContributionHeader from './contribution-header'
import styles from './style.module.scss'

const schema = yup.object().shape(
  {
    relatedmedia: yup.array().of(
      yup.object().shape(
        {
          title: yup.string().when('link', {
            is: value => !!value,
            then: yup.string().required('* Mandatory Field')
          }),
          link: yup.string().when('title', {
            is: value => !!value,
            then: yup
              .string()
              .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
              )
              .required('* Mandatory')
          })
        },
        ['title', 'link']
      )
    ), // these constraints are shown if and only if inner constraints are satisfied
    subject: yup.string().required('* Mandatory Field'),
    author: yup
      .array()
      .min(1, '* Mandatory Field')
      .required('* Mandatory Field'),
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
    })
  },
  ['conferenceName', 'startTime']
)

function ContributionForm({
  tagsData,
  userData,
  profile,
  data,
  method,
  type,
  relatedMediaData,
  addContribution,
  updateContribution,
  questionUuid,
  addLoadingContribution,
  updateIsLoadingContribution,
  addIsSuccessContribution,
  updateIsSuccessContribution,
  resetUpdate,
  resetAdd,
  addErrorContribution,
  updateErrorContribution,
  addedData,
  deleteContribution,
  deleteIsLoadingContribution,
  deleteMutate,
  deletedRelatedMedia,
  deleteIsLoadingRelatedMedia,
  deleteRelatedMediaMutate,
  resetMediaDelete
}) {
  const history = useHistory()
  const formikRef = useRef()

  const [conference, setConference] = useState({
    conferenceName: '',
    presentationDetails: '',
    startTime: '',
    endTime: '',
    id: ''
  })

  const [rMedia, setRmedia] = useState([{ title: '', link: '' }])
  const [openForm, setOpenForm] = useState(false)
  const [openDraft, setOpenDraft] = useState(false)
  const [formData, setFormData] = useState(false)
  const [deleteForm, setDeleteForm] = useState(false)
  const [back, setBack] = useState(false)
  const [add, setAdd] = useState(false)
  const [deleteMediaId, setDeleteMediaId] = useState(null)
  const [deleteMedia, setDeleteMedia] = useState(false)

  useEffect(() => {
    if (relatedMediaData) {
      setRmedia([])

      for (let i = 0; i < relatedMediaData.length; i++) {
        if (relatedMediaData[i].conferenceName) {
          setConference({
            conferenceName: relatedMediaData[i].conferenceName,
            presentationDetails: moment(
              relatedMediaData[i].presentationDetails
            ).format('YYYY-MM-DD'),
            startTime: moment(
              relatedMediaData[i].startTime,
              'HH:mm'
            ).format('HH:mm'),
            endTime: moment(
              relatedMediaData[i].endTime,
              'HH:mm'
            ).format('HH:mm'),
            id: relatedMediaData[i].id
          })
        } else if (relatedMediaData[i].link) {
          setRmedia(oldArray => [
            ...oldArray,
            {
              id: relatedMediaData[i].id,
              link: relatedMediaData[i].link,
              title: relatedMediaData[i].title
            }
          ])
        }
      }
    }
  }, [relatedMediaData])

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

  const getUrl = status => {
    let url = ''
    if (status === 'draft' && !back && add) {
      switch (type) {
        case 'question':
          url = addedData
            ? history.push('/contribution-form/hypothesis/new', {
                type: 'new',
                data: addedData.data,
                questionUuid: addedData.data.uuid
              })
            : history.push(
                (addedData &&
                  `/contribution/${addedData.data.uuid}`) ||
                  (questionUuid &&
                    `/contribution/${questionUuid}`) ||
                  '/'
              )
          break
        case 'hypothesis':
          url = addedData
            ? history.push('/contribution-form/experiment/new', {
                type: 'new',
                data: addedData.data,
                questionUuid
              })
            : history.push(
                (addedData &&
                  `/contribution/${addedData.data.uuid}`) ||
                  (questionUuid &&
                    `/contribution/${questionUuid}`) ||
                  '/'
              )
          break
        case 'experiment':
          url = addedData
            ? history.push('/contribution-form/data/new', {
                type: 'new',
                data: addedData.data,
                questionUuid
              })
            : history.push(
                (addedData &&
                  `/contribution/${addedData.data.uuid}`) ||
                  (questionUuid &&
                    `/contribution/${questionUuid}`) ||
                  '/'
              )
          break
        case 'data':
          url = addedData
            ? history.push('/contribution-form/analysis/new', {
                type: 'new',
                data: addedData.data,
                questionUuid
              })
            : history.push(
                (addedData &&
                  `/contribution/${addedData.data.uuid}`) ||
                  (questionUuid &&
                    `/contribution/${questionUuid}`) ||
                  '/'
              )
          break
        default:
          url = history.goBack()
      }
    } else if (status === 'draft' && !back && !add) {
      setOpenForm(!openForm)
      setAdd(false)
    } else if (status === 'publish') {
      switch (type) {
        case 'question':
          url = history.goBack()
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

  const submitForm = (val, stat) => {
    const formFields = {
      category: type,
      subject: val.subject,
      details: val.details,
      tags: val.tags ? val.tags : [],
      author: val.author ? val.author : [],
      userId: profile.id,
      status: stat,
      version: '1.0.0',
      parentId:
        method === 'new'
          ? data && data.id
            ? data.id
            : 0
          : data.parentId,
      parentUuid:
        data && data.parentQuestionUuid
          ? data.parentQuestionUuid
          : questionUuid || 0,
      parentQuestionUuid:
        data && data.parentQuestionUuid
          ? data.parentQuestionUuid
          : questionUuid || 0,
      hypothesisStatus: val.hypothesisStatus,
      relatedMedia: [],
      conferenceDetails: null,
      method
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
        id: conference ? conference.id : null,
        mediaDetails: null,
        userId: profile.id
      })
    }

    if (val.status === 'draft') {
      if (data && data.draft && data.draft.id) {
        formFields.contributionId = data.draft.contributionId
      }
    }

    if (val.relatedmedia.length > 0) {
      for (let z = 0; z < val.relatedmedia.length; z++) {
        if (
          val.relatedmedia[z].title &&
          val.relatedmedia[z].link
        ) {
          formFields.relatedMedia.push(val.relatedmedia[z])
        }
      }
    }

    if (data) {
      formFields.id = data.id
    }

    // if (method === 'low') {
    setFormData(formFields)
    if (formFields.status === 'draft') {
      setOpenDraft(true)
    } else {
      setOpenForm(true)
    }

    // }
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
            ? `Are you sure you want to ${
                formData.status
              } this ${capitalizeText(type)}?`
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
        reset={method === 'new' ? resetAdd : resetUpdate}
        submitError={
          method === 'new'
            ? addErrorContribution
            : updateErrorContribution
        }
        url={() => {
          getUrl(formData.status)
        }}
        status={formData.status}
      />
      <ModalDialog
        type={capitalizeText(type)}
        header="Draft Contribution"
        content={`Are you sure you want to ${
          formData.status
        } this ${capitalizeText(type)}?`}
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
        modal={openDraft}
        setModal={setOpenDraft}
        data={formData}
        reset={method === 'new' ? resetAdd : resetUpdate}
        submitError={
          method === 'new'
            ? addErrorContribution
            : updateErrorContribution
        }
        url={() => {
          getUrl(formData.status)
          formikRef.current.setFieldValue('subject', '')
          formikRef.current.setFieldValue('details', '')
        }}
        status={formData.status}
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
          resetMediaDelete()
        }}
        id={deleteMediaId}
        setDeleteForm={setDeleteMedia}
        deleteForm={deleteMedia}
      />
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={{
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
          conferenceId: (conference && conference.id) || null,
          version: '1.0.0',
          parentId: null,
          parentUuid: null,
          relatedmedia: rMedia,
          hypothesisStatus: 'supports',
          conferenceName:
            (conference && conference.conferenceName) || '',
          presentationDetails:
            (conference && conference.presentationDetails) || '',
          startTime: (conference && conference.startTime) || '',
          endTime: (conference && conference.endTime) || ''
        }}
        defaultValue={{
          author: [
            userData &&
              userData.map(x => {
                return x.id === profile.id
              })
          ]
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          submitForm(values, values.status)
          setTimeout(() => {
            setSubmitting(false)
          }, 400)
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          dirty
        }) => (
          <Form
            onSubmit={handleSubmit}
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
                <div className={`${styles.btnBack}`}>
                  <div className={`${styles.backNav}`}>
                    <Typography
                      className={`${styles.back}`}
                      variant="h4"
                      onClick={() => {
                        if (dirty) {
                          setBack(true)
                          submitForm(values, 'draft')
                        } else {
                          questionUuid
                            ? history.push(
                                `/contribution/${questionUuid}`
                              )
                            : history.push('/')
                        }
                      }}
                    >
                      <span className={`${styles.icon}`}>
                        <img src={BackIcon} alt="back" />
                      </span>{' '}
                      Back
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h1" gutterBottom>
                  {method === 'new' ? 'Add' : 'Edit'}{' '}
                  {capitalizeText(type)}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                {data && data.draft === 'draft' && (
                  <Typography
                    className={`${styles.draftText}`}
                    variant="subtitle1"
                  >
                    Saved as Draft{' '}
                    {moment(new Date(data.updatedAt)).format(
                      'lll'
                    )}
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
                  label={getSubjectLabel(type)}
                  name="subject"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subject}
                  {...(errors &&
                    errors.subject && {
                      error: true,
                      helperText: errors.subject
                    })}
                />
              </Grid>
              <Grid item xs={12}>
                <Controls.Quill
                  label={getDetailsLabel(type)}
                  name="details"
                  onChange={v => setFieldValue('details', v)}
                  value={values.details}
                />
              </Grid>
              {type === 'question' && (
                <>
                  <Grid item sm={12}>
                    <Typography variant="h1" gutterBottom>
                      Upcoming Conference
                    </Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Controls.Input
                      type="text"
                      label="Conference Name"
                      name="conferenceName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.conferenceName}
                      {...(errors &&
                        errors.conferenceName && {
                          error: true,
                          helperText: errors.conferenceName
                        })}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <Controls.Input
                      type="date"
                      label="Presentation Details"
                      name="presentationDetails"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.presentationDetails}
                      {...(errors &&
                        errors.presentationDetails && {
                          error: true,
                          helperText: errors.presentationDetails
                        })}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <Controls.Input
                      type="time"
                      label="Start Time"
                      name="startTime"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.startTime}
                      {...(errors &&
                        errors.startTime && {
                          error: true,
                          helperText: errors.startTime
                        })}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <Controls.Input
                      type="time"
                      label="End Time"
                      name="endTime"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.endTime}
                      {...(errors &&
                        errors.endTime && {
                          error: true,
                          helperText: errors.endTime
                        })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>
                  <Typography
                    className="ml-10"
                    variant="h1"
                    gutterBottom
                  >
                    Add Related Media
                  </Typography>
                  <div style={{ width: '100%' }}>
                    <FieldArray
                      name="relatedmedia"
                      render={arrayHelpers => (
                        <div>
                          {values.relatedmedia.length > 0 &&
                            values.relatedmedia.map(
                              (value, index) => (
                                <Grid
                                  key={index}
                                  container
                                  direction="row"
                                  justify="flex-start"
                                  style={{ padding: '.9em' }}
                                  alignItems="flex-start"
                                  spacing={2}
                                >
                                  <div
                                    className={`${styles.list}`}
                                    style={{ width: '100%' }}
                                  >
                                    <Typography
                                      className={`${styles.typography}`}
                                      align="right"
                                      style={{
                                        cursor: 'pointer',
                                        float: 'right',
                                        color: '#e84441'
                                      }}
                                      onClick={() => {
                                        if (value.id) {
                                          setDeleteMedia(true)
                                          setDeleteMediaId(
                                            value.id
                                          )
                                        } else {
                                          arrayHelpers.remove(
                                            index
                                          )
                                        }
                                      }}
                                    >
                                      <img
                                        src={DeleteIcon}
                                        className={`${styles.deleteIcon}`}
                                      />{' '}
                                      Remove Media
                                    </Typography>
                                  </div>
                                  <Grid item sm={12}>
                                    <Controls.Input
                                      name={`relatedmedia[${index}].title`}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      label="Media Title"
                                      value={value.title}
                                      {...(errors &&
                                        errors.relatedmedia &&
                                        errors.relatedmedia[
                                          index
                                        ] &&
                                        errors.relatedmedia[
                                          index
                                        ].title && {
                                          error: true,
                                          helperText:
                                            errors.relatedmedia[
                                              index
                                            ].title
                                        })}
                                    />
                                  </Grid>
                                  <Grid item sm={12}>
                                    <Controls.Input
                                      name={`relatedmedia.${index}.link`}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      label="Media Link"
                                      value={value.link}
                                      {...(errors &&
                                        errors.relatedmedia &&
                                        errors.relatedmedia[
                                          index
                                        ] &&
                                        errors.relatedmedia[
                                          index
                                        ].link && {
                                          error: true,
                                          helperText:
                                            errors.relatedmedia[
                                              index
                                            ].link
                                        })}
                                    />
                                  </Grid>
                                </Grid>
                              )
                            )}
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            style={{ padding: '.9em' }}
                            alignItems="flex-start"
                            spacing={2}
                          >
                            <Grid item xs={12}>
                              <Divider variant="middle" />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                className="btn secondary padding-lr25"
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.push({
                                    title: '',
                                    link: ''
                                  })
                                }}
                              >
                                ADD MEDIA
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      )}
                    />
                  </div>
                  <Grid item xs={12}>
                    <Controls.MultiSelect
                      onChange={(e, options) => {
                        const arr = options.map(val => {
                          return val
                        })
                        setFieldValue('tags', arr)
                      }}
                      name="tags"
                      label="Add tags to help people find your contribution"
                      placeholder="Press Enter to add tag"
                      options={tagsData || []}
                      {...(errors.tags && {
                        error: true,
                        helperText: errors.tags.message
                      })}
                      defaultValue={values.tags}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controls.MultiSelect
                      onChange={(e, options) => {
                        const arr = options.map(val => {
                          const obj = {}
                          if (values.name) {
                            return val
                          }
                          obj.name = val

                          return obj
                        })
                        setFieldValue('author', arr)
                      }}
                      name="author"
                      asterisk
                      label="Authors"
                      placeholder="Press Enter to add author"
                      options={userData || []}
                      {...(errors.author && {
                        error: true,
                        helperText: errors.author.message
                      })}
                      defaultValue={values.author}
                    />
                  </Grid>
                </>
              )}
              {type === 'analysis' ? (
                <Grid item sm={12}>
                  <Controls.RadioControl
                    name="hypothesisStatus"
                    label="What is the verdict of your analysis?"
                    asterisk
                    onChange={e => {
                      setFieldValue(
                        'hypothesisStatus',
                        e.target.value
                      )
                    }}
                    value={values.hypothesisStatus}
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
                        setFieldValue('status', 'draft')
                        setAdd(true)
                      }}
                      type="submit"
                    >
                      ADD{' '}
                      {type === 'question' ? 'Hypothesis' : ''}
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
                      setFieldValue('status', 'publish')
                    }}
                  >
                    {method === 'new' ? 'PUBLISH NOW' : 'UPDATE'}
                  </Button>
                ) : null}
              </Grid>
            </Grid>
            <FormikErrorFocus
              // See scroll-to-element for configuration options: https://www.npmjs.com/package/scroll-to-element
              offset={0}
              align="top"
              focusDelay={200}
              ease="linear"
              duration={1000}
            />
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ContributionForm
