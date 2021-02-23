import React from 'react'
import MainNav from './MainNav'

const DashboardWrapper = props => {
  const { children, links } = props
  return (
    <div>
      <MainNav links={links} />
      <div>{children}</div>
    </div>
  )
}

export default DashboardWrapper
