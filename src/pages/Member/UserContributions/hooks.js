import { useInfiniteQuery } from 'react-query'

import { getUserQuestionsAPI } from './api'
import { USER_CONTRIB_QUERY_KEY } from './constants'

export const useUserContributions = (orderBy, userId) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
    refetch
  } = useInfiniteQuery(
    [USER_CONTRIB_QUERY_KEY, { pageNum: 1, orderBy, userId }],
    getUserQuestionsAPI,
    {
      getNextPageParam: lastPage => lastPage.nextPage
    }
  )

  return {
    getUserContributions: fetchNextPage,
    userContributions: data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    error,
    refetch
  }
}
