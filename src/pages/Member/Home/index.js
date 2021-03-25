import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Card from 'components/Card'
import LeftSidebar from 'components/LeftSidebar'
import PageContentWrapper from 'components/PageContentWrapper'
import SearchField from 'components/SearchField'
import { Button } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { ROUTES } from '../constants'
import styles from './style.module.scss'
import { useQuestions } from './hooks'

// const data = {
//   category: 'question',
//   subject: 'Can an algorithm distinguish?',
//   details: 'Sed ut perspiciatis unde omnis iste',
//   author: ['Chidi Anagonye'],
//   postedBy: 'Chidi Anagonye',
//   dateCreated: 'Nov. 1, 2020',
//   tags: ['Hot Topic', 'Recent']
// }

const MemberDashboard = () => {
  const history = useHistory()
  const { questions, getQuestions } = useQuestions()

  useEffect(() => {
    getQuestions()
  }, [getQuestions])

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
        {questions ? (
          <>
            {(questions || []).map(data => (
              <div
                className={`${styles.content}`}
                onClick={() => {
                  history.push(`/contribution/${data.uuid}`)
                }}
              >
                <Card data={data} form={false} />
              </div>
            ))}
          </>
        ) : null}
      </PageContentWrapper>
    </>
  )
}

export default MemberDashboard
