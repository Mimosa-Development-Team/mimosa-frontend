import React from 'react'
import Card from 'components/Card'
import { Link } from 'react-router-dom'
import LeftSidebar from 'components/LeftSidebar'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import { Button } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { ROUTES } from '../constants'
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
    <>
      <LeftSidebar showNav links={ROUTES} />
      <PageContentWrapper>
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
      </PageContentWrapper>
    </>
  )
}

export default MemberDashboard
