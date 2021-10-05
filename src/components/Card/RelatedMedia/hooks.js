import { useQuery, useMutation } from 'react-query'
import { toast } from 'material-react-toastify'
import { queryClient } from 'store/state'
import { getRelatedMediaCountAPI } from '../Footer/api'
import { RELATED_MEDIA_GET_COUNT_QUERY_KEY } from '../Footer/constants'
import { getMediaAPI, postRelatedMedia } from './api'
import {
  MEDIA_QUERY_KEY,
  MEDIA_POST_QUERY_KEY
} from './constants'

export const useMedia = id => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery([MEDIA_QUERY_KEY, { id }], getMediaAPI, {
    enabled: false
  })

  const {
    data: relatedMediaCount,
    isLoading: relatedMediaCountIsLoading,
    error: relatedMediaCountError,
    refetch: getRelatedMediaCount,
    isSuccess: relatedMediaCountSuccess
  } = useQuery(
    [RELATED_MEDIA_GET_COUNT_QUERY_KEY, { id }],
    getRelatedMediaCountAPI,
    {
      enabled: false
    }
  )

  const {
    data: addedData,
    isLoading: addMediaLoading,
    error: addMediaError,
    isSuccess: addIsSuccess,
    mutate: addData,
    reset
  } = useMutation(postRelatedMedia, {
    onSuccess: () => {
      refetch()
      toast.success('Add Related Media Success!')
      getRelatedMediaCount()
      queryClient.invalidateQueries(MEDIA_POST_QUERY_KEY)
    },
    onError: () => {
      toast.error('Add Related Media Failed!')
    }
  })

  return {
    getMedia: refetch,
    media: data,
    isLoading,
    isSuccess,
    error,

    relatedMediaCount,
    relatedMediaCountIsLoading,
    relatedMediaCountError,
    getRelatedMediaCount,
    relatedMediaCountSuccess,

    addedData,
    addMediaLoading,
    addMediaError,
    addIsSuccess,
    addData,
    reset
  }
}
