import React from 'react'
import DeprecatedIcon from 'assets/images/icons/deprecated.svg'
import styles from './styles.module.scss'

const DeprecatedTag = () => {
  return (
    <div className={`${styles.deprecatedWrapper}`}>
      <img
        className={`${styles.icon}`}
        src={DeprecatedIcon}
        alt="deprecated"
      />
      Deprecated
    </div>
  )
}

export default DeprecatedTag
