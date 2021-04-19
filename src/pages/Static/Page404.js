import React from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Logo from 'assets/images/logo.svg'
import AsteriskIcon from 'assets/images/asterisk.svg'
import Page404Icon from 'assets/images/404.svg'
import styles from './styles.module.scss'

const Page404 = () => {
  const history = useHistory()
  return (
    <div className={`${styles.staticWrapper}`}>
      <div className={`${styles.contentWrapper}`}>
        <div className={`${styles.logoWrapper}`}>
          <img
            className={`${styles.logo}`}
            src={Logo}
            alt="logo"
          />
        </div>
        <div className={`${styles.page404}`}>
          <img src={Page404Icon} alt="404" />
        </div>
        <Typography className={`${styles.h1}`} variant="h1">
          Oops! something went wrong.
        </Typography>
        <Button
          className="btn primary padding-lr65"
          onClick={() => {
            history.push(`/`)
          }}
        >
          Back to Home
        </Button>
        <img
          className={`${styles.asterisk} ${styles.bl}`}
          src={AsteriskIcon}
          alt="asterisk"
        />
        <img
          className={`${styles.asterisk} ${styles.tr}`}
          src={AsteriskIcon}
          alt="asterisk"
        />
      </div>
    </div>
  )
}

export default Page404
