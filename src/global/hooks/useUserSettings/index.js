import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'

import { editSettings, getSettings } from './api'
import { GET_SETTINGS } from './constants'

export const useUserSettings = () => {
  const {
    data,
    isLoading,
    isSuccess,
    error,
    refetch
  } = useQuery(GET_SETTINGS, getSettings)

  const { mutate } = useMutation(editSettings, {
    onSuccess: () => queryClient.invalidateQueries(GET_SETTINGS)
  })

  return {
    data,
    isLoading,
    isSuccess,
    error,
    fetchSettings: refetch,

    updateSettings: mutate
  }
}
