import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const PageContentWrapper = ({ children }) => {
  return (
    <div className={`${styles.pageWrapper}`}>
      <div className={`${styles.contentWrapper}`}>
        {children}
      </div>
    </div>
  )
}

PageContentWrapper.propTypes = {
  children: PropTypes.node
}

export default PageContentWrapper
