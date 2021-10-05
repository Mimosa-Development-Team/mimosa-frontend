import { useQuery } from 'react-query'

import { getContributionAPI } from './api'
import { CONTRIB_QUERY_KEY } from './constants'

export const useContribution = id => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess,
    remove
  } = useQuery(CONTRIB_QUERY_KEY, () => getContributionAPI(id), {
    enabled: false
  })

  return {
    getContribution: refetch,
    contribution: data,
    remove,
    isLoading,
    isSuccess,
    error
  }
}
