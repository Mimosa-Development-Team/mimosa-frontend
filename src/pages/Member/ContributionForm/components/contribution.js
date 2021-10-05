/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
import React, {
  useEffect,
  // useMemo,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'
import { isEmpty } from 'lodash'
import Controls from 'components/controls/Controls'
import {
  Button,
  Grid,
  Typography,
  Divider
} from '@material-ui/core'
import {
  // useFormikContext,
  Formik,
  FieldArray,
  Form
} from 'formik'
import moment from 'moment'
import FormikErrorFocus from 'formik-error-focus'
import * as yup from 'yup'
// import debounce from 'just-debounce-it'

import ModalDialog from 'components/Dialog/dialog'

import DeleteIcon from 'assets/images/icons/delete.svg'
import BackIcon from 'assets/images/icons/back.svg'
import capitalizeText from 'utils/parsing/capitalize'
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

// const AutoSave = ({ debounceMs, updatedAt }) => {
//   const formik = useFormikContext()
//   const [lastSaved, setLastSaved] = useState(null)
//   const debouncedSubmit = useMemo(
//     () =>
//       debounce(
//         () =>
//           formik
//             .submitForm()
//             .then(() => setLastSaved(new Date().toISOString())),
//         debounceMs
//       ),
//     [debounceMs, formik.submitForm]
//   )

//   useEffect(() => {
//     debouncedSubmit()
//   }, [debouncedSubmit, formik.values])

//   return (
//     <>
//       {formik.isSubmitting
//         ? 'saving...'
//         : lastSaved !== null
//         ? updatedAt
//         : null}
//     </>
//   )
// }

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
  addContribution,
  updateContribution,
  data,
  method,
  relatedMediaData
}) {
  const history = useHistory()
  const [modal, setModal] = useState(false)
  const [rMedia, setRmedia] = useState([])
  const [formDataValues, setFormDataValues] = useState(null)
  const [conference, setConference] = useState({
    conferenceName: '',
    presentationDetails: '',
    startTime: '',
    endTime: '',
    id: ''
  })

  const scrollToErrors = errors => {
    const errorKeys = Object.keys(errors)
    if (errorKeys.length > 0) {
      //if else statement on relatedmedia because it is an array
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

  return (
    <>
      <ModalDialog
        modal={modal}
        setModal={setModal}
        formDataValues={formDataValues}
        submit={
          method === 'new' ? addContribution : updateContribution
        }
        message="Are you sure you want to publish this Question?"
        subcontent=""
      />
      <Formik
        initialValues={{
          category:
            data && data.category && method === 'update'
              ? data.category
              : type,
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
              : profile && profile.lastName
              ? [
                  {
                    id: profile.id,
                    name: `${profile.firstName} ${
                      profile.lastName ? profile.lastName : ''
                    }`,
                    userColor: profile.userColor
                  }
                ]
              : [
                  {
                    id: profile && profile.id,
                    name: `${profile && profile.firstName}`,
                    userColor: profile && profile.userColor
                  }
                ],
          userId: profile && profile.id,
          status: 'publish',
          conferenceId: (conference && conference.id) || null,
          version: '1.0.0',
          uuid: null,
          parentId: data && method === 'new' ? data.id : null,
          relatedmedia: rMedia,
          hypothesisStatus:
            type === 'analysis' ? 'supports' : '',
          conferenceName:
            (conference && conference.conferenceName) || '',
          presentationDetails:
            (conference && conference.presentationDetails) || '',
          startTime: (conference && conference.startTime) || '',
          endTime: (conference && conference.endTime) || '',
          mainParentId:
            (data && method === 'new' && data.mainParentId) ||
            (data && method === 'new' && data.id) ||
            null
        }}
        validationSchema={schema}
        defaultValue={{
          author: [
            userData &&
              userData.map(x => {
                return x.id === profile.id
              })
          ]
        }}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          if (method === 'update') {
            values.id = data.id
          }
          await setFormDataValues(values)
          await setSubmitting()
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          setFieldValue
          // isValid
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
                <div className={`${styles.btnBack}`}>
                  <div className={`${styles.backNav}`}>
                    <Typography
                      className={`${styles.back}`}
                      variant="h4"
                      onClick={() => history.goBack()}
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
                  {/* {isValid && (
                    <AutoSave
                      debounceMs={300}
                      updatedAt={moment(new Date()).format(
                        'lll'
                      )}
                    />
                  )} */}
                </div>
              </Grid>
              {type !== 'question' && method === 'new' ? (
                <Grid item sm={12}>
                  <ContributionHeader
                    data={data}
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
                  className="text3 details"
                  name="details"
                  asterisk
                  label={getDetailsLabel(type)}
                  onChange={v => setFieldValue('details', v)}
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
                      label="Presentation Date"
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
                      label="Start Time GMT"
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
                      label="End Time GMT"
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
                                  {values.relatedmedia.length >
                                    1 && (
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
                                          // if (value.id) {
                                          //   setDeleteMedia(true)
                                          //   setDeleteMediaId(
                                          //     value.id
                                          //   )
                                          // } else {
                                          arrayHelpers.remove(
                                            index
                                          )
                                          // }
                                        }}
                                      >
                                        <img
                                          src={DeleteIcon}
                                          className={`${styles.deleteIcon}`}
                                        />{' '}
                                        Remove Media
                                      </Typography>
                                    </div>
                                  )}
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
                <Button
                  className="btn primary submitBtn publish"
                  variant="contained"
                  style={{ position: 'absolute', right: 22 }}
                  type="submit"
                  onClick={() => {
                    if (isEmpty(errors)) {
                      setModal(!modal)
                    }
                    scrollToErrors(errors)
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
