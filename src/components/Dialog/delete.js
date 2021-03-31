/* eslint-disable no-nested-ternary */
import React from 'react'
// import { useHistory } from 'react-router-dom'
import { Modal, Typography, Button } from '@material-ui/core'

export default function ModalDialog({
  header,
  content,
  deleteItem,
  deleteIsLoadingItem,
  deleteMutate,
  deleteForm,
  setDeleteForm,
  id,
  url
}) {
  // const history = useHistory()

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={deleteForm}
      onClose={() => setDeleteForm(!deleteForm)}
      disableBackdropClick
    >
      <div className="dialog centered">
        <Typography variant="h2" className="dialogTitle delete">
          {header}
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
        </div>
        {deleteItem ? (
          <Button
            variant="outlined"
            className="btn outline"
            disabled={deleteIsLoadingItem}
            onClick={() => {
              return url ? url() : setDeleteForm(!deleteForm)
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
