import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ContributionIcon from 'assets/images/card/contribution-bw.svg'
import ContributionIconColored from 'assets/images/card/contribution.svg'
import TooltipUi from 'components/Tooltip'
import styles from './styles.module.scss'

const ContributionCount = ({ contribution }) => {
  const [active, setActive] = useState(false)
  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span className={`${styles.metaDivider}`}>·</span>
      <TooltipUi title="Contribution Count">
        <Button
          disableRipple
          aria-label="contribution"
          className={`${styles.metaButton}`}
        >
          <img
            src={
              active ? ContributionIconColored : ContributionIcon
            }
            style={{ width: '15px', marginTop: '2px' }}
            alt=""
          />
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
