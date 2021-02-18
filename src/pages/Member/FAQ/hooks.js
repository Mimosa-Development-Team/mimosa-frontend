import { useQuery } from 'react-query'

import { getFaqAPI } from './api'
import { FAQ_QUERY_KEY } from './constants'

export const useFaq = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery(FAQ_QUERY_KEY, getFaqAPI, {
    enabled: false
  })

  return {
    getFaq: refetch,
    faq: data,
    isLoading,
    isSuccess,
    error
  }
}
