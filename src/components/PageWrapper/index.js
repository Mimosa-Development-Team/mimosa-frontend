import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const PageWrapper = ({ children }) => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.appMain}`}>{children}</div>
    </div>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node
}

export default PageWrapper
