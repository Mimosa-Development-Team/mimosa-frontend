import { useInfiniteQuery } from 'react-query'

import { getQuestionsAPI } from './api'
import { QUESTIONS_QUERY_KEY } from './constants'

export const useQuestions = (orderBy, userId) => {
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
    [QUESTIONS_QUERY_KEY, { pageNum: 1, orderBy, userId }],
    getQuestionsAPI,
    {
      getNextPageParam: lastPage => lastPage.nextPage
    }
  )

  return {
    getQuestions: fetchNextPage,
    questions: data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    error,
    refetch
  }
}
