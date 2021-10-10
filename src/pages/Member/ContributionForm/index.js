import React, { useEffect } from 'react'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import Contribution from './components/contribution'
import { useQuestionForm } from './hooks'

const ContributionForm = props => {
  const { location, match } = props
  const { user } = useGlobalState()
  const {
    getTags,
    getUser,
    tagsData,
    userData
  } = useQuestionForm()

  useEffect(() => {
    getTags()
    getUser()
  }, [getTags, getUser])

  return (
    <PageWrapper>
      <PageContentWrapper>
        <Contribution
          props={
            location && location.state && location.state.data
          }
          method={match && match.params && match.params.method}
          tagsData={tagsData}
          userData={userData}
          profile={getRawData(user).user}
          type={match && match.params && match.params.type}
        />
      </PageContentWrapper>
    </PageWrapper>
  )
}

export default ContributionForm
