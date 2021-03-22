import React from 'react'
import { Button } from '@material-ui/core'
import Conference from './Conference'
import Media from './Media'
import styles from './styles.module.scss'

const RelatedMedia = () => {
  return (
    <div>
      <div className={`${styles.contentWrapper}`}>
        <Conference />
        <Media />
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
