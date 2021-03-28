import React, { useState, useEffect } from 'react'
import {
  Typography,
  Modal,
  Button,
  Grid,
  makeStyles
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import getRawData from 'utils/parsing/Proxy'
import { useGlobalState } from 'store/state'
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
  }
}))

const RelatedMedia = ({ contributionId }) => {
  const { user } = useGlobalState()

  const {
    getMedia,
    media,
    addedData,
    addMediaLoading,
    addData
  } = useMedia(contributionId)

  const Schema = yup.object().shape({
    title: yup.string().required('* Mandatory Field'),
    link: yup.string().required('* Mandatory Field')
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
      userId: getRawData(user).user.id,
      contributionId
    }
    addData(formFields)
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(!open)}
        disableBackdropClick
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
                  <Controls.Input
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
                  <Controls.Input
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
                {addedData ? (
                  <Grid item sm={12}>
                    <Button
                      variant="outlined"
                      onClick={() => setOpen(false)}
                      className={classes.buttonClose}
                    >
                      CLOSE
                    </Button>{' '}
                  </Grid>
                ) : (
                  <Grid item sm={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      className={classes.buttonSubmit}
                      disabled={addMediaLoading}
                    >
                      UPLOAD
                    </Button>{' '}
                  </Grid>
                )}
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
        <Button
          className="btn outline align-center"
          size="large"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add Related Media
        </Button>
      </div>
    </div>
  )
}

export default RelatedMedia
