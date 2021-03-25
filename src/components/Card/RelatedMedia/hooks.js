import { useQuery } from 'react-query'
import { getMediaAPI } from './api'
import { MEDIA_QUERY_KEY } from './constants'

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

  return {
    getMedia: refetch,
    media: data,
    isLoading,
    isSuccess,
    error
  }
}
