import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'
import {
  getUserAPI,
  getTagsAPI,
  postContributionAPI
} from './api'
import {
  USER_QUERY_KEY,
  TAGS_QUERY_KEY,
  CONTRIBUTION_POST_QUERY_KEY
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
    mutate
  } = useMutation(postContributionAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(CONTRIBUTION_POST_QUERY_KEY)
    }
  })

  return {
    getTags: tagsFetch,
    tags,

    getUser: userFetch,
    user,

    addContribution: mutate,
    addedContribution,
    addLoadingContribution,
    addErrorContribution
  }
}

// import { useMutation } from 'react-query'
// import { queryClient } from 'store/state'

// import { postContributionAPI, putContributionAPI } from './api'
// import { TO_DO_QUERY_KEY } from './constants'

// export const useContributions = () => {
//   const {
//     data: updatedContribution,
//     isLoading: updatedContributionLoading,
//     error: updatedContributionError,
//     updateMutate: mutate
//   } = useMutation(putContributionAPI, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(TO_DO_QUERY_KEY)
//     }
//   })

//   const {
//     data: addedContribution,
//     isLoading: addContributionLoading,
//     error: addContributionError,
//     addMutate: mutate
//   } = useMutation(postContributionAPI, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(TO_DO_QUERY_KEY)
//     }
//   })

//   return {
//     updateContribution: updateMutate,
//     updatedContribution,
//     updatedContributionLoading,
//     updatedContributionError,

//     addContribution: addMutate,
//     addedContribution,
//     addContributionLoading,
//     addContributionError
//   }
// }
