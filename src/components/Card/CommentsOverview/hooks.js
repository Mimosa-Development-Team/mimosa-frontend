import { useQuery } from 'react-query'

import { getCommentsAPI } from './api'
import { COMMENT_QUERY_KEY } from './constants'

export const useComments = id => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery([COMMENT_QUERY_KEY, { id }], getCommentsAPI, {
    enabled: false
  })

  return {
    getComments: refetch,
    comments: data,
    isLoading,
    isSuccess,
    error
  }
}
