import React from 'react'
import Typography from '@material-ui/core/Typography'
import Logo from 'assets/images/logo.svg'
import AsteriskIcon from 'assets/images/asterisk.svg'
import MaintenanceIcon from 'assets/images/maintenance.svg'
import styles from './styles.module.scss'

const PageMaintenance = () => {
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
        <div className={`${styles.pageMaintenance}`}>
          <img src={MaintenanceIcon} alt="maintenance" />
        </div>
        <Typography className={`${styles.header}`} variant="h1">
          We are Under Maintenance.
        </Typography>
        <Typography
          className={`${styles.subheader}`}
          variant="h2"
        >
          Will be Back Soon!
        </Typography>
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

export default PageMaintenance
