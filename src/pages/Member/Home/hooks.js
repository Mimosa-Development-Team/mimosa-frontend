import { useQuery } from 'react-query'

import { getQuestionsAPI } from './api'
import { QUESTIONS_QUERY_KEY } from './constants'

export const useQuestions = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery(QUESTIONS_QUERY_KEY, getQuestionsAPI, {
    enabled: false
  })

  return {
    getQuestions: refetch,
    questions: data,
    isLoading,
    isSuccess,
    error
  }
}
