import React from 'react'
import PropTypes from 'prop-types'
import AuthorMeta from 'components/Card/Footer/AuthorMeta'
import DateMeta from 'components/Card/Footer/DateMeta'
import Media from 'components/Card/Footer/Media'
import Comments from 'components/Card/Footer/Comments'
import Bookmark from 'components/Card/Footer/Bookmark'
import styles from './styles.module.scss'

const Footer = ({ author, date }) => {
  return (
    <div className={`${styles.footer}`}>
      {author && <AuthorMeta author={author} />}
      <DateMeta date={date} />
      <Media />
      <Comments />
      <Bookmark />
    </div>
  )
}

Footer.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string.isRequired
}

export default Footer
