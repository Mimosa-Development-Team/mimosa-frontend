import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import AddMailModal from 'components/Dialog/addmail'
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
  const [modal, setModal] = useState(false)

  return (
    <div className={`${styles.dashboardWrapper}`}>
      <AddMailModal modal={modal} setModal={setModal} />
      <Grid container alignItems="center">
        <Grid item sm={2} xl={1}>
          <Avatar
            className={`${styles.avatar}`}
            style={{
              backgroundColor: `${
                getRawData(user).user.userColor
              }`
            }}
          >
            <span>
              {getRawData(user).user.firstName.charAt(0)}
            </span>
          </Avatar>
        </Grid>
        <Grid item sm={7} style={{ textAlign: 'left' }}>
          <Typography
            className={`${styles.userName}`}
            variant="h2"
          >
            {getRawData(user).user.firstName}{' '}
            {getRawData(user).user.lastName
              ? getRawData(user).user.lastName
              : ''}
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="left"
            style={{ color: '#ef8c1f', marginTop: '10px' }}
          >
            <MailOutlineIcon />
            {getRawData(user).user &&
            getRawData(user).user.email ? (
              <Typography
                style={{ color: '#ef8c1f', fontSize: '20px' }}
                className={`${styles.userName}`}
                variant="h3"
              >
                {getRawData(user).user.email}
              </Typography>
            ) : (
              <span
                className={`${styles.mail}`}
                onClick={() => setModal(!modal)}
                style={{ color: '#ef8c1f', fontSize: '20px' }}
              >
                Add Email Address
              </span>
            )}
          </Grid>
        </Grid>
        <Grid item sm={2}>
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
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
