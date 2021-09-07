import { useMutation } from 'react-query'
import { queryClient } from 'store/state'

import { putEmail } from './api'
import { POST_EMAIL } from './constants'

export const useEmail = () => {
  const {
    data: updatedEmail,
    isLoading: updateIsLoadingEmail,
    error: updateErrorEmail,
    mutate: updateMutate,
    isSuccess: updateIsSuccessEmail,
    reset: resetEmailUpdate
  } = useMutation(putEmail, {
    onSuccess: () => {
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
