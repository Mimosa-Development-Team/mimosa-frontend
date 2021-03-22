import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'
import {
  getUserAPI,
  getTagsAPI,
  postContributionAPI,
  putContributionAPI
} from './api'
import {
  USER_QUERY_KEY,
  TAGS_QUERY_KEY,
  CONTRIBUTION_POST_QUERY_KEY,
  CONTRIBUTION_PUT_QUERY_KEY
} from './constants'

export const useQuestionForm = () => {
  const { data: user, refetch: userFetch } = useQuery(
    USER_QUERY_KEY,
    getUserAPI,
    {
      enabled: false
    }
  )

  const { data: tags, refetch: tagsFetch } = useQuery(
    TAGS_QUERY_KEY,
    getTagsAPI,
    {
      enabled: false
    }
  )

  const {
    data: addedContribution,
    isLoading: addLoadingContribution,
    error: addErrorContribution,
    mutate: postMutate
  } = useMutation(postContributionAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(CONTRIBUTION_POST_QUERY_KEY)
    }
  })

  const {
    data: updatedContribution,
    isLoading: updateIsLoadingContribution,
    error: updateErrorContribution,
    mutate: updateMutate
  } = useMutation(putContributionAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(CONTRIBUTION_PUT_QUERY_KEY)
    }
  })

  return {
    getTags: tagsFetch,
    tagsData: tags,

    getUser: userFetch,
    userData: user,

    addContribution: postMutate,
    addedContribution,
    addLoadingContribution,
    addErrorContribution,

    updateContribution: updateMutate,
    updatedContribution,
    updateIsLoadingContribution,
    updateErrorContribution
  }
}