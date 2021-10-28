import { useMutation, useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import { queryClient, useGlobalState } from 'store/state'

import { postUserAPI, putEmail, getOrcidId } from './api'
import {
  USER_LOGIN_KEY,
  PUT_EMAIL,
  GET_ORCID
} from './constants'

export const useUser = id => {
  const history = useHistory()

  const {
    data: orcidData,
    refetch: refetchOrcidData
  } = useQuery(GET_ORCID, () => getOrcidId(id), {
    enabled: false
  })

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

  const {
    data: updatedEmail,
    isLoading: updateIsLoadingEmail,
    error: updateErrorEmail,
    mutate: updateMutate,
    isSuccess: updateIsSuccessEmail,
    reset: resetEmailUpdate
  } = useMutation(putEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries(PUT_EMAIL)
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
    isSuccess,

    updatedEmail,
    updateIsLoadingEmail,
    updateErrorEmail,
    updateMutate,
    updateIsSuccessEmail,
    resetEmailUpdate,

    orcidData,
    refetchOrcidData
  }
}
