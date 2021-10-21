import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ContributionIcon from 'assets/images/card/contribution-bw.svg'
import ContributionIconColored from 'assets/images/card/contribution.svg'
import TooltipUi from 'components/Tooltip'
import styles from './styles.module.scss'

const ContributionCount = ({ contribution, data }) => {
  const history = useHistory()
  return (
    <div>
      <span className={`${styles.metaDivider}`}>·</span>
      <TooltipUi title="Contribution Count">
        <Button
          disableRipple
          aria-label="contribution"
          className={`${styles.metaButton}`}
          onClick={() => {
            history.push(
              `/contribution?list=${data.id}&active=${data.id}&from=home`
            )
          }}
        >
          <img
            src={
              contribution > 0
                ? ContributionIconColored
                : ContributionIcon
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
