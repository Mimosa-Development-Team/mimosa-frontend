import { useInfiniteQuery } from 'react-query'

import { getQuestionsAPI } from './api'
import { QUESTIONS_QUERY_KEY } from './constants'

export const useQuestions = (id = 1) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess
  } = useInfiniteQuery(
    [QUESTIONS_QUERY_KEY, { pageNum: id }],
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
    error
  }
}
