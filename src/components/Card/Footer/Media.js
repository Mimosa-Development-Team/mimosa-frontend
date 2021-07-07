import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import MediaIcon from 'assets/images/icons/media.svg'
import styles from './styles.module.scss'
import { useQuestionForm } from './hooks'

const Media = ({ onMetaClick, contributionId }) => {
  const { mediaCount, getMediaCount } = useQuestionForm(
    contributionId
  )
  useEffect(() => {
    getMediaCount()
  }, [getMediaCount])
  return (
    <div className={`${styles.metaWrapper}`}>
      <span className={`${styles.metaDivider}`}>·</span>
      <Button
        disableRipple
        aria-label="media"
        className={`${styles.metaButton}`}
        onClick={() => onMetaClick(0)}
      >
        <img src={MediaIcon} alt="" />
        {mediaCount && mediaCount.count !== undefined
          ? mediaCount.count
          : 0}
      </Button>
    </div>
  )
}

export default Media
