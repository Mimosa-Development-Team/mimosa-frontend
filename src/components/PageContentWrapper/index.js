import React from 'react'
import PropTypes from 'prop-types'
import CustomScrollbar from 'components/CustomScrollbar'
import styles from './styles.module.scss'

const PageContentWrapper = ({ children }) => {
  return (
    <div className={`${styles.contentWrapper}`}>
      <CustomScrollbar>{children}</CustomScrollbar>
    </div>
  )
}

PageContentWrapper.propTypes = {
  children: PropTypes.node
}

export default PageContentWrapper
