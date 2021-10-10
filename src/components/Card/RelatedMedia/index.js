/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import {
  Typography,
  Modal,
  Button,
  Grid,
  makeStyles
} from '@material-ui/core'
import { isEmpty } from 'lodash'
import { useForm } from 'react-hook-form'
import Controls from 'components/controls/Controls'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Conference from './Conference'
import Media from './Media'
import { useMedia } from './hooks'
import styles from './styles.module.scss'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 500,
    borderRadius: '1em',
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none'
  },
  content: {
    marginTop: '1.5em'
  },
  buttonSubmit: {
    width: '40%',
    float: 'right',
    borderRadius: '2em',
    backgroundColor: '#ef8c20',
    height: '3em',
    color: 'white'
  },
  buttonClose: {
    width: '40%',
    float: 'right',
    borderRadius: '2em',
    borderColor: '#ef8c20',
    backgroundColor: 'white',
    height: '3em',
    color: '#ef8c20'
  },
  buttonOnClose: {
    width: '40%',
    float: 'left',
    borderRadius: '2em',
    borderColor: '#ef8c20',
    backgroundColor: 'white',
    height: '3em',
    color: '#ef8c20'
  }
}))

const RelatedMedia = ({
  contributionId,
  userId,
  user,
  hasSession
}) => {
  const { getMedia, media, addMediaLoading, addData } = useMedia(
    contributionId
  )

  const Schema = yup.object().shape({
    title: yup.string().required('* Mandatory Field'),
    link: yup
      .string()
      .matches(
        /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        'Enter correct url!'
      )
      .required('* Mandatory')
  })

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      title: '',
      link: ''
    }
  })

  function getModalStyle() {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    }
  }

  const [modalStyle] = useState(getModalStyle)
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getMedia()
  }, [getMedia])

  const submitForm = val => {
    const formFields = {
      conferenceName: '',
      conferenceDateDetails: {},
      mediaDetails: {
        title: val.title,
        link: val.link
      },
      userId: hasSession ? user.user.id : null,
      contributionId
    }
    addData(formFields)
    setOpen(!open)
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(!open)}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h1">Add Related Media</Typography>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className={classes.content}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item sm={12}>
                  <Controls.CustomInput
                    type="text"
                    name="title"
                    label="Media Title"
                    control={control}
                    {...(errors.title && {
                      error: true,
                      helperText: errors.title.message
                    })}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Controls.CustomInput
                    type="text"
                    name="link"
                    label="Media Link"
                    control={control}
                    {...(errors.link && {
                      error: true,
                      helperText: errors.link.message
                    })}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                    className={classes.buttonOnClose}
                  >
                    CLOSE
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.buttonSubmit}
                    disabled={addMediaLoading}
                  >
                    UPLOAD
                  </Button>{' '}
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </Modal>
      <div className={`${styles.contentWrapper}`}>
        {media && <Conference conference={media.conference} />}
        {media && <Media media={media.media} />}
      </div>
      <div className={`${styles.buttonWrapper}`}>
        {hasSession &&
        !isEmpty(user) &&
        user.user.id === userId ? (
          <Button
            className="btn dashed align-center"
            size="large"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add Related Media
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default RelatedMedia
