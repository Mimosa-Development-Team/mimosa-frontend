import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'

import styles from '../styles.module.scss'

const Dashboard = ({
  question,
  hypothesis,
  experiment,
  data,
  analysis
}) => {
  const { user } = useGlobalState()
  return (
    <div className={`${styles.dashboardWrapper}`}>
      <div className={`${styles.userInfo}`}>
        <Avatar
          className={`${styles.avatar}`}
          style={{
            backgroundColor: `${getRawData(user).user.userColor}`
          }}
        >
          <span>
            {getRawData(user).user.firstName.charAt(0)}
          </span>
        </Avatar>
        <Typography
          className={`${styles.userName}`}
          variant="h2"
        >
          {getRawData(user).user.firstName}{' '}
          {getRawData(user).user.lastName}
        </Typography>
      </div>
      <div className={`${styles.contributionInfo}`}>
        <ul>
          <li>
            Question:
            <span>{question}</span>
          </li>
          <li>
            Hypothesis:
            <span>{hypothesis}</span>
          </li>
          <li>
            Experiment:
            <span>{experiment}</span>
          </li>
          <li>
            Data:
            <span>{data}</span>
          </li>
          <li>
            Analysis:
            <span>{analysis}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
