import { useQuery } from 'react-query'

import { getFaqAPI, getFaqResultsAPI } from './api'
import {
  FAQ_QUERY_KEY,
  FAQ_RESULTS_QUERY_KEY
} from './constants'

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

export const useFaqResults = search => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery(
    [FAQ_RESULTS_QUERY_KEY, { search }],
    getFaqResultsAPI,
    {
      enabled: false
    }
  )

  return {
    getFaqResults: refetch,
    faqResults: data,
    isLoading,
    isSuccess,
    error
  }
}
