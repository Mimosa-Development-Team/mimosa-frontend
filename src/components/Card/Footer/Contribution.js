import React from 'react'
import Button from '@material-ui/core/Button'
import CommentIcon from 'assets/images/icons/comment.svg'
import TooltipUi from 'components/Tooltip'
import styles from './styles.module.scss'

const ContributionCount = ({ contribution }) => {
  return (
    <div>
      <span className={`${styles.metaDivider}`}>·</span>
      <TooltipUi title="Contribution Count">
        <Button
          disableRipple
          aria-label="contribution"
          className={`${styles.metaButton}`}
        >
          <img src={CommentIcon} alt="" />
          {contribution}
          <span
            style={{
              textTransform: 'lowercase',
              marginLeft: '2px'
            }}
          >
            contributions
          </span>
        </Button>
      </TooltipUi>
    </div>
  )
}

export default ContributionCount
