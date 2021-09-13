import { useMutation } from 'react-query'
import { queryClient, useGlobalState } from 'store/state'

import { putEmail } from './api'
import { POST_EMAIL } from './constants'

export const useEmail = () => {
  const { user: proxyUser } = useGlobalState()
  const {
    data: updatedEmail,
    isLoading: updateIsLoadingEmail,
    error: updateErrorEmail,
    mutate: updateMutate,
    isSuccess: updateIsSuccessEmail,
    reset: resetEmailUpdate
  } = useMutation(putEmail, {
    onSuccess: data => {
      proxyUser.user.set(data.data)
      queryClient.invalidateQueries(POST_EMAIL)
    }
  })

  return {
    updateEmail: updateMutate,
    updatedEmail,
    updateIsLoadingEmail,
    updateErrorEmail,
    resetEmailUpdate,
    updateIsSuccessEmail
  }
}
