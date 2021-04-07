import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import AuthorMeta from 'components/Card/Footer/AuthorMeta'
import DateMeta from 'components/Card/Footer/DateMeta'
import Media from 'components/Card/Footer/Media'
import Comments from 'components/Card/Footer/Comments'
import CardButton from 'components/CardButton'
// import Bookmark from 'components/Card/Footer/Bookmark'
import getRawData from 'utils/hookstate/getRawData'
import { useGlobalState } from 'store/state'
import styles from './styles.module.scss'

const Footer = ({
  author,
  data,
  datePosted,
  dateModified,
  onMetaClick,
  hideEdit
}) => {
  const history = useHistory()
  const { user } = useGlobalState()

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
      {data && data.category === 'question' && (
        <>
          <Media
            relatedMediaCount={data.relatedMediaCount}
            onMetaClick={onMetaClick}
            poster={data && data.parentQuestionId}
          />
          <Comments
            commentCount={data.commentCount}
            onMetaClick={onMetaClick}
          />
        </>
      )}
      {hideEdit !== true && data ? (
        <>
          {data.userId === getRawData(user).user.id ? (
            <CardButton
              action="edit"
              onClick={() => {
                history.push(
                  `/contribution-form/${data.category}/update`,
                  {
                    type: 'update',
                    data,
                    questionUuid: data.parentQuestionId
                  }
                )
              }}
            />
          ) : null}
          {(data.category !== 'analysis' &&
            data.userId === getRawData(user).user.id &&
            data.children !== undefined &&
            data.children.length <= 0) ||
          data.category === 'data' ? (
            <CardButton
              action="contribute"
              onClick={() => {
                history.push(
                  `/contribution-form/${getType(
                    data.category
                  )}/new`,
                  {
                    type: 'new',
                    data,
                    questionUuid: data.parentQuestionId
                  }
                )
              }}
            />
          ) : null}
        </>
      ) : null}
    </div>
  )
}

Footer.propTypes = {
  author: PropTypes.string,
  datePosted: PropTypes.string.isRequired,
  dateModified: PropTypes.string
}

export default Footer
