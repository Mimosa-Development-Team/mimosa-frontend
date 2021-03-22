import React, { useEffect } from 'react'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import FormControls from './components/index'
import styles from './style.module.scss'
import { useQuestionForm } from './hooks'

const ContributionForm = props => {
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
    updateErrorContribution
  } = useQuestionForm()

  useEffect(() => {
    getTags()
    getUser()
  }, [getTags, getUser])

  const renderForm = () => {
    switch (props.match.params.type) {
      case 'question':
        return (
          <FormControls.QuestionForm
            profile={getRawData(user).user}
            questionUuid={props.location.state.questionUuid}
            tagsData={tagsData}
            userData={userData}
            type={props.match.params.type}
            method={props.match.params.method}
            data={
              props.location.state.data
                ? props.location.state.data
                : null
            }
            addedContribution={addedContribution}
            addErrorContribution={addErrorContribution}
            updatedContribution={updatedContribution}
            updateIsLoadingContribution={
              updateIsLoadingContribution
            }
            updateErrorContribution={updateErrorContribution}
            addLoadingContribution={addLoadingContribution}
            addContribution={addContribution}
            updateContribution={updateContribution}
          />
        )
      case 'hypothesis':
        return (
          <FormControls.HypothesisForm
            profile={getRawData(user).user}
            questionUuid={props.location.state.questionUuid}
            tagsData={tagsData}
            userData={userData}
            type={props.match.params.type}
            method={props.match.params.method}
            data={
              props.location.state.data
                ? props.location.state.data
                : null
            }
            addedContribution={addedContribution}
            addErrorContribution={addErrorContribution}
            updatedContribution={updatedContribution}
            updateIsLoadingContribution={
              updateIsLoadingContribution
            }
            updateErrorContribution={updateErrorContribution}
            addLoadingContribution={addLoadingContribution}
            addContribution={addContribution}
            updateContribution={updateContribution}
          />
        )
      case 'experiment':
        return (
          <FormControls.ExperimentForm
            profile={getRawData(user).user}
            questionUuid={props.location.state.questionUuid}
            tagsData={tagsData}
            userData={userData}
            type={props.match.params.type}
            method={props.match.params.method}
            data={
              props.location.state.data
                ? props.location.state.data
                : null
            }
            addedContribution={addedContribution}
            addErrorContribution={addErrorContribution}
            updatedContribution={updatedContribution}
            updateIsLoadingContribution={
              updateIsLoadingContribution
            }
            updateErrorContribution={updateErrorContribution}
            addLoadingContribution={addLoadingContribution}
            addContribution={addContribution}
            updateContribution={updateContribution}
          />
        )
      case 'data':
        return (
          <FormControls.DataForm
            profile={getRawData(user).user}
            questionUuid={props.location.state.questionUuid}
            tagsData={tagsData}
            userData={userData}
            type={props.match.params.type}
            method={props.match.params.method}
            data={
              props.location.state.data
                ? props.location.state.data
                : null
            }
            addedContribution={addedContribution}
            addErrorContribution={addErrorContribution}
            updatedContribution={updatedContribution}
            updateIsLoadingContribution={
              updateIsLoadingContribution
            }
            updateErrorContribution={updateErrorContribution}
            addLoadingContribution={addLoadingContribution}
            addContribution={addContribution}
            updateContribution={updateContribution}
          />
        )
      case 'analysis':
        return (
          <FormControls.AnalysisForm
            profile={getRawData(user).user}
            questionUuid={props.location.state.questionUuid}
            tagsData={tagsData}
            userData={userData}
            type={props.match.params.type}
            method={props.match.params.method}
            data={
              props.location.state.data
                ? props.location.state.data
                : null
            }
            addedContribution={addedContribution}
            addErrorContribution={addErrorContribution}
            updatedContribution={updatedContribution}
            updateIsLoadingContribution={
              updateIsLoadingContribution
            }
            updateErrorContribution={updateErrorContribution}
            addLoadingContribution={addLoadingContribution}
            addContribution={addContribution}
            updateContribution={updateContribution}
          />
        )
      default:
        return (
          <FormControls.ContributionForm
            profile={getRawData(user).user}
            questionUuid={props.location.state.questionUuid}
            tagsData={tagsData}
            userData={userData}
            type={props.match.params.type}
            method={props.match.params.method}
            data={
              props.location.state.data
                ? props.location.state.data
                : null
            }
            addedContribution={addedContribution}
            addErrorContribution={addErrorContribution}
            updatedContribution={updatedContribution}
            updateIsLoadingContribution={
              updateIsLoadingContribution
            }
            updateErrorContribution={updateErrorContribution}
            addLoadingContribution={addLoadingContribution}
            addContribution={addContribution}
            updateContribution={updateContribution}
          />
        )
    }
  }

  return (
    <div className={`${styles.homeWrapper}`}>{renderForm()}</div>
  )
}

export default ContributionForm
