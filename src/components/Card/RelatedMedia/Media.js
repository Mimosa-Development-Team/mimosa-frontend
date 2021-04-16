import React from 'react'
import { Typography, Link } from '@material-ui/core'
import LinkIcon from 'assets/images/icons/link.svg'
import PDFIcon from 'assets/images/icons/pdf.svg'
import FileIcon from 'assets/images/icons/file.svg'
import VideoIcon from 'assets/images/icons/video-camera.svg'
import { VIDEO_EXTENSIONS } from './extensions'
import styles from './styles.module.scss'

const Media = ({ media }) => {
  const icons = {
    pdf: PDFIcon,
    video: VideoIcon,
    file: FileIcon
  }
  const checkFile = file => {
    let type = 'file'
    const fileExtension = file.split('.').pop()
    if (VIDEO_EXTENSIONS.indexOf(fileExtension) > -1) {
      type = 'video'
    }
    if (fileExtension === 'pdf') {
      type = fileExtension
    }
    return type
  }
  return (
    <div className={`${styles.media}`}>
      <ul>
        {(media || []).map(data => {
          return (
            <li key={data.id}>
              <div className={`${styles.mediaIcon}`}>
                <span>
                  {data.mediaDetails &&
                  data.mediaDetails.link ? (
                    <img
                      src={
                        icons[checkFile(data.mediaDetails.link)]
                      }
                      alt="media icon"
                    />
                  ) : null}
                </span>
              </div>
              <div>
                <Typography className={`${styles.title}`}>
                  {data.mediaDetails.title}
                </Typography>
                <Typography className={`${styles.meta}`}>
                  {/* MP4
                  <span className={`${styles.metaDivider}`}>
                    |
                  </span>
                  English
                  <span className={`${styles.metaDivider}`}>
                    |
                  </span> */}
                  By {data.userFullName}
                </Typography>
                <Link className={`${styles.link}`}>
                  <span className={`${styles.icon}`}>
                    <img src={LinkIcon} alt="" />
                  </span>
                  {data.mediaDetails.link}
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Media
