import { useQuery } from 'react-query'

import { getResultsAPI } from './api'
import { RESULTS_QUERY_KEY } from './constants'

export const useResults = search => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery([RESULTS_QUERY_KEY, { search }], getResultsAPI, {
    enabled: false
  })

  return {
    getResults: refetch,
    results: data,
    isLoading,
    isSuccess,
    error
  }
}
