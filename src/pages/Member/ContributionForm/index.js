/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import PageWrapper from 'components/PageWrapper'
import PageContentWrapper from 'components/PageContentWrapper'
import Contribution from './components/contribution'
import { useQuestionForm } from './hooks'

const ContributionForm = props => {
  const { location, match } = props
  const { user } = useGlobalState()
  const [id, setId] = useState(null)
  const {
    getTags,
    getUser,
    tagsData,
    userData,
    addContribution,
    updateContribution,
    relatedMediaData,
    getRelatedMedia
  } = useQuestionForm(id)

  useEffect(() => {
    getTags()
    getUser()
    const fetch = async () => {
      await setId(location.state.data.id)
      await getRelatedMedia()
    }
    if (match.params.method === 'update') {
      fetch()
    }
  }, [
    getTags,
    getUser,
    match.params.method,
    getRelatedMedia,
    location
  ])

  return (
    <PageWrapper>
      <PageContentWrapper>
        <Contribution
          profile={getRawData(user).user}
          tagsData={tagsData}
          relatedMediaData={relatedMediaData}
          userData={userData}
          type={match.params.type}
          method={match.params.method}
          data={
            location.state && location.state.data
              ? location.state.data
              : null
          }
          addContribution={addContribution}
          updateContribution={updateContribution}
          getRelatedMedia={getRelatedMedia}
        />
      </PageContentWrapper>
    </PageWrapper>
  )
}

export default ContributionForm
