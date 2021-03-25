import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import styles from './styles.module.scss'

const ContributionDetails = ({
  authors,
  poster,
  datePosted,
  dateModified
}) => {
  return (
    <div className={`${styles.contributionDetails}`}>
      <Typography className={`${styles.title}`} variant="h5">
        Contribution Details
      </Typography>
      {authors && (
        <div>
          <Typography className={`${styles.metaTitle}`}>
            Authors:
          </Typography>
          {(authors || []).map(author => {
            return (
              <div
                className={`${styles.avatarName} ${styles.author}`}
              >
                <Avatar className={`${styles.avatar}`}>
                  {author.name.charAt(0)}
                </Avatar>
                {author.name}
              </div>
            )
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
            <Avatar className={`${styles.avatar}`}>
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
      <div>
        <Typography className={`${styles.metaTitle}`}>
          Date Modified:
        </Typography>
        {datePosted !== dateModified ? (
          <Typography className={`${styles.date}`}>
            {moment(dateModified).format('MMM. D, YYYY')}
          </Typography>
        ) : (
          '---'
        )}
      </div>
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
