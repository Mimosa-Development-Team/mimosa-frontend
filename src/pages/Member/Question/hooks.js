import { useQuery } from 'react-query'

import { getContributionAPI } from './api'
import { CONTRIB_QUERY_KEY } from './constants'

export const useContribution = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery(CONTRIB_QUERY_KEY, getContributionAPI, {
    enabled: false
  })

  return {
    getContribution: refetch,
    contribution: data,
    isLoading,
    isSuccess,
    error
  }
}
