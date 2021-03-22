import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from 'components/Card'
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
  const history = useHistory()

  return (
    <>
      <LeftSidebar showNav links={ROUTES} />
      <PageContentWrapper>
        <div className={`${styles.groupHeader}`}>
          <SearchField className={`${styles.searchBox}`} />
          <Button
            className={`${styles.questionBtn}`}
            size="large"
            variant="contained"
            onClick={() => {
              history.push('/contribution-form/question/new', {
                type: 'new'
              })
            }}
          >
            <AddBoxIcon /> NEW QUESTION
          </Button>
        </div>
        <div
          className={`${styles.content}`}
          onClick={() => {
            history.push(
              '/contribution/736db584-4e09-4930-9297-d293d260b10d'
            )
          }}
        >
          <Card
            tags={data.tags}
            type={data.type}
            title={data.title}
            form={false}
            content={data.content}
          />
        </div>
        <div
          className={`${styles.content}`}
          onClick={() => {
            history.push(
              '/contribution/d4397f81-25b8-493d-a6e6-7e99ee19fcc3'
            )
          }}
        >
          <Card
            tags={data.tags}
            type={data.type}
            title={data.title}
            form={false}
            content={data.content}
          />
        </div>
      </PageContentWrapper>
    </>
  )
}

export default MemberDashboard
