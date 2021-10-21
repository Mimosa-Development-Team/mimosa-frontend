import { useQuery } from 'react-query'

import { getContributionAPI, getSingleAPI } from './api'
import { CONTRIB_QUERY_KEY, SINGLE_QUERY_KEY } from './constants'

export const useContribution = (id, value) => {
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

  const {
    data: singledata,
    isLoading: singleLoading,
    error: singleError,
    refetch: singleRefetch,
    isSuccess: singleSuccess
  } = useQuery(SINGLE_QUERY_KEY, () => getSingleAPI(value), {
    enabled: false
  })

  return {
    getContribution: refetch,
    contribution: data,
    remove,
    isLoading,
    isSuccess,
    error,

    singleError,
    singledata,
    singleLoading,
    singleRefetch,
    singleSuccess
  }
}
