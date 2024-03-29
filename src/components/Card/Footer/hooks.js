import { useMutation, useQuery } from 'react-query'
import { toast } from 'material-react-toastify'
import { useHistory } from 'react-router-dom'
import { queryClient } from 'store/state'
import capitalizeText from 'utils/parsing/capitalize'
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
  const history = useHistory()
  const {
    data: deleteContribution,
    isLoading: deleteIsLoadingContribution,
    error: deleteErrorContribution,
    mutate: deleteMutate,
    isSuccess: deleteIsSuccessContribution
  } = useMutation(deleteContributionAPI, {
    onSuccess: data => {
      toast.success(
        `${capitalizeText(
          data.data.category
        )} was deleted successfully.`
      )
      queryClient.invalidateQueries(
        CONTRIBUTION_DELETE_QUERY_KEY
      )
      if (data.data.category === 'question') {
        history.push('/')
      } else {
        history.push(
          `/contribution?list=${data.data.mainParentId}&active=${data.data.parentId}&from=home`
        )
      }
    }
  })

  const {
    data: deleteDraft,
    isLoading: deleteIsLoadingDraft,
    error: deleteErrorDraft,
    mutate: deleteDraftMutate,
    isSuccess: deleteIsSuccessDraft
  } = useMutation(deleteDraftAPI, {
    onSuccess: data => {
      toast.success(
        `Draft ${data.data.category} was deleted successfully.`
      )
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
