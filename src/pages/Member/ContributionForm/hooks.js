import { useMutation, useQuery } from 'react-query'
import { toast } from 'material-react-toastify'
import { useHistory } from 'react-router-dom'
import { queryClient } from 'store/state'
import {
  getUserAPI,
  getTagsAPI,
  postContributionAPI,
  putContributionAPI,
  getRelatedMediaAPI,
  deleteContributionAPI,
  deleteRelatedMediaAPI
} from './api'
import {
  USER_QUERY_KEY,
  TAGS_QUERY_KEY,
  CONTRIBUTION_POST_QUERY_KEY,
  CONTRIBUTION_PUT_QUERY_KEY,
  RELATEDMEDIA_GET_QUERY_KEY,
  CONTRIBUTION_DELETE_QUERY_KEY,
  RELATEDMEDIA_DELETE_QUERY_KEY
} from './constants'

export const useQuestionForm = id => {
  const history = useHistory()
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
    data: relatedMedia,
    refetch: relatedMediaFetch
  } = useQuery(
    RELATEDMEDIA_GET_QUERY_KEY,
    () => getRelatedMediaAPI(id),
    {
      enabled: false
    }
  )

  const {
    data: addedContribution,
    isLoading: addLoadingContribution,
    error: addErrorContribution,
    mutate: postMutate,
    isSuccess: addIsSuccessContribution,
    reset: resetAdd
  } = useMutation(postContributionAPI, {
    onSuccess: data => {
      toast.success('Create Contribution Success!')
      queryClient.invalidateQueries(CONTRIBUTION_POST_QUERY_KEY)
      if (data.contribution.category === 'question') {
        history.push('/')
      } else {
        history.push(
          `/contribution/${data.contribution.uuid}?list=${data.contribution.mainParentId}`
        )
      }
    },
    onError: () => {
      toast.error('Create Contribution Error!')
      queryClient.invalidateQueries(CONTRIBUTION_POST_QUERY_KEY)
    }
  })

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
    data: deletedRelatedMedia,
    isLoading: deleteIsLoadingRelatedMedia,
    error: deleteErrorRelatedMedia,
    mutate: deleteRelatedMediaMutate,
    isSuccess: deleteIsSuccessRelatedMedia,
    reset: resetMediaDelete
  } = useMutation(deleteRelatedMediaAPI, {
    onSuccess: () => {
      relatedMediaFetch()
      queryClient.invalidateQueries(
        RELATEDMEDIA_DELETE_QUERY_KEY
      )
    }
  })

  const {
    data: updatedContribution,
    isLoading: updateIsLoadingContribution,
    error: updateErrorContribution,
    mutate: updateMutate,
    isSuccess: updateIsSuccessContribution,
    reset: resetUpdate
  } = useMutation(putContributionAPI, {
    onSuccess: ({ data }) => {
      toast.success('Update Contribution Success!')
      relatedMediaFetch()
      queryClient.invalidateQueries(CONTRIBUTION_PUT_QUERY_KEY)
      history.push(
        `/contribution/${data.uuid}?list=${
          data.mainParentId ? data.mainParentId : data.id
        }`
      )
    }
  })

  return {
    getTags: tagsFetch,
    tagsData: tags,

    getUser: userFetch,
    userData: user,

    relatedMediaData: relatedMedia,
    getRelatedMedia: relatedMediaFetch,

    addContribution: postMutate,
    addedContribution,
    addLoadingContribution,
    addErrorContribution,
    addIsSuccessContribution,
    resetAdd,

    updateContribution: updateMutate,
    updatedContribution,
    updateIsLoadingContribution,
    updateErrorContribution,
    updateIsSuccessContribution,
    resetUpdate,

    deleteContribution,
    deleteIsLoadingContribution,
    deleteErrorContribution,
    deleteMutate,
    deleteIsSuccessContribution,

    deletedRelatedMedia,
    deleteIsLoadingRelatedMedia,
    deleteErrorRelatedMedia,
    deleteRelatedMediaMutate,
    resetMediaDelete,
    deleteIsSuccessRelatedMedia
  }
}
