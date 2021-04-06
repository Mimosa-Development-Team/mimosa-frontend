import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import Author from './Author'
import styles from './styles.module.scss'

const ContributionDetails = ({
  authors,
  poster,
  posterColor,
  datePosted,
  dateModified
}) => {
  return (
    <div className={`${styles.contributionDetails}`}>
      <Typography className={`${styles.title}`} variant="h5">
        Contribution Details
      </Typography>
      {authors && authors.length > 0 && (
        <div>
          <Typography className={`${styles.metaTitle}`}>
            Authors:
          </Typography>
          {(authors || []).map(author => {
            return <Author author={author} />
          })}
        </div>
      )}
      {poster && (
        <div>
          <Typography className={`${styles.metaTitle}`}>
            Posted by:
          </Typography>
          <div
            className={`${styles.avatarName} ${styles.poster}`}
          >
            <Avatar
              className={`${styles.avatar}`}
              style={{ backgroundColor: posterColor }}
            >
              {poster.charAt(0)}
            </Avatar>
            {poster}
          </div>
        </div>
      )}
      <div>
        <Typography className={`${styles.metaTitle}`}>
          Date Posted:
        </Typography>
        <Typography className={`${styles.date}`}>
          {moment(datePosted).format('MMM. D, YYYY')}
        </Typography>
      </div>
      {dateModified && (
        <div>
          <Typography className={`${styles.metaTitle}`}>
            Date Modified:
          </Typography>
          <Typography className={`${styles.date}`}>
            {moment(dateModified).format('MMM. D, YYYY')}
          </Typography>
        </div>
      )}
    </div>
  )
}

ContributionDetails.propTypes = {
  authors: PropTypes.array,
  poster: PropTypes.string.isRequired,
  datePosted: PropTypes.string.isRequired,
  dateModified: PropTypes.string
}

export default ContributionDetails
