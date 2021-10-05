/* eslint-disable no-nested-ternary */
import React from 'react'
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
  subContent,
  category
}) {
  const classes = useStyles()

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
              <p>Success</p>
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
            {subContent && !deleteItem && category !== 'analysis'
              ? subContent
              : null}
          </Typography>
        </div>
        <>
          <Button
            variant="outlined"
            className="btn outline"
            disabled={deleteIsLoadingItem}
            onClick={() => {
              setDeleteForm(!deleteForm)
            }}
          >
            CLOSE
          </Button>
          <Button
            variant="contained"
            className="btn contained"
            onClick={() => {
              deleteMutate(id)
              setDeleteForm(!deleteForm)
            }}
          >
            DELETE
          </Button>
        </>
      </div>
    </Modal>
  )
}
