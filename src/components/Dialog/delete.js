/* eslint-disable no-nested-ternary */
import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Modal,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: '93px',
    color: 'green'
  },
  success: {
    fontWeight: 'bold'
  }
}))

export default function ModalDialog({
  header,
  content,
  deleteItem,
  deleteIsLoadingItem,
  deleteMutate,
  deleteForm,
  setDeleteForm,
  id,
  url,
  subContent,
  category,
  heirarchy
}) {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={deleteForm}
      onClose={() => setDeleteForm(!deleteForm)}
      disableBackdropClick
    >
      <div className="dialog centered">
        <Typography variant="h1" align="center">
          {deleteItem ? (
            <div>
              <CheckCircleOutlineIcon className={classes.icon} />
              <p>Succcess</p>
            </div>
          ) : (
            header
          )}
        </Typography>
        <div className="dialogContent">
          <Typography
            variant="subtitle1"
            id="simple-modal-description"
            align="center"
          >
            {deleteItem
              ? 'Your contribution was successfully deleted.'
              : null || content}
          </Typography>
          <Typography
            variant="subtitle1"
            id="simple-modal-description"
            align="center"
          >
            {subContent && !deleteItem ? subContent : null}
          </Typography>
        </div>
        {deleteItem ? (
          <Button
            variant="outlined"
            className="btn outline"
            disabled={deleteIsLoadingItem}
            onClick={() => {
              if (heirarchy && category === 'question') {
                history.push('/')
              } else if (heirarchy && category !== 'question') {
                url()
                setDeleteForm(!deleteForm)
              } else if (category === 'question' && !heirarchy) {
                history.goBack()
              } else if (
                url &&
                category !== 'question' &&
                !heirarchy
              ) {
                url()
                setDeleteForm(!deleteForm)
              } else {
                setDeleteForm(!deleteForm)
              }
            }}
          >
            CLOSE
          </Button>
        ) : (
          <>
            <Button
              className="btn outline mr-30"
              variant="outlined"
              disabled={deleteIsLoadingItem}
              onClick={() => {
                return url ? url() : setDeleteForm(!deleteForm)
              }}
            >
              CLOSE
            </Button>
            <Button
              variant="contained"
              className="btn contained"
              onClick={() => deleteMutate(id)}
            >
              DELETE
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}
