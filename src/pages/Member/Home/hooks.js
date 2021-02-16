import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'

import { addToDoAPI, getToDosAPI } from './api'
import { TO_DO_QUERY_KEY } from './constants'

export const useToDos = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery(TO_DO_QUERY_KEY, getToDosAPI)

  const {
    data: addedData,
    isLoading: addToDoLoading,
    error: addToDoError,
    mutate
  } = useMutation(addToDoAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(TO_DO_QUERY_KEY)
    }
  })

  return {
    getToDos: refetch,
    toDos: data,
    isLoading,
    isSuccess,
    error,

    addToDo: mutate,
    addedData,
    addToDoLoading,
    addToDoError
  }
}
