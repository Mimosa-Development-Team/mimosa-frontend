import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import LinkIcon from 'assets/images/icons/link.svg'
import PDFIcon from 'assets/images/icons/pdf.svg'
import VideoIcon from 'assets/images/icons/video-camera.svg'
import styles from './styles.module.scss'

const Media = () => {
  const icons = {
    pdf: PDFIcon,
    video: VideoIcon
  }
  return (
    <div className={`${styles.media}`}>
      <ul>
        <li>
          <div className={`${styles.mediaIcon}`}>
            <span>
              <img src={icons.video} alt="PDF" />
            </span>
          </div>
          <div>
            <Typography className={`${styles.title}`}>
              Video Title
            </Typography>
            <Typography className={`${styles.meta}`}>
              MP4
              <span className={`${styles.metaDivider}`}>|</span>
              English
              <span className={`${styles.metaDivider}`}>|</span>
              By Lorem Ipsum
            </Typography>
            <Link className={`${styles.link}`}>
              <span className={`${styles.icon}`}>
                <img src={LinkIcon} alt="" />
              </span>
              https://www.youtube.com/results?search_query=algorithm
            </Link>
          </div>
        </li>
        <li>
          <div className={`${styles.mediaIcon}`}>
            <span>
              <img src={icons.pdf} alt="PDF" />
            </span>
          </div>
          <div>
            <Typography className={`${styles.title}`}>
              PDF Title
            </Typography>
            <Typography className={`${styles.meta}`}>
              PDF
              <span className={`${styles.metaDivider}`}>|</span>
              English
              <span className={`${styles.metaDivider}`}>|</span>
              By Lorem Ipsum
            </Typography>
            <Link className={`${styles.link}`}>
              <span className={`${styles.icon}`}>
                <img src={LinkIcon} alt="" />
              </span>
              https://www.youtube.com/results?search_query=algorithm
            </Link>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Media
