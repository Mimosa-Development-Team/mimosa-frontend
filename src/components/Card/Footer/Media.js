import React from 'react'
import Button from '@material-ui/core/Button'
import MediaIcon from 'assets/images/icons/media.svg'
import styles from './styles.module.scss'

const Media = () => {
  return (
    <div className={`${styles.metaWrapper}`}>
      <Button
        disableRipple="true"
        aria-label="media"
        className={`${styles.metaButton}`}
      >
        <img src={MediaIcon} alt="" />1
      </Button>
      <span className={`${styles.metaDivider}`}>·</span>
    </div>
  )
}

export default Media