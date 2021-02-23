import React from 'react'
import MainNav from './MainNav'

const DashboardWrapper = ({ children, links }) => {
  return (
    <div>
      <MainNav links={links} />
      <div>{children}</div>
    </div>
  )
}

export default DashboardWrapper
