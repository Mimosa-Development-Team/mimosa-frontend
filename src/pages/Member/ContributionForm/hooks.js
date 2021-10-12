import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'
import { toast } from 'material-react-toastify'
import { useHistory } from 'react-router-dom'
import capitalizeText from 'utils/parsing/capitalize'
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

export const useQuestionForm = (id, redirectUrl) => {
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
      queryClient.invalidateQueries(CONTRIBUTION_POST_QUERY_KEY)
      if (redirectUrl && redirectUrl === 'hierarchy') {
        if (data.data) {
          if (data.data.status === 'publish') {
            toast.success(
              `${capitalizeText(
                data.data.category
              )} contribution was published successfully.`
            )
          }
          if (data.data.category === 'question') {
            history.push(
              `/contribution/${data.data.uuid}?list=${data.data.id}&from=home`
            )
          } else {
            history.push(
              `/contribution/${data.data.uuid}?list=${
                data.data.mainParentId ||
                data.data.parentId ||
                data.data.id
              }&from=home`
            )
          }
        }
      }
      if (redirectUrl && redirectUrl === 'new-contribution') {
        if (data.data) {
          if (data.data.status === 'publish') {
            toast.success(
              `${capitalizeText(
                data.data.category
              )} contribution was published successfully.`
            )
          }
          if (data.data.category === 'question') {
            history.push(`/contribution-form/hypothesis/new`, {
              type: 'new',
              data: data.data
            })
          }
          if (data.data.category === 'hypothesis') {
            history.push(`/contribution-form/experiment/new`, {
              type: 'new',
              data: data.data
            })
          }
          if (data.data.category === 'experiment') {
            history.push(`/contribution-form/data/new`, {
              type: 'new',
              data: data.data
            })
          }
          if (data.data.category === 'data') {
            history.push(`/contribution-form/analysis/new`, {
              type: 'new',
              data: data.data
            })
          }
        }
      }
    },
    onError: () => {
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
    onSuccess: data => {
      queryClient.invalidateQueries(CONTRIBUTION_PUT_QUERY_KEY)
      if (data && data.data && data.data.status === 'publish') {
        if (window.location.href.split('/').pop() === 'new') {
          toast.success(
            `${capitalizeText(
              data.data.category
            )} contribution was published successfully.`
          )
          if (data.data.category === 'question') {
            history.push(
              `/contribution/${data.data.uuid}?list=${data.data.id}&from=home`
            )
          } else {
            history.push(
              `/contribution/${data.data.uuid}?list=${
                data.data.mainParentId ||
                data.data.parentId ||
                data.data.id
              }&from=home`
            )
          }
        } else if (
          window.location.href.split('/').pop() === 'update'
        ) {
          toast.success(
            `${capitalizeText(
              data.data.category
            )} contribution was updated successfully.`
          )
          if (data.data.category === 'question') {
            history.push(
              `/contribution/${data.data.uuid}?list=${data.data.id}&from=home`
            )
          } else {
            history.push(
              `/contribution/${data.data.uuid}?list=${
                data.data.mainParentId ||
                data.data.parentId ||
                data.data.id
              }&from=home`
            )
          }
        }
      }
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
