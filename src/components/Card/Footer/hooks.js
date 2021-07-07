import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'
import {
  deleteContributionAPI,
  getCommentCountAPI,
  getRelatedMediaCountAPI,
  getContributionChildrenCountAPI
} from './api'
import {
  CONTRIBUTION_DELETE_QUERY_KEY,
  COMMENT_GET_COUNT_QUERY_KEY,
  RELATED_MEDIA_GET_COUNT_QUERY_KEY,
  CONTRIBUTION_GET_CHILDREN_COUNT_QUERY_KEY
} from './constants'

export const useQuestionForm = id => {
  const {
    data: deleteContribution,
    isLoading: deleteIsLoadingContribution,
    error: deleteErrorContribution,
    mutate: deleteMutate,
    isSuccess: deleteIsSuccessContribution
  } = useMutation(deleteContributionAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        CONTRIBUTION_DELETE_QUERY_KEY
      )
    }
  })

  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery(
    [COMMENT_GET_COUNT_QUERY_KEY, { id }],
    getCommentCountAPI,
    {
      enabled: false
    }
  )

  const {
    data: mediaCount,
    isLoading: mediaCountIsLoading,
    error: mediaCountIsError,
    refetch: getMediaCount,
    isSuccess: mediaCountIsSuccess
  } = useQuery(
    [RELATED_MEDIA_GET_COUNT_QUERY_KEY, { id }],
    getRelatedMediaCountAPI,
    {
      enabled: false
    }
  )

  const {
    data: childrenCount,
    isLoading: childrenCountIsLoading,
    error: childrenCountIsError,
    refetch: getContributionChildrenCount,
    isSuccess: childrenCountIsSuccess
  } = useQuery(
    [CONTRIBUTION_GET_CHILDREN_COUNT_QUERY_KEY, { id }],
    getContributionChildrenCountAPI,
    {
      // what is this for
      enabled: false
    }
  )

  return {
    getCommentCount: refetch,
    comment: data,
    isLoading,
    isSuccess,
    error,

    getMediaCount,
    mediaCount,
    mediaCountIsLoading,
    mediaCountIsSuccess,
    mediaCountIsError,

    getContributionChildrenCount,
    childrenCount,
    childrenCountIsLoading,
    childrenCountIsError,
    childrenCountIsSuccess,

    deleteContribution,
    deleteIsLoadingContribution,
    deleteErrorContribution,
    deleteMutate,
    deleteIsSuccessContribution
  }
}
