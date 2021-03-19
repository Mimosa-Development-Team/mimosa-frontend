import React, { useEffect } from 'react'
import { useGlobalState } from 'store/state'
import FormControls from './components/index'
import styles from './style.module.scss'
import { useQuestionForm } from './hooks'

const ContributionForm = props => {
  const { location } = props
  const { user } = useGlobalState()
  const {
    getTags,
    getUser,
    tagsData,
    userData,
    addContribution,
    updateContribution
  } = useQuestionForm()

  useEffect(() => {
    getTags()
    getUser()
  }, [getTags, getUser])

  const renderForm = () => {
    switch (location.state ? location.state.category : false) {
      case 'question':
        return location.state.type === 'new' ? (
          <FormControls.ContributionForm
            profile={user}
            tagsData={tagsData}
            userData={userData}
            propsData={location.state}
            type="hypothesis"
            contributionAction={
              location.state.type === 'new'
                ? addContribution
                : updateContribution
            }
          />
        ) : (
          <FormControls.QuestionForm
            profile={user}
            tagsData={tagsData}
            userData={userData}
            type="question"
            contributionAction={
              location.state.type === 'new'
                ? addContribution
                : updateContribution
            }
          />
        )
      case 'hypothesis':
        return (
          <FormControls.ContributionForm
            profile={user}
            tagsData={tagsData}
            userData={userData}
            propsData={location.state}
            type={
              location.state.type === 'new'
                ? 'experiment'
                : 'hypothesis'
            }
            contributionAction={
              location.state.type === 'new'
                ? addContribution
                : updateContribution
            }
          />
        )
      case 'experiment':
        return (
          <FormControls.ContributionForm
            profile={user}
            tagsData={tagsData}
            userData={userData}
            propsData={location.state}
            type={
              location.state.type === 'new'
                ? 'data'
                : 'experiment'
            }
            contributionAction={
              location.state.type === 'new'
                ? addContribution
                : updateContribution
            }
          />
        )
      case 'data':
        return (
          <FormControls.ContributionForm
            profile={user}
            tagsData={tagsData}
            userData={userData}
            propsData={location.state}
            type={
              location.state.type === 'new' ? 'analysis' : 'data'
            }
            contributionAction={
              location.state.type === 'new'
                ? addContribution
                : updateContribution
            }
          />
        )
      case 'analysis':
        return (
          <FormControls.ContributionForm
            profile={user}
            tagsData={tagsData}
            userData={userData}
            propsData={location.state}
            type="anaylsis"
            contributionAction={
              location.state.type === 'new'
                ? addContribution
                : updateContribution
            }
          />
        )
      default:
        return (
          <FormControls.QuestionForm
            profile={user}
            tagsData={tagsData}
            userData={userData}
            contributionAction={
              location.state.type === 'new'
                ? addContribution
                : updateContribution
            }
          />
        )
    }
  }

  return (
    <div className={`${styles.homeWrapper}`}>
      {console.log(location)}
      {renderForm()}
      {/* {location.state &&
      location.state.category === 'question' ? (
        <FormControls.ContributionForm
          profile={user}
          tagsData={tagsData}
          userData={userData}
          propsData={location.state}
          addContribution={addContribution}
        />
      ) : (
        <FormControls.ContributionForm
          profile={user}
          tagsData={tagsData}
          userData={userData}
          propsData={location.state}
          addContribution={addContribution}
        />
      )} */}
    </div>
  )
}

export default ContributionForm
