import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'
import {
  deleteContributionAPI,
  deleteDraftAPI,
  getCommentCountAPI,
  getRelatedMediaCountAPI
} from './api'
import {
  CONTRIBUTION_DELETE_QUERY_KEY,
  DRAFT_DELETE_QUERY_KEY,
  COMMENT_GET_COUNT_QUERY_KEY,
  RELATED_MEDIA_GET_COUNT_QUERY_KEY
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
    data: deleteDraft,
    isLoading: deleteIsLoadingDraft,
    error: deleteErrorDraft,
    mutate: deleteDraftMutate,
    isSuccess: deleteIsSuccessDraft
  } = useMutation(deleteDraftAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(DRAFT_DELETE_QUERY_KEY)
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

    deleteContribution,
    deleteIsLoadingContribution,
    deleteErrorContribution,
    deleteMutate,
    deleteIsSuccessContribution,

    deleteDraft,
    deleteIsLoadingDraft,
    deleteErrorDraft,
    deleteDraftMutate,
    deleteIsSuccessDraft
  }
}
