import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import styles from './styles.module.scss'

const Media = () => {
  return (
    <div className={`${styles.media}`}>
      <ul>
        <li>
          <Typography className={`${styles.title}`}>
            Video Title
          </Typography>
          <Typography className={`${styles.meta}`}>
            MP4<span className={`${styles.metaDivider}`}>|</span>
            English
            <span className={`${styles.metaDivider}`}>|</span>
            By Lorem Ipsum
          </Typography>
          <Link className={`${styles.link}`}>
            https://www.youtube.com/results?search_query=algorithm
          </Link>
        </li>
        <li>
          <Typography className={`${styles.title}`}>
            PDF Title
          </Typography>
          <Typography className={`${styles.meta}`}>
            PDF<span className={`${styles.metaDivider}`}>|</span>
            English
            <span className={`${styles.metaDivider}`}>|</span>
            By Lorem Ipsum
          </Typography>
          <Link className={`${styles.link}`}>
            https://www.youtube.com/results?search_query=algorithm
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Media
