import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import LeftNav from './LeftNav'

const DashboardWrapper = ({ children, links }) => {
  return (
    <div>
      <Header />
      <div>
        <LeftNav links={links} />
        <div>{children}</div>
      </div>
    </div>
  )
}

DashboardWrapper.propTypes = {
  children: PropTypes.node,
  links: PropTypes.array
}

export default DashboardWrapper
