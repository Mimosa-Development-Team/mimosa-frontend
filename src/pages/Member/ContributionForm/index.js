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
    tagsData,
    userData,
    addContribution,
    updateContribution,
    addLoadingContribution,
    addedContribution,
    addErrorContribution,
    updatedContribution,
    updateIsLoadingContribution,
    updateErrorContribution,
    addIsSuccessContribution,
    updateIsSuccessContribution,
    relatedMediaData,
    deleteContribution,
    deleteIsLoadingContribution,
    deleteErrorContribution,
    deleteMutate,
    deleteIsSuccessContribution,
    getRelatedMedia,
    resetAdd,
    resetUpdate,
    deletedRelatedMedia,
    deleteIsLoadingRelatedMedia,
    deleteErrorRelatedMedia,
    deleteRelatedMediaMutate,
    resetMediaDelete,
    deleteIsSuccessRelatedMedia
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
        {console.log(location.state.data)}
        <Contribution
          profile={getRawData(user).user}
          tagsData={tagsData}
          relatedMediaData={relatedMediaData}
          addedData={addedContribution}
          updatedData={updatedContribution}
          questionUuid={location.state.questionUuid}
          userData={userData}
          type={match.params.type}
          method={match.params.method}
          data={location.state.data ? location.state.data : null}
          addedContribution={addedContribution}
          addErrorContribution={addErrorContribution}
          updatedContribution={updatedContribution}
          updateIsLoadingContribution={
            updateIsLoadingContribution
          }
          deletedRelatedMedia={deletedRelatedMedia}
          deleteIsLoadingRelatedMedia={
            deleteIsLoadingRelatedMedia
          }
          resetMediaDelete={resetMediaDelete}
          deleteErrorRelatedMedia={deleteErrorRelatedMedia}
          deleteRelatedMediaMutate={deleteRelatedMediaMutate}
          deleteIsSuccessRelatedMedia={
            deleteIsSuccessRelatedMedia
          }
          updateErrorContribution={updateErrorContribution}
          addLoadingContribution={addLoadingContribution}
          addIsSuccessContribution={addIsSuccessContribution}
          updateIsSuccessContribution={
            updateIsSuccessContribution
          }
          addContribution={addContribution}
          updateContribution={updateContribution}
          getRelatedMedia={getRelatedMedia}
          resetAdd={resetAdd}
          resetUpdate={resetUpdate}
          deleteContribution={deleteContribution}
          deleteIsLoadingContribution={
            deleteIsLoadingContribution
          }
          deleteErrorContribution={deleteErrorContribution}
          deleteMutate={deleteMutate}
          deleteIsSuccessContribution={
            deleteIsSuccessContribution
          }
        />
      </PageContentWrapper>
    </PageWrapper>
  )
}

export default ContributionForm
