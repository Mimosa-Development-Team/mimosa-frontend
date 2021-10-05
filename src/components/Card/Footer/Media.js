import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import MediaIcon from 'assets/images/card/relatedmedia-bw.svg'
import MediaIconColored from 'assets/images/card/media.svg'
import TooltipUi from 'components/Tooltip'
import styles from './styles.module.scss'
import { useQuestionForm } from './hooks'

const Media = ({ onMetaClick, contributionId }) => {
  const { mediaCount, getMediaCount } = useQuestionForm(
    contributionId
  )
  const [active, setActive] = useState(false)
  useEffect(() => {
    getMediaCount()
  }, [getMediaCount])
  return (
    <div
      className={`${styles.metaWrapper}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span className={`${styles.metaDivider}`}>·</span>
      <TooltipUi title="Related Media">
        <Button
          disableRipple
          aria-label="media"
          className={`${styles.metaButton}`}
          onClick={() => onMetaClick(0)}
        >
          <img
            src={active ? MediaIconColored : MediaIcon}
            style={{ width: '15px', marginTop: '2px' }}
            alt=""
          />
          {mediaCount && mediaCount.count !== undefined
            ? mediaCount.count
            : 0}
          <span
            style={{
              textTransform: 'lowercase',
              marginLeft: '2px'
            }}
          >
            related media
          </span>
        </Button>
      </TooltipUi>
    </div>
  )
}

export default Media
