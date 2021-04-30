import { useQuery } from 'react-query'

import { getContributionAPI } from './api'
import { CONTRIB_QUERY_KEY } from './constants'

export const useContribution = userId => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery(
    [CONTRIB_QUERY_KEY, { userId }],
    getContributionAPI,
    {
      enabled: false
    }
  )

  return {
    getContribution: refetch,
    contribution: data,
    isLoading,
    isSuccess,
    error
  }
}
