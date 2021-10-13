/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Controls from 'components/controls/Controls'
import {
  Button,
  Grid,
  Typography,
  Divider
} from '@material-ui/core'
import { Formik, FieldArray, Form } from 'formik'
import FormikErrorFocus from 'formik-error-focus'
import * as yup from 'yup'
import ModalDialog from 'components/Dialog/dialog'
import DeleteIcon from 'assets/images/icons/delete.svg'
import BackIcon from 'assets/images/icons/back.svg'
import capitalizeText from 'utils/parsing/capitalize'
import moment from 'moment'
import { useQuestionForm } from '../hooks'
import ContributionHeader from './contribution-header'
import styles from './style.module.scss'

const schema = yup.object().shape({
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
              /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
              'Enter correct url!'
            )
            .required('* Mandatory')
        })
      },
      ['title', 'link']
    )
  ), // these constraints are shown if and only if inner constraints are satisfied
  subject: yup.string().required('* Mandatory Field'),
  details: yup.string().required('* Mandatory Field'),
  author: yup
    .array()
    .min(1, '* Mandatory Field')
    .required('* Mandatory Field'),
  conferenceName: yup
    .string()
    .test(
      'conferenceName',
      '** Mandatory Field',
      function (value) {
        const {
          presentationDetails,
          startTime,
          endTime
        } = this.parent
        if (
          !value &&
          (presentationDetails || startTime || endTime)
        ) {
          return false
        }
        return true
      }
    ),
  startTime: yup
    .string()
    .test('startTime', '** Mandatory Field', function (value) {
      const {
        presentationDetails,
        conferenceName,
        endTime
      } = this.parent
      if (
        !value &&
        (presentationDetails || conferenceName || endTime)
      ) {
        return false
      }
      return true
    }),
  endTime: yup
    .string()
    .test('endTime', '** Mandatory Field', function (value) {
      const {
        presentationDetails,
        conferenceName,
        startTime
      } = this.parent
      if (
        !value &&
        (presentationDetails || conferenceName || startTime)
      ) {
        return false
      }
      return true
    }),
  presentationDetails: yup
    .string()
    .test(
      'presentationDetails',
      '** Mandatory Field',
      function (value) {
        const {
          entTime,
          conferenceName,
          startTime
        } = this.parent
        if (!value && (entTime || conferenceName || startTime)) {
          return false
        }
        return true
      }
    )
})

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

