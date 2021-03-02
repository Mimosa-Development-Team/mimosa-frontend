import React from 'react'
import Card from 'components/Card'

const data = {
  type: 'question',
  title: 'Can an algorithm distinguish ?',
  content: 'Sed ut perspiciatis unde omnis iste',
  author: 'Chidi Anagonye',
  date: 'Nov. 1, 2020',
  tags: ['Hot Topic', 'Recent']
}

const MemberDashboard = () => {
  return (
    <Card
      tags={data.tags}
      type={data.type}
      title={data.title}
      content={data.content}
    />
  )
}

export default MemberDashboard
