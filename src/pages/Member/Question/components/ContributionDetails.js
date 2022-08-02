import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import Author from './Author'
import styles from './styles.module.scss'

const ContributionDetails = ({ data }) => {
  return (
    <div className={`${styles.contributionDetails}`}>
      <Typography className={`${styles.title}`} variant="span">
        Contribution Details
      </Typography>
      {data && data.author.length > 0 && (
        <div>
          <Typography className={`${styles.metaTitle}`}>
            Authors:
          </Typography>
          {(data.author || []).map(author => {
            return <Author author={author} />
          })}
        </div>
      )}
      {data && data.poster && (
        <div>
          <Typography className={`${styles.metaSubtitle}`}>
            Posted by:
          </Typography>
          <div
            className={`${styles.avatarName} ${styles.poster}`}
          >
            <Avatar
              className={`${styles.avatar}`}
              style={{ backgroundColor: data.poster.userColor }}
            >
              {data.poster.firstName.charAt(0)}
            </Avatar>
            {`${data.poster.firstName} ${data.poster.lastName}`}
          </div>
        </div>
      )}
      <div>
        <Typography className={`${styles.metaSubtitle}`}>
          Date Posted:
        </Typography>
        <Typography className={`${styles.date}`}>
          {moment(data && data.createdAt).format(
            'MMM. D, YYYY h:mm A'
          )}
        </Typography>
      </div>
      {data && data.updatedAt && (
        <div>
          <Typography className={`${styles.metaSubtitle}`}>
            Date Modified:
          </Typography>
          <Typography className={`${styles.date}`}>
            {moment(data.updatedAt).format(
              'MMM. D, YYYY h:mm A'
            )}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default ContributionDetails
