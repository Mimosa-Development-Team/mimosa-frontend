/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import AuthorMeta from 'components/Card/Footer/AuthorMeta'
import DateMeta from 'components/Card/Footer/DateMeta'
import Media from 'components/Card/Footer/Media'
import Comments from 'components/Card/Footer/Comments'
import CardButton from 'components/CardButton'
// import Bookmark from 'components/Card/Footer/Bookmark'
import ModalDelete from 'components/Dialog/delete'
import capitalizeText from 'utils/parsing/capitalize'
import { useContribution } from '../../../pages/Member/Question/hooks'
import Contribution from './Contribution'
import styles from './styles.module.scss'
import { useQuestionForm } from './hooks'

const Footer = ({
  data,
  datePosted,
  dateModified,
  onMetaClick,
  hideEdit,
  showDraft,
  heirarchyList,
  postedBy,
  userColor
}) => {
  const history = useHistory()
  const { user: proxyUser } = useGlobalState()
  const [user, setuser] = useState(null)

  useEffect(() => {
    const getUser = getRawData(proxyUser)
    if (getUser && getUser.user) {
      setuser(getRawData(proxyUser).user)
    }
  }, [])

  const {
    deleteContribution,
    deleteIsLoadingContribution,
    deleteMutate,
    deleteDraft,
    deleteIsLoadingDraft,
    deleteDraftMutate
  } = useQuestionForm()

  const { getContribution } = useContribution(
    user ? user.id : null
  )

  const [modal, setModal] = useState(false)

  const getType = type => {
    switch (type) {
      case 'question':
        return 'hypothesis'
      case 'hypothesis':
        return 'experiment'
      case 'experiment':
        return 'data'
      case 'data':
        return 'analysis'
      default:
        return null
    }
  }

  return (
    <div className={`${styles.footer}`}>
      {postedBy || (data && data.poster) ? (
        <AuthorMeta
          author={`${
            postedBy ||
            (data.poster &&
              `${data.poster.firstName} ${data.poster.lastName}`)
          }`}
          userColor={
            userColor || (data.poster && data.poster.userColor)
          }
        />
      ) : null}
      {showDraft ? (
        <ModalDelete
          header={`Discard this ${
            data ? capitalizeText(data.category) : ''
          } draft`}
          content={`Are you sure you want to delete this ${
            data ? capitalizeText(data.category) : ''
          } draft?`}
          deleteItem={deleteDraft}
          deleteIsLoadingContribution={deleteIsLoadingDraft}
          deleteMutate={deleteDraftMutate}
          url={() => getContribution()}
          category={data.category}
          heirarchy
          id={data ? data.id : null}
          deleteForm={modal}
          setDeleteForm={setModal}
        />
      ) : (
        <ModalDelete
          header={`Delete a ${
            data ? capitalizeText(data.category) : ''
          }`}
          content={`Are you sure you want to delete this ${
            data ? capitalizeText(data.category) : ''
          }?`}
          deleteItem={deleteContribution}
          deleteIsLoadingContribution={
            deleteIsLoadingContribution
          }
          deleteMutate={deleteMutate}
          url={() => getContribution()}
          category={data.category}
          heirarchy
          id={data ? data.id : null}
          deleteForm={modal}
          setDeleteForm={setModal}
          // this becomes useless as only leaves can be deleted
          // subContent={`This will delete all child contributions attached to this ${data.category}.`}
        />
      )}

      <DateMeta
        datePosted={datePosted}
        dateModified={dateModified}
        data={data}
      />
      {data && data.category === 'question' && (
        <>
          <Media
            contributionId={data.id}
            onMetaClick={onMetaClick}
            poster={data && data.parentQuestionId}
          />
          <Comments
            onMetaClick={onMetaClick}
            contributionId={data.id}
          />
        </>
      )}
      {!heirarchyList && (
        <Contribution
          contribution={data && data.total}
          data={data}
        />
      )}
      {hideEdit !== true && data ? (
        <>
          {user && data.userId === user.id ? (
            <CardButton
              action="edit"
              onClick={() => {
                history.push(
                  `/contribution-form/${data.category}/update`,
                  {
                    type: 'update',
                    data
                  }
                )
              }}
            />
          ) : null}
          {((data.children && data.children.length === 0) ||
            data.category === 'analysis') &&
          user &&
          (user.role === 'admin' || data.userId === user.id) ? (
            <CardButton
              action="delete"
              onClick={() => setModal(true)}
            />
          ) : null}
          {data.category !== 'analysis' && (
            <CardButton
              action="contribute"
              onClick={() => {
                history.push(
                  `/contribution-form/${getType(
                    data.category
                  )}/new`,
                  {
                    type: 'new',
                    data
                  }
                )
              }}
              disabled={!user}
            />
          )}
        </>
      ) : null}
    </div>
  )
}

Footer.propTypes = {
  datePosted: PropTypes.string.isRequired,
  dateModified: PropTypes.string
}

export default Footer
