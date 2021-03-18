import React from 'react'
import PropTypes from 'prop-types'
import AuthorMeta from 'components/Card/Footer/AuthorMeta'
import DateMeta from 'components/Card/Footer/DateMeta'
import Media from 'components/Card/Footer/Media'
import Comments from 'components/Card/Footer/Comments'
// import Bookmark from 'components/Card/Footer/Bookmark'
import styles from './styles.module.scss'

const Footer = ({
  author,
  datePosted,
  dateModified,
  commentCount,
  relatedMediaCount
}) => {
  return (
    <div className={`${styles.footer}`}>
      {author && <AuthorMeta author={author} />}
      <DateMeta
        datePosted={datePosted}
        dateModified={dateModified}
      />
      <Media relatedMediaCount={relatedMediaCount} />
      <Comments commentCount={commentCount} />
      {/* <Bookmark /> */}
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
