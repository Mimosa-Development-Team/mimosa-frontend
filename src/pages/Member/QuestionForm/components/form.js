import React, { useEffect } from 'react'
import {
  Grid,
  Container,
  Paper,
  FormLabel,
  Button
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Controls from 'components/controls/Controls'
import { useForm, Form } from 'components/useForm'
import ReactQuill from 'react-quill'
import localForage from 'localforage'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useQuestionForm } from '../hooks'
import 'react-quill/dist/quill.snow.css'
import styles from './style.module.scss'

const initialFValues = {
  id: 0,
  category: 'question',
  subject: '',
  details: '',
  tags: [],
  author: [],
  userId: '',
  status: 'publish',
  version: '1.0'
}

const FormAction = () => {
  const {
    getUser,
    getTags,
    user,
    tags,
    addContribution
  } = useQuestionForm()

  useEffect(() => {
    getUser()
    getTags()
  }, [getUser, getTags])

  const validate = (fieldValues = values) => {
    var temp = { ...errors }
    if ('subject' in fieldValues)
      temp.subject = fieldValues.subject
        ? ''
        : '* Mandatory Field'
    if ('details' in fieldValues)
      temp.details = fieldValues.details
        ? ''
        : '* Mandatory Field'
    if ('tags' in fieldValues)
      temp.tags =
        fieldValues.tags && fieldValues.tags.length > 0
          ? ''
          : '* Mandatory Field'
    if ('author' in fieldValues)
      temp.author =
        fieldValues.author && fieldValues.author.length > 0
          ? ''
          : '* Mandatory Field'
    setErrors({
      ...temp
    })
    if (fieldValues === values)
      return Object.values(temp).every(x => x === '')
    return false
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    handleMultipleInput,
    resetForm
  } = useForm(initialFValues, true, validate)

  const handleSubmit = async e => {
    e.preventDefault()
    const { user: localUser } = await localForage.getItem(
      'globalState'
    )
    const formData = values
    formData.userId = localUser.user.id

    if (validate()) {
      addContribution(formData)
      resetForm()
    }
  }

  return (
    <Paper>
      <Container>
        <div className={`${styles.wrapper}`}>
          <Form onSubmit={handleSubmit}>
            <Link className={`${styles.link}`} to="/">
              <ArrowBackIcon />{' '}
              <label className={`${styles.label}`}>Back</label>
            </Link>
            <h2>Add Question</h2>
            <Grid container>
              <Grid item xs={12}>
                <div className={`${styles.form}`}>
                  <FormLabel className={`${styles.label}`}>
                    In one sentence, what is your research
                    question?
                  </FormLabel>
                  <Controls.Input
                    className={`${styles.input}`}
                    name="subject"
                    label="e.g. Can an algorithm distinguish living organism from non-living things?"
                    value={values.subject}
                    onChange={handleInputChange}
                    error={errors.subject}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={`${styles.form}`}>
                  <FormLabel className={`${styles.label}`}>
                    Add some details about your research question
                  </FormLabel>
                  <ReactQuill
                    className={`${styles.input}`}
                    style={{ width: '100%', marginLeft: '9px' }}
                    name="details"
                    required
                    value={values.details}
                    onChange={handleInputChange}
                    error={errors.details}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={`${styles.form}`}>
                  <FormLabel className={`${styles.label}`}>
                    Add tags to help people find your
                    contribution.
                  </FormLabel>
                  <Controls.MultiSelect
                    className={`${styles.input}`}
                    name="tags"
                    data={tags || []}
                    placeholder="Tags"
                    value={values.tags}
                    onChange={handleMultipleInput}
                    error={errors.tags}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={`${styles.form}`}>
                  <FormLabel className={`${styles.label}`}>
                    Authors
                  </FormLabel>
                  <Controls.MultiSelect
                    className={`${styles.input}`}
                    name="author"
                    data={user || []}
                    placeholder="Authors"
                    value={values.author}
                    onChange={handleMultipleInput}
                    error={errors.author}
                  />
                </div>
              </Grid>
              <div className={`${styles.btnGroup}`}>
                <Button
                  className={`${styles.draftBtn}`}
                  size="large"
                  variant="contained"
                  type="submit"
                >
                  SAVE AS DRAFT
                </Button>
                <Button
                  className={`${styles.questionBtn}`}
                  size="large"
                  variant="contained"
                  type="submit"
                >
                  PUBLISH NOW
                </Button>
              </div>
            </Grid>
          </Form>
        </div>
      </Container>
    </Paper>
  )
}

FormAction.propTypes = {}

export default FormAction
