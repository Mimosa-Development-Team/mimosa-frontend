import React, { useEffect } from 'react'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import Contribution from './components/contribution'
import styles from './style.module.scss'
import { useQuestionForm } from './hooks'

const ContributionForm = props => {
  const { location, match } = props
  const { user } = useGlobalState()
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
    updateIsSuccessContribution
  } = useQuestionForm()

  useEffect(() => {
    getTags()
    getUser()
  }, [getTags, getUser])

  return (
    <div className={`${styles.homeWrapper}`}>
      <Contribution
        profile={getRawData(user).user}
        questionUuid={location.state.questionUuid}
        tagsData={tagsData}
        addedData={addedContribution}
        updatedData={updatedContribution}
        userData={userData}
        type={match.params.type}
        method={match.params.method}
        data={location.state.data ? location.state.data : null}
        addedContribution={addedContribution}
        addErrorContribution={addErrorContribution}
        updatedContribution={updatedContribution}
        updateIsLoadingContribution={updateIsLoadingContribution}
        updateErrorContribution={updateErrorContribution}
        addLoadingContribution={addLoadingContribution}
        addIsSuccessContribution={addIsSuccessContribution}
        updateIsSuccessContribution={updateIsSuccessContribution}
        addContribution={addContribution}
        updateContribution={updateContribution}
      />
    </div>
  )
}

export default ContributionForm
