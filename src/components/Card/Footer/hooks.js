import { useMutation } from 'react-query'
import { queryClient } from 'store/state'
import { deleteContributionAPI } from './api'
import { CONTRIBUTION_DELETE_QUERY_KEY } from './constants'

export const useQuestionForm = () => {
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
  return {
    deleteContribution,
    deleteIsLoadingContribution,
    deleteErrorContribution,
    deleteMutate,
    deleteIsSuccessContribution
  }
}
