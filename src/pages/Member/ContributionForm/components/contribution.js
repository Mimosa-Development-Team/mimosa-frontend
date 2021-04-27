/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
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
import moment from 'moment'
import BackIcon from 'assets/images/icons/back.svg'
import capitalizeText from 'utils/parsing/capitalize'
import DeleteIcon from 'assets/images/icons/delete.svg'
import ContributionHeader from './contribution-header'
import styles from './style.module.scss'

const schema = yup.object().shape(
  {
    relatedmedia: yup.array().of(
      yup.object().shape({
        title: yup.string().when('link', {
          is: value => !!value,
          then: yup.string().required('* Mandatory Field')
        })
      }),
      ['title', 'link']
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
  relatedMediaData
}) {
  const history = useHistory()

  const [conference, setConference] = useState({
    conferenceName: '',
    presentationDetails: '',
    startTime: '',
    endTime: ''
  })

  const [rMedia, setRmedia] = useState([])

  useEffect(() => {
    if (relatedMediaData) {
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
            ).format('HH:mm')
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
      <Formik
        enableReinitialize
        initialValues={{
          category: data && data.category ? data.category : type,
          subject: data && data.subject ? data.subject : '',
          description:
            data && data.description ? data.description : '',
          conferenceName: conference.conferenceName
            ? conference.conferenceName
            : '',
          presentationDetails: conference.presentationDetails
            ? conference.presentationDetails
            : '',
          startTime: conference.startTime
            ? conference.startTime
            : '',
          endTime: conference.endTime ? conference.endTime : '',
          relatedmedia: rMedia.length > 0 || [
            { title: '', link: '' }
          ],
          tags: [],
          author: [
            {
              id: profile.id,
              name: `${profile.firstName} ${profile.lastName}`,
              userColor: profile.userColor
            }
          ]
        }}
        defaultValue={{
          author: [
            {
              id: profile.id,
              name: `${profile.firstName} ${profile.lastName}`,
              userColor: profile.userColor
            }
          ]
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          if (method === 'new') {
            console.log('NEW', values)
          } else {
            console.log('UPDATE', values)
          }
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
          setFieldValue
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
                        history.push('/')
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
                  label="Subject"
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
                  label="Quill"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
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
                          {values.relatedmedia.map(
                            (friend, index) => (
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
                                      arrayHelpers.remove(index)
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
                                    {...(errors &&
                                      errors.relatedmedia &&
                                      errors.relatedmedia[
                                        index
                                      ] &&
                                      errors.relatedmedia[index]
                                        .title && {
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
                                    {...(errors &&
                                      errors.relatedmedia &&
                                      errors.relatedmedia[
                                        index
                                      ] &&
                                      errors.relatedmedia[index]
                                        .link && {
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
                          if (val.name) {
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
                  >
                    {method === 'new' ? 'PUBLISH NOW' : 'UPDATE'}
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ContributionForm
