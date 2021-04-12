import { useInfiniteQuery } from 'react-query'

import { getQuestionsAPI } from './api'
import { QUESTIONS_QUERY_KEY } from './constants'

export const useQuestions = orderBy => {
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
    [QUESTIONS_QUERY_KEY, { pageNum: 1, orderBy }],
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
