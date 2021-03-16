import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import AvatarName from 'components/AvatarName'
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
      <div>
        <Typography className={`${styles.metaTitle}`}>
          Authors:
        </Typography>
        {(authors || []).map(data => {
          return (
            <AvatarName
              className={`${styles.author}`}
              name={data.name}
            />
          )
        })}
      </div>
      <div>
        <Typography className={`${styles.metaTitle}`}>
          Posted by:
        </Typography>
        <AvatarName
          className={`${styles.poster}`}
          name={poster}
        />
      </div>
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
        <Typography className={`${styles.date}`}>
          {moment(dateModified).format('MMM. D, YYYY')}
        </Typography>
      </div>
    </div>
  )
}

ContributionDetails.propTypes = {
  authors: PropTypes.array.isRequired,
  poster: PropTypes.string.isRequired,
  datePosted: PropTypes.string.isRequired,
  dateModified: PropTypes.string
}

export default ContributionDetails
