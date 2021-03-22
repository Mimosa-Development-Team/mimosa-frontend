import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import EditIcon from '@material-ui/icons/Edit'
import AuthorMeta from 'components/Card/Footer/AuthorMeta'
import DateMeta from 'components/Card/Footer/DateMeta'
import Media from 'components/Card/Footer/Media'
import Comments from 'components/Card/Footer/Comments'
// import Bookmark from 'components/Card/Footer/Bookmark'
import styles from './styles.module.scss'

const Footer = ({
  author,
  data,
  datePosted,
  questionUuid,
  dateModified,
  commentCount,
  relatedMediaCount,
  onMetaClick
}) => {
  const history = useHistory()

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
      {author && <AuthorMeta author={author} />}
      <DateMeta
        datePosted={datePosted}
        dateModified={dateModified}
      />
      {relatedMediaCount > 0 && (
        <Media
          relatedMediaCount={relatedMediaCount}
          onMetaClick={onMetaClick}
        />
      )}
      {commentCount > 0 && (
        <Comments
          commentCount={commentCount}
          onMetaClick={onMetaClick}
        />
      )}
      {/* <Bookmark /> */}
      {data ? (
        <>
          <button
            onClick={() => {
              history.push(
                `/contribution-form/${data.category}/update`,
                {
                  type: 'update',
                  data,
                  questionUuid
                }
              )
            }}
          >
            <EditIcon />
            Edit
          </button>
          <div className={`${styles.rightFooter}`}>
            {(data.category !== 'analysis' &&
              data.children.length <= 0) ||
            data.category === 'data' ? (
              <button
                onClick={() => {
                  history.push(
                    `/contribution-form/${getType(
                      data.category
                    )}/new`,
                    {
                      type: 'new',
                      data,
                      questionUuid
                    }
                  )
                }}
              >
                <NoteAddIcon style={{ marginTop: '20px' }} />
                {' Contribute'}
              </button>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  )
}

Footer.propTypes = {
  author: PropTypes.string,
  datePosted: PropTypes.string.isRequired,
  dateModified: PropTypes.string,
  commentCount: PropTypes.string
}

export default Footer
