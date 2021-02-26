import { useMutation } from 'react-query'

import { queryClient, useGlobalState } from 'store/state'

import { postUserAPI } from './api'
import { USER_QUERY_KEY } from './constants'

export const useUser = () => {
  const {
    data: addedData,
    isLoading: addTodoLoading,
    error: addToDoError,
    isSuccess,
    mutate
  } = useMutation(postUserAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY_KEY)
    }
  })

  const globalState = useGlobalState()

  if (isSuccess) {
    globalState.merge({ user: addedData, isLoggedIn: true })
  }

  return {
    addToDo: mutate,
    addedData,
    addTodoLoading,
    addToDoError,
    isSuccess
  }
}
