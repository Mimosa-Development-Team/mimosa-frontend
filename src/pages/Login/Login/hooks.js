import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import { queryClient, useGlobalState } from 'store/state'

import { postUserAPI } from './api'
import { USER_LOGIN_KEY } from './constants'

export const useUser = () => {
  const history = useHistory()
  const {
    data: addedData,
    isLoading: addTodoLoading,
    error: addToDoError,
    isSuccess,
    mutate
  } = useMutation(postUserAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(USER_LOGIN_KEY)
    }
  })

  const globalState = useGlobalState()

  if (isSuccess) {
    globalState.merge({
      user: addedData,
      isLoggedIn: true,
      login: true
    })
    history.push('/')
  }

  return {
    addToDo: mutate,
    addedData,
    addTodoLoading,
    addToDoError,
    isSuccess
  }
}