function ContributionForm({
  profile,
  tagsData,
  userData,
  type,
  method,
  props
}) {
  const formikRef = useRef()
  const history = useHistory()
  const [modal, setModal] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [navigation, setNavigation] = useState(false)
  const [rMedia, setRmedia] = useState([])
  const [lastSave, setLastSave] = useState(null)
  const [data, setData] = useState(null)
  const [back, setBack] = useState(false)
  const [ids, setIds] = useState({
    id: '',
    mainParentId: '',
    parentId: ''
  })
  const [redirectUrl, setRedirectUrl] = useState(null)
  const [conference, setConference] = useState({
    conferenceName: '',
    presentationDetails: '',
    startTime: '',
    endTime: '',
    id: null
  })
  const {
    addContribution,
    addedContribution,
    updateContribution,
    updatedContribution,
    deleteRelatedMediaMutate
  } = useQuestionForm(
    method === 'update' ? props.id : data && data.id,
    redirectUrl
  )

  const scrollToErrors = errors => {
    const errorKeys = Object.keys(errors)
    if (errorKeys.length > 0) {
      errorKeys[0] === 'relatedmedia'
        ? document
            .getElementsByName('relatedmedia[0].title')[0]
            .focus()
        : errorKeys[0] === 'details'
        ? document
            .getElementsByClassName('details')[0]
            .scrollIntoView()
        : document.getElementsByName(errorKeys[0])[0].focus()
    }
  }

  const submitForm = values => {
    if (method === 'update') {
      if (!modal) {
        values.status = 'draft'
      } else {
        values.status = 'publish'
      }
    }
    if (
      (method !== 'update' && !ids.id) ||
      (values.status === 'publish' &&
        method === 'new' &&
        !modal) ||
      (values.status === 'draft' &&
        redirectUrl === 'new-contribution' &&
        method !== 'update')
    ) {
      if (props) {
        values.mainParentId =
          props.mainParentId || props.id || null
        values.parentId = props.id || null
      }
      addContribution(values)
    } else {
      values.id = props.id
      values.mainParentId = props.mainParentId
      values.parentId = props.parentId
      if (values.conferenceName && conference.id) {
        values.conferenceId = conference.id
      }
      updateContribution(values)
    }
  }

  useEffect(() => {
    if (
      props &&
      props.relatedmedia &&
      props.relatedmedia.length > 0 &&
      !updatedContribution &&
      !addedContribution
    ) {
      const tempRmedia = []
      for (let i = 0; i < props.relatedmedia.length; i++) {
        if (props.relatedmedia[i].mediaDetails) {
          tempRmedia.push({
            id: props.relatedmedia[i].id,
            title: props.relatedmedia[i].mediaDetails.title,
            link: props.relatedmedia[i].mediaDetails.link
          })
        } else {
          formikRef.current.setFieldValue(
            'conferenceName',
            props.relatedmedia[i].conferenceName
          )
          formikRef.current.setFieldValue(
            'presentationDetails',
            props.relatedmedia[i].conferenceDateDetails
              .presentationDetails
          )
          formikRef.current.setFieldValue(
            'startTime',
            props.relatedmedia[i].conferenceDateDetails.startTime
          )
          formikRef.current.setFieldValue(
            'endTime',
            props.relatedmedia[i].conferenceDateDetails.endTime
          )
          formikRef.current.setFieldValue(
            'conferenceId',
            props.relatedmedia[i].id
          )
        }
      }
      formikRef.current.setFieldValue('relatedmedia', tempRmedia)
    }
    if (updatedContribution && updatedContribution.data) {
      setIds({
        id: updatedContribution && updatedContribution.data.id,
        mainParentId:
          updatedContribution &&
          updatedContribution.data.mainParentId,
        parentId:
          updatedContribution &&
          updatedContribution.data.parentId
      })
      setLastSave(
        updatedContribution.data.updatedAt ||
          updatedContribution.data.createdAt
      )
      if (updatedContribution.relatedmedia.length > 0) {
        formikRef.current.setFieldValue(
          'relatedmedia',
          updatedContribution.relatedmedia
        )
      }
      formikRef.current.setFieldValue(
        'conferenceName',
        updatedContribution.conference.conferenceName
      )
      formikRef.current.setFieldValue(
        'presentationDetails',
        updatedContribution.conference.presentationDetails
      )
      formikRef.current.setFieldValue(
        'startTime',
        updatedContribution.conference.startTime
      )
      formikRef.current.setFieldValue(
        'endTime',
        updatedContribution.conference.endTime
      )
      formikRef.current.setFieldValue(
        'conferenceId',
        updatedContribution.conference.id
      )
    } else if (
      addedContribution &&
      addedContribution.data &&
      !(updatedContribution && updatedContribution.data)
    ) {
      setIds({
        id: addedContribution && addedContribution.data.id,
        mainParentId:
          addedContribution &&
          addedContribution.data.mainParentId,
        parentId:
          addedContribution && addedContribution.data.parentId
      })
      setLastSave(
        addedContribution.data.updatedAt ||
          addedContribution.data.createdAt
      )
      setConference(addedContribution.conference)
      if (addedContribution.conference) {
        formikRef.current.setFieldValue(
          'conferenceName',
          addedContribution.conference.conferenceName
        )
        formikRef.current.setFieldValue(
          'presentationDetails',
          addedContribution.conference.presentationDetails
        )
        formikRef.current.setFieldValue(
          'startTime',
          addedContribution.conference.startTime
        )
        formikRef.current.setFieldValue(
          'endTime',
          addedContribution.conference.endTime
        )
        formikRef.current.setFieldValue(
          'conferenceId',
          addedContribution.conference.id
        )
      }
      if (addedContribution.relatedmedia.length > 0) {
        formikRef.current.setFieldValue(
          'relatedmedia',
          addedContribution.relatedmedia
        )
      }
    }
  }, [addedContribution, updatedContribution])

  return (
    <>
      <ModalDialog
        modal={modal}
        setModal={setModal}
        submit={() => submitForm(data)}
        message={`Are you sure you want to publish this ${capitalizeText(
          (data && data.category) || ''
        )}?`}
        subcontent=""
      />
      <ModalDialog
        modal={confirmation}
        setModal={setConfirmation}
        submit={() => submitForm(data)}
        message={`${
          back
            ? `Are you sure you want to exit ${
                data && capitalizeText(data.category)
              } form?`
            : `Are you sure you want to exit ${
                data && capitalizeText(data.category)
              } and proceed to ${
                (data &&
                  data.category === 'question' &&
                  'Hypothesis') ||
                (data &&
                  data.category === 'hypothesis' &&
                  'Experiment') ||
                (data &&
                  data.category === 'experiment' &&
                  'Data') ||
                (data && data.category === 'data' && 'Analysis')
              }? ${
                data && capitalizeText(data.category)
              } is already saved as draft.`
        }`}
        subcontent=""
        proceed
      />
      <ModalDialog
        modal={navigation}
        setModal={setNavigation}
        submit={() => {
          if (redirectUrl && data) {
            if (data.category === 'question') {
              history.push(`/contribution-form/hypothesis/new`, {
                type: 'new',
                data
              })
            }
            if (data.category === 'hypothesis') {
              history.push(`/contribution-form/experiment/new`, {
                type: 'new',
                data
              })
            }
            if (data.category === 'experiment') {
              history.push(`/contribution-form/data/new`, {
                type: 'new',
                data
              })
            }
            if (data.category === 'data') {
              history.push(`/contribution-form/analysis/new`, {
                type: 'new',
                data
              })
            }
          } else if (data) {
            if (data.category === 'question') {
              history.push(
                `/contribution/${data.uuid}?list=${data.id}&from=home`
              )
            } else {
              history.push(
                `/contribution/${data.uuid}?list=${
                  data.mainParentId || data.parentId || data.id
                }&from=home`
              )
            }
          }
        }}
        message={`${
          back
            ? `Are you sure you want to exit ${
                data && capitalizeText(data.category)
              } form?`
            : `Are you sure you want to exit ${
                data && capitalizeText(data.category)
              } and proceed to ${
                (data &&
                  data.category === 'question' &&
                  'Hypothesis') ||
                (data &&
                  data.category === 'hypothesis' &&
                  'Experiment') ||
                (data &&
                  data.category === 'experiment' &&
                  'Data') ||
                (data && data.category === 'data' && 'Analysis')
              }? ${
                data && capitalizeText(data.category)
              } is already saved as draft.`
        }`}
        subcontent=""
        proceed
      />
      <Formik
        initialValues={{
          category: type,
          subject:
            (method === 'update' && props && props.subject) ||
            '',
          details:
            (method === 'update' && props && props.details) ||
            '',
          tags:
            (method === 'update' && props && props.tags) || [],
          author: (method === 'update' &&
            props &&
            props.author) || [
            {
              id: profile && profile.id,
              name: `${profile && profile.firstName} ${
                profile && profile.lastName
              }`,
              userColor: profile && profile.userColor
            }
          ],
          userId: profile && profile.id,
          status:
            (method === 'update' && props && props.status) ||
            'draft',
          conferenceId: (conference && conference.id) || null,
          version: '1.0.0',
          relatedmedia: rMedia,
          hypothesisStatus:
            (method === 'update' &&
              props &&
              props.hypothesisStatus) ||
            '',
          conferenceName:
            (conference && conference.conferenceName) || '',
          presentationDetails:
            (conference && conference.presentationDetails) || '',
          startTime: (conference && conference.startTime) || '',
          endTime: (conference && conference.endTime) || ''
        }}
        innerRef={formikRef}
        validationSchema={schema}
        defaultValue={{
          author: [
            userData &&
              userData.map(x => {
                return x.id === profile.id
              })
          ]
        }}
        onSubmit={async (values, { setSubmitting }) => {
          submitForm(values)
          await setSubmitting()
        }}
      >
        {({
          values,
          errors,
          handleChange,
          setFieldValue,
          isValid,
          dirty
        }) => (
          <Form>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item xs={12} sm={2}>
                <div
                  className={`${styles.btnBack}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`${styles.backNav}`}>
                    <Typography
                      className={`${styles.back}`}
                      variant="h4"
                      onClick={() => {
                        if (!data) {
                          if (
                            method === 'new' &&
                            type === 'question'
                          ) {
                            history.push('/')
                          }
                          if (
                            method === 'new' &&
                            type !== 'question' &&
                            props
                          ) {
                            history.push(
                              `/contribution/${
                                props.uuid
                              }?list=${
                                props.mainParentId || props.id
                              }&from=home`
                            )
                          }
                          if (
                            method === 'update' &&
                            type === 'question'
                          ) {
                            history.push(
                              `/contribution/${props.uuid}?list=${props.id}&from=home`
                            )
                          }
                          if (
                            method === 'update' &&
                            type !== 'question'
                          ) {
                            history.push(
                              `/contribution/${props.uuid}?list=${props.mainParentId}&from=home`
                            )
                          }
                        } else {
                          setNavigation(!navigation)
                        }
                        setBack(true)
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
              <Grid item xs={12} sm={10}>
                <div
                  style={{
                    position: 'absolute',
                    right: 30,
                    color: 'grey'
                  }}
                >
                  <span>
                    {lastSave &&
                      `Last save: ${moment(lastSave).format(
                        'lll'
                      )}`}
                  </span>
                </div>
              </Grid>
              {type !== 'question' && method === 'new' ? (
                <Grid item sm={12}>
                  <ContributionHeader
                    data={props || data}
                    type={capitalizeText(type)}
                  />
                </Grid>
              ) : null}
              <Grid item sm={12} className="text2">
                <Controls.Input
                  type="text"
                  name="subject"
                  asterisk
                  label={getSubjectLabel(type)}
                  onChange={handleChange}
                  onBlur={() => {
                    if (isValid && dirty) {
                      submitForm(values, false)
                    }
                  }}
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
                  className="text3 details"
                  name="details"
                  asterisk
                  label={getDetailsLabel(type)}
                  onChange={v => setFieldValue('details', v)}
                  onBlur={() => {
                    if (isValid && dirty) {
                      submitForm(values, false)
                    }
                  }}
                  value={values.details}
                  {...(errors &&
                    errors.details && {
                      error: true,
                      helperText: errors.details
                    })}
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
                      onBlur={() => {
                        if (isValid && dirty) {
                          submitForm(values, false)
                        }
                      }}
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
                      label="Presentation Date"
                      name="presentationDetails"
                      onChange={handleChange}
                      onBlur={() => {
                        if (isValid && dirty) {
                          submitForm(values, false)
                        }
                      }}
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
                      label="Start Time GMT"
                      name="startTime"
                      onChange={handleChange}
                      onBlur={() => {
                        if (isValid && dirty) {
                          submitForm(values, false)
                        }
                      }}
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
                      label="End Time GMT"
                      name="endTime"
                      onChange={handleChange}
                      onBlur={() => {
                        if (isValid && dirty) {
                          submitForm(values, false)
                        }
                      }}
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
                          {rMedia.length > 0 &&
                            rMedia[0].title &&
                            values.relatedmedia.length === 0 &&
                            setFieldValue(
                              'relatedmedia',
                              rMedia
                            )}
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
                                      onClick={async () => {
                                        if (value.id) {
                                          await deleteRelatedMediaMutate(
                                            value.id
                                          )
                                          arrayHelpers.remove(
                                            index
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
                                      onBlur={() => {
                                        if (isValid && dirty) {
                                          submitForm(
                                            values,
                                            false
                                          )
                                        }
                                      }}
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
                                      onBlur={() => {
                                        if (isValid && dirty) {
                                          submitForm(
                                            values,
                                            false
                                          )
                                        }
                                      }}
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
                            <Grid item xs={12}>
                              <Divider variant="middle" />
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
                      onBlur={() => {
                        if (isValid && dirty) {
                          submitForm(values, false)
                        }
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
                      onChange={async (e, options) => {
                        const arr = []
                        for (
                          let i = 0;
                          i < options.length;
                          i++
                        ) {
                          if (options[i].name) {
                            arr.push(options[i])
                          } else {
                            arr.push({ name: options[i] })
                          }
                        }
                        const filterArr = await arr.filter(
                          (v, i, a) =>
                            a.findIndex(
                              t =>
                                (t.name === v.name &&
                                  t.id === v.id) ||
                                (t.name === v.name && !t.id)
                            ) === i
                        )
                        await setFieldValue('author', filterArr)
                      }}
                      onBlur={() => {
                        if (isValid && dirty) {
                          submitForm(values, false)
                        }
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
                      value={values.author}
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
                    onBlur={() => {
                      if (isValid && dirty) {
                        submitForm(values, false)
                      }
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
                {type !== 'analysis' && method === 'new' && (
                  <Button
                    className="btn secondary submitBtn mr-30 mb-15m"
                    variant="outlined"
                    style={{ position: 'absolute', right: 200 }}
                    disabled={!isValid}
                    onClick={async () => {
                      await setRedirectUrl('new-contribution')
                      if (!data) {
                        await setData(values)
                        await setConfirmation(!confirmation)
                      } else {
                        setNavigation(!navigation)
                      }
                    }}
                  >
                    ADD {type === 'question' ? 'Hypothesis' : ''}
                    {type === 'hypothesis' ? 'Experiment' : ''}
                    {type === 'experiment' ? 'Data' : ''}
                    {type === 'data' ? 'Analysis' : ''}
                  </Button>
                )}
                <Button
                  className="btn primary submitBtn publish"
                  variant="contained"
                  style={{ position: 'absolute', right: 22 }}
                  disabled={!isValid}
                  onClick={async () => {
                    scrollToErrors(errors)
                    await setRedirectUrl('hierarchy')
                    if (!data) {
                      const temp = values
                      temp.status = 'publish'
                      await setData(temp)
                      await setModal(!modal)
                    } else if (props) {
                      const temp = values
                      temp.id = data.id
                      temp.status = 'publish'
                      await setData(temp)
                      await setModal(!modal)
                    } else {
                      const temp = values
                      temp.id = data.id
                      temp.status = 'publish'
                      await setData(temp)
                      await setModal(!modal)
                    }
                  }}
                >
                  {method === 'new' ? 'PUBLISH' : 'UPDATE'}
                </Button>
              </Grid>
            </Grid>
            <FormikErrorFocus
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
