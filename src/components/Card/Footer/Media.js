import React from 'react'
import Button from '@material-ui/core/Button'
import MediaIcon from 'assets/images/icons/media.svg'
import styles from './styles.module.scss'

const Media = ({ relatedMediaCount, onMetaClick }) => {
  return (
    <div className={`${styles.metaWrapper}`}>
      <span className={`${styles.metaDivider}`}>·</span>
      <Button
        disableRipple="true"
        aria-label="media"
        className={`${styles.metaButton}`}
        onClick={onMetaClick}
      >
        <img src={MediaIcon} alt="" />
        {relatedMediaCount}
      </Button>
    </div>
  )
}

export default Media
