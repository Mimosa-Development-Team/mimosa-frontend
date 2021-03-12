import React from 'react'
import Card from 'components/Card'
import { Link } from 'react-router-dom'
import SearchField from 'components/SearchField'
import { Button } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import styles from './style.module.scss'

const data = {
  type: 'question',
  title: 'Can an algorithm distinguish?',
  content: 'Sed ut perspiciatis unde omnis iste',
  author: 'Chidi Anagonye',
  date: 'Nov. 1, 2020',
  tags: ['Hot Topic', 'Recent']
}

const MemberDashboard = () => {
  return (
    <div className={`${styles.homeWrapper}`}>
      <div className={`${styles.groupHeader}`}>
        <SearchField className={`${styles.searchBox}`} />
        <Button
          component={Link}
          to="/contribution-form"
          className={`${styles.questionBtn}`}
          size="large"
          variant="contained"
        >
          <AddBoxIcon /> NEW QUESTION
        </Button>
      </div>
      <div className={`${styles.content}`}>
        <Link
          to="/contribution"
          style={{ textDecoration: 'none' }}
        >
          <Card
            tags={data.tags}
            type={data.type}
            title={data.title}
            content={data.content}
          />
        </Link>
      </div>
    </div>
  )
}

export default MemberDashboard
