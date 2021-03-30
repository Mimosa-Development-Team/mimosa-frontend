/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import { Modal, Typography, Button } from '@material-ui/core'

export default function ModalDialog({
  header,
  content,
  deleteItem,
  deleteIsLoadingItem,
  deleteMutate,
  deleteForm,
  id,
  url
}) {
  // const history = useHistory()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (deleteForm) {
      setOpen(true)
    }
  }, [deleteForm, setOpen])

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={() => setOpen(!open)}
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
            onClick={() => (url ? url() : setOpen(!open))}
          >
            CLOSE
          </Button>
        ) : (
          <>
            <Button
              className="btn outline mr-30"
              variant="outlined"
              disabled={deleteIsLoadingItem}
              onClick={() => (url ? url() : setOpen(!open))}
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
