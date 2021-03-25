import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'
import Conference from './Conference'
import Media from './Media'
import { useMedia } from './hooks'
import styles from './styles.module.scss'

const RelatedMedia = ({ contributionId }) => {
  const { media, getMedia } = useMedia(contributionId)

  useEffect(() => {
    getMedia()
  }, [getMedia])

  return (
    <div>
      <div className={`${styles.contentWrapper}`}>
        {media && <Conference conference={media.conference} />}
        {media && <Media media={media.media} />}
      </div>
      <div className={`${styles.buttonWrapper}`}>
        <Button
          className="btn outline align-center"
          size="large"
          variant="contained"
        >
          Add Related Media
        </Button>
      </div>
    </div>
  )
}

export default RelatedMedia
