import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Avatar, Button } from '@material-ui/core'
import Controls from 'components/controls/Controls'
import ModalDelete from 'components/Dialog/delete'
import LoginModal from 'components/Dialog/login'
import GuestIcon from 'assets/images/guest.svg'
import { useForm } from 'react-hook-form'
import Comment from './Comment'
import { useComments } from './hooks'
import styles from './styles.module.scss'

const CommentsOverview = ({
  contributionId,
  user,
  hasSession
}) => {
  const {
    comments,
    getComments,
    addComment,
    addedComment,
    addLoadingComment,
    addErrorComment,
    updateComment,
    resetCommentUpdate,
    // updateErrorComment,
    deleteComment,
    deleteIsLoadingComment,
    // deleteErrorComment,
    deleteMutate,
    resetCommentDelete
    // deleteIsSuccessComment,
  } = useComments(contributionId)

  const [deleteForm, setDeleteForm] = useState(false)
  const [activeComment, setActiveComment] = useState(null)
  const [editing, setEditing] = useState(false)
  const [modal, setModal] = useState(false)

  const {
    handleSubmit,
    control,
    setValue,
    reset
    // register
  } = useForm({
    defaultValues: {
      comment: ''
    }
  })

  const onSubmit = data => {
    if (
      data.comment.replace(/\s/g, '').length > 0 &&
      hasSession
    ) {
      const formFields = {
        comment: data.comment,
        contributionId,
        userId: user && user.user.id
      }
      if (editing) {
        formFields.id = activeComment
        updateComment(formFields)
        setEditing(false)
        resetCommentUpdate()
      } else {
        addComment(formFields)
      }
      reset({ comment: '' })
    }
  }

  const handleReset = () => {
    if (editing) {
      setEditing(false)
      // resetCommentUpdate()
    }
    reset({ comment: '' })
  }

  const handleDelete = data => {
    setDeleteForm(true)
    setActiveComment(data.id)
  }

  const handleEdit = data => {
    setEditing(true)
    setActiveComment(data.id)
    setValue('comment', data.comment)
  }

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <>
      <LoginModal modal={modal} setModal={setModal} />
      <ModalDelete
        header="Delete a Comment"
        content="Are you sure you want to delete this comment?"
        deleteItem={deleteComment}
        deleteIsLoadingItem={deleteIsLoadingComment}
        deleteMutate={deleteMutate}
        id={activeComment}
        deleteForm={deleteForm}
        setDeleteForm={setDeleteForm}
        url={() => {
          setDeleteForm(!deleteForm)
          resetCommentDelete()
        }}
      />
      <div className={`${styles.commentsWrapper}`}>
        <div
          className={`${styles.commentField} ${
            editing ? styles.active : ''
          }`}
        >
          {!isEmpty(user) ? (
            <Avatar
              className={`${styles.avatar}`}
              style={{
                backgroundColor: `${user.user.userColor}`
              }}
            >
              {!isEmpty(user) && user.user.firstName.charAt(0)}
            </Avatar>
          ) : (
            <img className={`${styles.guest}`} src={GuestIcon} />
          )}
          <form
            className={`${styles.form}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controls.Textarea
              className={`${styles.input}`}
              name="comment"
              control={control}
              disabled={!hasSession}
              placeholder="Write a comment..."
              addedComment={addedComment}
              addLoadingComment={addLoadingComment}
              addErrorComment={addErrorComment}
            />
            <Button
              type="submit"
              className={`${styles.submitBtn} btn primary`}
              onClick={() => {
                if (!hasSession) {
                  setModal(true)
                }
              }}
            >
              {editing ? 'UPDATE' : 'ADD'}
            </Button>
            <Button
              onClick={() => handleReset()}
              className={`${styles.clearBtn} btn secondary`}
            >
              CANCEL
            </Button>
            {/* {editing && (
              <Typography className={`${styles.editMeta}`}>
                Escape to
                <span className={`${styles.metaButton}`}>
                  Cancel
                </span>
                <span className={`${styles.metaDivider}`}>
                  ·
                </span>
                Enter to
                <span className={`${styles.metaButton}`}>
                  Save
                </span>
              </Typography>
            )} */}
          </form>
        </div>
        {(comments || []).map(data => {
          return (
            <Comment
              key={data.id}
              data={data}
              onDelete={handleDelete}
              onEdit={handleEdit}
              raw={!isEmpty(user) && user.user}
              hasActions={
                !isEmpty(user) &&
                user.user.orcidId === data.mmUser.orcidId
              }
            />
          )
        })}
      </div>
    </>
  )
}

export default CommentsOverview
