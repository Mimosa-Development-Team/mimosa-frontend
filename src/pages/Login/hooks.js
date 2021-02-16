import { useQuery } from 'react-query'

import { useGlobalState } from 'store/state'

import { getUserAPI } from './api'
import { USER_QUERY_KEY } from './constants'

export const useUser = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery(USER_QUERY_KEY, getUserAPI, {
    enabled: false
  })

  const globalState = useGlobalState()

  if (isSuccess) {
    globalState.merge({ user: data, isLoggedIn: true })
  }

  return {
    getUser: refetch,
    user: data,
    isLoading,
    isSuccess,
    error
  }
}
