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
  // const { id } = props.location.state.data
  const { user } = useGlobalState()
  const [id, setId] = useState(null)
  const {
    getTags,
    getUser,
    getRelatedMedia,

    relatedMediaData,
    tagsData,
    userData,

    addContribution,
    updateContribution,
    deleteMutate,
    deleteRelatedMediaMutate
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
          questionUuid={location.state.questionUuid}
          userData={userData}
          type={match.params.type}
          method={match.params.method}
          data={location.state.data ? location.state.data : null}
          deleteRelatedMediaMutate={deleteRelatedMediaMutate}
          addContribution={addContribution}
          updateContribution={updateContribution}
          getRelatedMedia={getRelatedMedia}
          deleteMutate={deleteMutate}
        />
      </PageContentWrapper>
    </PageWrapper>
  )
}

export default ContributionForm
