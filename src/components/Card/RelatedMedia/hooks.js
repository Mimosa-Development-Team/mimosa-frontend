import { useQuery, useMutation } from 'react-query'
import { queryClient } from 'store/state'
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
    data: addedData,
    isLoading: addMediaLoading,
    error: addMediaError,
    isSuccess: addIsSuccess,
    mutate: addData
  } = useMutation(postRelatedMedia, {
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries(MEDIA_POST_QUERY_KEY)
    }
  })

  return {
    getMedia: refetch,
    media: data,
    isLoading,
    isSuccess,
    error,

    addedData,
    addMediaLoading,
    addMediaError,
    addIsSuccess,
    addData
  }
}
